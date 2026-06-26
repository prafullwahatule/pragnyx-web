import { cookies } from "next/headers";
import { authenticateAdmin } from "@/lib/repo/adminUsers";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";

export async function POST(request) {
  if (!isDbConfigured()) {
    return Response.json(
      {
        error:
          "No database connected yet. Set DATABASE_URL in your environment variables, then redeploy.",
      },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body?.email || "").trim();
  const password = body?.password || "";

  if (!email || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 });
  }

  const result = await authenticateAdmin(email, password);

  if (!result.ok) {
    return Response.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const token = await createSessionToken({
    id: result.user.id,
    email: result.user.email,
    name: result.user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieOptions().name, token, sessionCookieOptions());

  return Response.json({ ok: true });
}
