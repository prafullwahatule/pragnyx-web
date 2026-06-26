// Postgres connection layer for the PragnyX admin panel + site content.
//
// Works with ANY standard Postgres provider — Neon (Vercel's native Postgres
// integration), Supabase, Railway, Render, or your own server — as long as
// `DATABASE_URL` is set. No provider-specific SDK, just the `pg` driver.
//
// If `DATABASE_URL` is not set (e.g. a fresh clone before setup), every
// function here resolves to `null`/no-op instead of throwing, so the public
// site keeps rendering from the static fallback data in `src/data/`.

import { Pool } from "pg";

let pool = null;
let initPromise = null;

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!isDbConfigured()) return null;
  if (!pool) {
    // pg's URL parser treats sslmode=require/prefer/verify-ca in the
    // connection string as deprecated aliases and logs a noisy warning
    // on every cold start. We strip sslmode from the URL and configure
    // SSL explicitly via the `ssl` option instead — same effective
    // behavior (encrypted connection, no strict CA pinning, which is
    // what Neon/Supabase/Railway's managed certs need), no warning.
    const rawUrl = process.env.DATABASE_URL;
    const sslDisabled = rawUrl.includes("sslmode=disable");
    const connectionString = rawUrl
      .replace(/([?&])sslmode=[^&]*&/i, "$1") // sslmode followed by more params
      .replace(/[?&]sslmode=[^&]*/i, ""); // sslmode alone, or as the last param

    pool = new Pool({
      connectionString,
      ssl: sslDisabled ? false : { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

/**
 * Run a parameterized SQL query. Returns `null` (not throws) if no
 * database is configured, so callers can fall back to static data.
 */
export async function query(text, params = []) {
  const p = getPool();
  if (!p) return null;
  const client = await p.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

/**
 * Lazily ensures schema exists. Safe to call on every cold start —
 * uses CREATE TABLE IF NOT EXISTS, so it's a cheap no-op after the first run.
 */
export async function ensureSchema() {
  if (!isDbConfigured()) return false;
  if (!initPromise) {
    initPromise = (async () => {
      const { SCHEMA_SQL } = await import("./schema.js");
      await query(SCHEMA_SQL);
      return true;
    })();
  }
  return initPromise;
}
