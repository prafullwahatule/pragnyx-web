// Server-only helper for reading the current EduOS customer (workspace
// owner) session. Use in Server Components, Route Handlers, and Server
// Actions — NOT in middleware (which reads the cookie + verifies the JWT
// directly, since `next/headers` isn't available there).

import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./auth";

/** Returns the session payload ({ workspaceId, email, mustResetPassword, onboardingCompleted }) or null. */
export async function getCustomerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
