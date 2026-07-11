// Shared idempotency guard for Razorpay webhooks. Razorpay explicitly
// documents that the same event can be delivered more than once (retries
// on timeout, non-2xx response, etc.) — this makes sure a duplicate
// delivery never double-extends a renewal or double-sends a receipt.
//
// Backed by the `webhook_events` table (see src/lib/schema.js) when a DB
// is configured, with an in-memory Set fallback so local/dev-without-DB
// still behaves sanely (though obviously non-durable across restarts).

import { query, isDbConfigured, ensureSchema } from "./db";

const globalStore = globalThis;
if (!globalStore.__webhookEventIds) globalStore.__webhookEventIds = new Set();
const memEventIds = globalStore.__webhookEventIds;

/** Returns true if this event has already been recorded as processed. */
export async function wasEventProcessed(eventId) {
  if (!eventId) return false;
  if (!isDbConfigured()) return memEventIds.has(eventId);
  await ensureSchema();
  const res = await query("SELECT 1 FROM webhook_events WHERE event_id = $1", [eventId]);
  return Boolean(res?.rows?.length);
}

/**
 * Records an event as processed. Safe to call even if it races with
 * another delivery of the same event — the primary key / Set membership
 * makes the insert itself idempotent.
 */
export async function markEventProcessed(eventId, product, eventType) {
  if (!eventId) return;
  if (!isDbConfigured()) {
    memEventIds.add(eventId);
    return;
  }
  await ensureSchema();
  await query(
    "INSERT INTO webhook_events (event_id, product, event_type) VALUES ($1, $2, $3) ON CONFLICT (event_id) DO NOTHING",
    [eventId, product, eventType || ""]
  );
}
