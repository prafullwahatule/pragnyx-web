// Server-only helper for reading the current admin session.
// Use in Server Components, Route Handlers, and Server Actions.

import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./auth";

/** Returns the session payload ({ sub, email, name }) or null if not logged in. */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Throws-free guard for API routes: returns session or null. */
export async function requireAdminSession() {
  const session = await getAdminSession();
  return session;
}
