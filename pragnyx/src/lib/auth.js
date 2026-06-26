// Minimal, dependency-light auth for the single-admin PragnyX admin panel.
//
// - Passwords are hashed with bcrypt (bcryptjs — pure JS, no native build step).
// - Sessions are a signed JWT stored in an HTTP-only cookie (via `jose`,
//   which works in both Node and the Edge runtime, so it's safe to use
//   from middleware too).
//
// This intentionally avoids a full auth framework (NextAuth/Auth.js) since
// there is exactly one admin user and one login form — a framework would
// add config surface without adding capability here.

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "pragnyx_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add a long random string to your environment variables."
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

/** Creates a signed session JWT for the given admin user. */
export async function createSessionToken({ id, email, name }) {
  return new SignJWT({ sub: String(id), email, name })
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
