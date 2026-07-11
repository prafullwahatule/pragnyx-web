import { cookies } from "next/headers";
import { getWorkspace } from "@/lib/repo/fincore";
import { verifyPassword, verifyTempPassword, createSessionToken, sessionCookieOptions } from "@/lib/fincore/auth";
import { isDbConfigured } from "@/lib/db";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot (see item 7's shared pattern) — if a bot fills this hidden
  // field, pretend the request succeeded-but-failed rather than telling it
  // what tripped.
  if (body?.website) {
    return Response.json({ error: "Incorrect workspace or password." }, { status: 401 });
  }

  const workspaceInput = (body?.workspace || "").trim();
  const password = body?.password || "";

  if (!workspaceInput || !password) {
    return Response.json({ error: "Workspace and password are required." }, { status: 400 });
  }

  if (!isDbConfigured()) {
    return Response.json(
      { error: "No database connected yet. Set DATABASE_URL in your environment variables." },
      { status: 503 }
    );
  }

  const id = workspaceInput.includes(".") ? workspaceInput : `${workspaceInput}.pragnyx.in`;
  const workspace = await getWorkspace(id);

  // Generic error either way — never reveal whether the workspace exists.
  const genericError = () => Response.json({ error: "Incorrect workspace or password." }, { status: 401 });

  if (!workspace) return genericError();

  const admin = workspace.admin || {};
  let valid = false;
  if (admin.passwordHash) {
    valid = await verifyPassword(password, admin.passwordHash);
  } else if (admin.tempPassword) {
    valid = verifyTempPassword(password, admin.tempPassword);
  }

  if (!valid) return genericError();

  const mustResetPassword = Boolean(admin.mustResetPassword);
  const onboardingCompleted = Boolean(workspace.onboardingCompleted);
  const token = await createSessionToken({
    workspaceId: workspace.companyId,
    email: admin.email,
    mustResetPassword,
    onboardingCompleted,
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieOptions().name, token, sessionCookieOptions());

  return Response.json({ ok: true, mustResetPassword, onboardingCompleted });
}
