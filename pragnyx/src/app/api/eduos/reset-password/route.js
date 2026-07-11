import { cookies } from "next/headers";
import { getCustomerSession } from "@/lib/eduos/session";
import { hashPassword, createSessionToken, sessionCookieOptions } from "@/lib/eduos/auth";
import { updateWorkspaceAdmin } from "@/lib/repo/eduos";

export async function POST(request) {
  const session = await getCustomerSession();
  if (!session) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const newPassword = body?.newPassword || "";
  if (newPassword.length < 8) {
    return Response.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const passwordHash = await hashPassword(newPassword);
  const updated = await updateWorkspaceAdmin(session.workspaceId, {
    passwordHash,
    mustResetPassword: false,
    tempPassword: undefined, // one-time credential — cleared once a real password is set
  });

  if (!updated) {
    return Response.json({ error: "Workspace not found." }, { status: 404 });
  }

  // Reissue the session so mustResetPassword flips to false immediately —
  // otherwise the still-valid old JWT would keep sending the customer back
  // here until it expires. onboardingCompleted carries over unchanged —
  // resetting a password doesn't touch onboarding progress.
  const token = await createSessionToken({
    workspaceId: session.workspaceId,
    email: session.email,
    mustResetPassword: false,
    onboardingCompleted: session.onboardingCompleted,
  });
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieOptions().name, token, sessionCookieOptions());

  return Response.json({ ok: true, onboardingCompleted: Boolean(session.onboardingCompleted) });
}
