// Shared helpers for PragnyX Learning certificates.
// Used by the verification page, the certificate-image generator script,
// and anywhere else that needs to print a certificate URL or duration.

export const SITE_URL = "https://pragnyx.in";

/** Public verification URL for a given certificate id, e.g. PXL-PBI-2026-000 */
export function certificateVerifyUrl(id) {
  return `${SITE_URL}/learning/certificate/${encodeURIComponent(id)}`;
}

/** Formats minutes as "39m" or "1h 24m", matching the compact style on cert pages. */
export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Formats an ISO date string ("2026-06-22") as "June 22, 2026". */
export function formatLongDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Formats an ISO date string as "DD/MM/YYYY" — matches the printed certificate. */
export function formatShortDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/** Formats a learner count the way platforms do: "30,985 learners". */
export function formatLearnerCount(n) {
  if (!n) return "0 learners";
  return `${n.toLocaleString("en-US")} learner${n === 1 ? "" : "s"}`;
}
