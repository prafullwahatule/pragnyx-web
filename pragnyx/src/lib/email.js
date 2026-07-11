// Thin, shared wrapper around Resend. Both src/lib/eduos/emails.js and
// src/lib/fincore/emails.js call sendEmail() — this is the one place that
// knows about the Resend SDK/API key, so swapping providers later only
// means editing this file.
//
// IMPORTANT: every call site MUST treat a failed send as non-fatal. This
// module itself never throws — it always resolves — so a flaky email
// provider can never take down workspace provisioning, checkout, or a
// demo-request submission.

import { Resend } from "resend";

let client = null;
function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/**
 * @param {object} opts
 * @param {string} opts.to
 * @param {string} opts.from - e.g. "PragnyX EduOS <onboarding@pragnyx.in>"
 * @param {string} opts.subject
 * @param {string} opts.html
 * @param {string} opts.text - plain-text fallback
 * @param {string} [opts.tag] - short label for logs (e.g. "eduos.welcome")
 * @returns {Promise<{ ok: boolean, id?: string, error?: string }>}
 */
export async function sendEmail({ to, from, subject, html, text, tag = "email" }) {
  const resend = getClient();
  if (!resend) {
    console.warn(`[${tag}] RESEND_API_KEY not set — skipping send`, { to, subject });
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({ from, to, subject, html, text });
    if (error) {
      console.error(`[${tag}] Resend returned an error`, error);
      return { ok: false, error: error.message || String(error) };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    // Network failure, timeout, malformed payload, etc. — swallow it.
    console.error(`[${tag}] email send threw`, err);
    return { ok: false, error: err?.message || String(err) };
  }
}
