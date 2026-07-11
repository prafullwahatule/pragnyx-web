// Customer-facing (workspace owner) auth for PragnyX FinCore.
//
// Deliberately separate from src/lib/auth.js (the admin-panel auth) —
// different cookie, different audience (a workspace/institution, not the
// single PragnyX admin), different session payload shape. Same underlying
// approach though: bcrypt for hashing, a signed JWT via `jose` (works in
// both Node and the Edge runtime, so it's safe to use from middleware).

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "pragnyx_fincore_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.CUSTOMER_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "CUSTOMER_SESSION_SECRET is not set. Add a long random string to your environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

export async function verifyPassword(plainPassword, hash) {
  if (!hash) return false;
  return bcrypt.compare(plainPassword, hash);
}

/**
 * Compare against the one-time plaintext temp password issued at
 * provisioning. This file is imported by middleware (Edge runtime), so it
 * stays free of Node-only APIs — combined with the login rate limiter
 * (see item 7), a plain comparison is sufficient for a short-lived,
 * single-use credential.
 */
export function verifyTempPassword(plainPassword, tempPassword) {
  if (!tempPassword || !plainPassword) return false;
  return plainPassword === tempPassword;
}

/** Creates a signed session JWT for a workspace's logged-in admin/owner. */
/** Creates a signed session JWT for a workspace's logged-in admin/owner. */
export async function createSessionToken({ workspaceId, email, mustResetPassword, onboardingCompleted }) {
  return new SignJWT({
    sub: workspaceId,
    workspaceId,
    email,
    mustResetPassword: Boolean(mustResetPassword),
    onboardingCompleted: Boolean(onboardingCompleted),
    product: "fincore",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

/** Verifies a session JWT, returning the payload or null if invalid/expired. */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.product !== "fincore") return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_MAX_AGE = SESSION_DURATION_SECONDS;

/** Cookie options shared between setting and clearing the session cookie. */
export function sessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}
