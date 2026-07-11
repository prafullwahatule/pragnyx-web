import { createFinCoreDemoRequest } from "@/lib/repo/fincore";
import { sendDemoConfirmationEmail } from "@/lib/fincore/emails";
import { enforceRateLimit, isHoneypotTripped } from "@/lib/spamGuard";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  const limited = await enforceRateLimit(request, "fincore-demo");
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotTripped(body)) {
    return Response.json({
      ok: true,
      message: "Demo request received — our team will reach out within one business day.",
    });
  }

  const name = (body?.name || "").trim();
  const business = (body?.business || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const phone = (body?.phone || "").trim();
  const businessSize = (body?.businessSize || "").trim();
  const message = (body?.message || "").trim();

  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!business) errors.business = "Business name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone) errors.phone = "Phone number is required.";
  if (!businessSize) errors.businessSize = "Select a business size.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  // Persists to the database (same pattern as /api/contact and
  // /api/learning-request) when DATABASE_URL is configured; otherwise
  // falls back to a server log so the flow still works end-to-end.
  await createFinCoreDemoRequest({ name, business, email, phone, businessSize, message });

  try {
    await sendDemoConfirmationEmail({ name, email, business });
  } catch (err) {
    console.error("[fincore] demo confirmation email failed", err);
  }

  return Response.json({
    ok: true,
    message: "Demo request received — our team will reach out within one business day.",
  });
}
