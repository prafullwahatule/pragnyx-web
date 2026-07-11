import { cookies } from "next/headers";
import { getWorkspace, updateWorkspaceBusiness, updateWorkspaceAddOns, completeOnboarding } from "@/lib/repo/fincore";
import { getCustomerSession } from "@/lib/fincore/session";
import { createSessionToken, sessionCookieOptions } from "@/lib/fincore/auth";
import { sendTeamInviteEmail } from "@/lib/fincore/emails";

// Only these fields can be patched from the onboarding wizard's "confirm
// business details" step — same shape SignupWizard collects at signup,
// deliberately not a free-form pass-through of the request body.
const BUSINESS_FIELDS = ["name", "type", "gstNumber", "pan", "email", "phone", "industry", "employees", "address"];

function pickBusinessPatch(input) {
  const patch = {};
  for (const field of BUSINESS_FIELDS) {
    if (typeof input?.[field] === "string" || typeof input?.[field] === "number") {
      patch[field] = input[field];
    }
  }
  return patch;
}

/**
 * Single completion endpoint for the post-login onboarding wizard
 * (src/components/fincore/OnboardingWizard.jsx). Called once, either at
 * the end of the wizard (persisting whatever was collected across its
 * steps) or immediately from the wizard's "Skip setup" control
 * ({ skip: true }, which persists nothing and just marks it done).
 *
 * Falls under the same "/api/fincore/workspace/" middleware prefix as
 * the addons route, so it's already gated on being logged in AND having
 * completed the mustResetPassword step — you can't onboard with a
 * temp password still active. It deliberately does NOT also require
 * onboardingCompleted, since that's exactly the flag this route sets.
 */
export async function POST(request, { params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const session = await getCustomerSession();
  if (!session || session.workspaceId !== decodedId) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  const workspace = await getWorkspace(decodedId);
  if (!workspace) {
    return Response.json({ error: "Workspace not found." }, { status: 404 });
  }

  if (!body?.skip) {
    if (body?.business && typeof body.business === "object") {
      await updateWorkspaceBusiness(decodedId, pickBusinessPatch(body.business));
    }

    if (Array.isArray(body?.addOns)) {
      await updateWorkspaceAddOns(decodedId, body.addOns);
    }

    const invite = body?.invite;
    if (invite?.email && invite?.name) {
      try {
        await sendTeamInviteEmail({ workspace, invite });
      } catch (err) {
        // Non-fatal — same convention as every other transactional email
        // in this codebase (see provisioning.js). A failed invite email
        // should never block onboarding from completing.
        console.error("[fincore] team invite email failed", err);
      }
    }
  }

  await completeOnboarding(decodedId);

  // Reissue the session so onboardingCompleted flips to true immediately
  // — same reasoning as the reset-password route reissuing its token.
  const token = await createSessionToken({
    workspaceId: session.workspaceId,
    email: session.email,
    mustResetPassword: session.mustResetPassword,
    onboardingCompleted: true,
  });
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieOptions().name, token, sessionCookieOptions());

  return Response.json({ ok: true });
}
