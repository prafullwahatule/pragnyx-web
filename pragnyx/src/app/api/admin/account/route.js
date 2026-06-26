import { getAdminSession } from "@/lib/session";
import { findAdminByEmail, updateAdminPassword } from "@/lib/repo/adminUsers";
import { verifyPassword } from "@/lib/auth";

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const currentPassword = body?.currentPassword || "";
  const newPassword = body?.newPassword || "";

  if (!currentPassword || !newPassword) {
    return Response.json({ error: "Current and new password are required." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return Response.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }

  const user = await findAdminByEmail(session.email);
  if (!user) {
    return Response.json({ error: "Account not found." }, { status: 404 });
  }

  const valid = await verifyPassword(currentPassword, user.password_hash);
  if (!valid) {
    return Response.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  await updateAdminPassword(user.id, newPassword);
  return Response.json({ ok: true });
}
