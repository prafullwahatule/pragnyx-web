import { createContactSubmission } from "@/lib/repo/submissions";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const message = (body?.message || "").trim();

  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message || message.length < 10) {
    errors.message = "Tell us a little more (10+ characters).";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  // Persists to the database (visible in the admin panel inbox) when
  // DATABASE_URL is configured; otherwise falls back to a server log so
  // the flow still works end-to-end on a fresh, un-configured clone.
  await createContactSubmission({ name, email, message, source: "contact" });

  return Response.json({
    ok: true,
    message: "Thanks — we'll be in touch soon.",
  });
}
