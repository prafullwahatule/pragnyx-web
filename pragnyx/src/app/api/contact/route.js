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

  // In production this would send via Resend/Postmark/etc, or create a
  // ticket in a CRM. Logged server-side here so the flow is fully wired.
  console.log("[contact] new message", {
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    message: "Thanks — we'll be in touch soon.",
  });
}
