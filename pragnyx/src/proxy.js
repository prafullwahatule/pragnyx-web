import { NextResponse } from "next/server";
import { verifySessionToken as verifyEduOSToken, SESSION_COOKIE_NAME as EDUOS_COOKIE } from "@/lib/eduos/auth";
import { verifySessionToken as verifyFinCoreToken, SESSION_COOKIE_NAME as FINCORE_COOKIE } from "@/lib/fincore/auth";

// Guards the customer-facing (workspace owner) surfaces for both products.
// This is deliberately separate from the admin panel's auth, which has its
// own guard (requireAdmin() in src/lib/apiGuard.js) applied per-route.
//
// Next.js 16 renamed the "middleware" file convention to "proxy" (same
// export, same config.matcher — just a rename, this file used to be
// src/middleware.js exporting `middleware`). One real behavior change:
// proxy runs on the Node.js runtime by default instead of Edge, so the
// `jose`-based session verification below works the same as before but
// is no longer constrained to Edge-safe APIs.

const PRODUCTS = [
  {
    id: "eduos",
    cookieName: EDUOS_COOKIE,
    verify: verifyEduOSToken,
    dashboardPrefix: "/eduos/dashboard",
    apiPrefix: "/api/eduos/workspace/",
    loginPath: "/eduos/login",
    resetPasswordPath: "/eduos/reset-password",
    onboardingPath: "/eduos/onboarding",
  },
  {
    id: "fincore",
    cookieName: FINCORE_COOKIE,
    verify: verifyFinCoreToken,
    dashboardPrefix: "/fincore/dashboard",
    apiPrefix: "/api/fincore/workspace/",
    loginPath: "/fincore/login",
    resetPasswordPath: "/fincore/reset-password",
    onboardingPath: "/fincore/onboarding",
  },
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  for (const product of PRODUCTS) {
    const isDashboard = pathname.startsWith(product.dashboardPrefix);
    const isResetPassword = pathname.startsWith(product.resetPasswordPath);
    const isOnboarding = pathname.startsWith(product.onboardingPath);
    const isWorkspaceApi = pathname.startsWith(product.apiPrefix);

    if (!isDashboard && !isResetPassword && !isOnboarding && !isWorkspaceApi) continue;

    const token = request.cookies.get(product.cookieName)?.value;
    const session = token ? await product.verify(token) : null;

    if (!session) {
      if (isWorkspaceApi) {
        return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
      }
      const loginUrl = new URL(product.loginPath, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // First-login password reset isn't optional — bounce straight to the
    // reset-password page instead of letting a temp-password session
    // reach the dashboard, the onboarding wizard, or the workspace APIs.
    if (session.mustResetPassword && (isDashboard || isOnboarding)) {
      return NextResponse.redirect(new URL(product.resetPasswordPath, request.url));
    }
    if (session.mustResetPassword && isWorkspaceApi) {
      return NextResponse.json({ error: "Password reset required." }, { status: 403 });
    }

    // Same idea, one step later: once the password is sorted, the
    // one-time onboarding wizard is next. Scoped to the dashboard page
    // only — workspace APIs stay open so the wizard itself (and the
    // dashboard's own data calls) keep working while onboarding is
    // still in progress.
    if (!session.mustResetPassword && !session.onboardingCompleted && isDashboard) {
      return NextResponse.redirect(new URL(product.onboardingPath, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/eduos/dashboard/:path*",
    "/eduos/reset-password/:path*",
    "/eduos/onboarding/:path*",
    "/api/eduos/workspace/:path*",
    "/fincore/dashboard/:path*",
    "/fincore/reset-password/:path*",
    "/fincore/onboarding/:path*",
    "/api/fincore/workspace/:path*",
  ],
};
