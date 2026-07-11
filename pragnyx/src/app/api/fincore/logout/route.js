import { cookies } from "next/headers";
import { sessionCookieOptions } from "@/lib/fincore/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieOptions().name);
  return Response.json({ ok: true });
}
