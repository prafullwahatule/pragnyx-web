// In-memory store for the demo/dev environment. In production this would
// write to a real database or ESP (e.g. Resend, Mailchimp, Customer.io).
const subscribers = new Set();

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

  const email = (body?.email || "").trim().toLowerCase();

  if (!email) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (subscribers.has(email)) {
    return Response.json({ ok: true, message: "You're already on the list." });
  }

  subscribers.add(email);

  return Response.json({
    ok: true,
    message: "Subscribed. Welcome to the frontier.",
    count: subscribers.size,
  });
}

export async function GET() {
  return Response.json({ count: subscribers.size });
}
