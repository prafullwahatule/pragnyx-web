// Shared spam protection for public form routes (contact, newsletter, job
// application, EduOS/FinCore demo requests). Two layers, both cheap and
// dependency-free:
//
//   1. Rate limiting — max 5 submissions per IP per 10 minutes, scoped
//      per route so a burst on one form doesn't lock out another.
//   2. Honeypot — a hidden field real users never see or fill. If it
//      comes back non-empty, the request is a bot; callers should
//      return their normal "success" response without persisting
//      anything, so the bot has no signal to adapt on.
//
// Follows the same DB-with-in-memory-fallback pattern as
// webhookIdempotency.js: durable across cold starts when DATABASE_URL is
// configured (via the `rate_limit_hits` table in schema.js), and a
// process-local Map so local/dev-without-DB still behaves sanely.

import { query, isDbConfigured, ensureSchema } from "./db";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

// The hidden field name shared across every protected form.
export const HONEYPOT_FIELD = "website";

const globalStore = globalThis;
if (!globalStore.__rateLimitHits) globalStore.__rateLimitHits = new Map();
const memHits = globalStore.__rateLimitHits;

export function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0].trim();
  return ip || "unknown";
}

async function withinLimitMemory(bucketKey) {
  const now = Date.now();
  const hits = (memHits.get(bucketKey) || []).filter((t) => now - t < WINDOW_MS);
  const allowed = hits.length < MAX_HITS;
  if (allowed) hits.push(now);
  memHits.set(bucketKey, hits);
  return allowed;
}

async function withinLimitDb(bucketKey) {
  await ensureSchema();
  const res = await query(
    `SELECT COUNT(*)::int AS count FROM rate_limit_hits
     WHERE bucket_key = $1 AND created_at > now() - interval '10 minutes'`,
    [bucketKey]
  );
  const count = res?.rows?.[0]?.count ?? 0;
  if (count >= MAX_HITS) return false;

  await query("INSERT INTO rate_limit_hits (bucket_key) VALUES ($1)", [bucketKey]);

  // Opportunistic cleanup — no cron needed, and cheap enough to run on a
  // small fraction of requests since this table is write-heavy but tiny.
  if (Math.random() < 0.05) {
    await query("DELETE FROM rate_limit_hits WHERE created_at < now() - interval '1 hour'");
  }
  return true;
}

/**
 * Rate-limits a public form route: max 5 submissions per IP per 10
 * minutes. `routeName` scopes the bucket (e.g. "contact",
 * "eduos-demo") so limits don't bleed across unrelated forms.
 *
 * Returns a 429 Response if the limit is exceeded, or `null` if the
 * request should proceed. Matches the requireAdmin() pattern in
 * apiGuard.js: `const limited = await enforceRateLimit(...); if (limited) return limited;`
 *
 * @param {Request} request
 * @param {string} routeName
 * @param {{ errorField?: string | null }} [options] Set errorField to
 *   null for routes whose error shape is `{ error }` instead of
 *   `{ errors: { ... } }` (currently just /api/newsletter).
 */
export async function enforceRateLimit(request, routeName, { errorField = "form" } = {}) {
  const ip = getClientIp(request);
  const bucketKey = `${routeName}:${ip}`;

  const allowed = isDbConfigured() ? await withinLimitDb(bucketKey) : await withinLimitMemory(bucketKey);
  if (allowed) return null;

  const message = "Too many submissions from this device — please try again in a few minutes.";
  return errorField === null
    ? Response.json({ error: message }, { status: 429 })
    : Response.json({ errors: { [errorField]: message } }, { status: 429 });
}

/**
 * True if the honeypot field was filled in. Real users never see this
 * field (hidden off-screen via CSS on the client), so a non-empty value
 * means the submission came from a bot filling every field it finds.
 */
export function isHoneypotTripped(body) {
  return Boolean((body?.[HONEYPOT_FIELD] || "").toString().trim());
}
