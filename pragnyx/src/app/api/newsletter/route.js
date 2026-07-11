import { addNewsletterSubscriber } from "@/lib/repo/submissions";
import { enforceRateLimit, isHoneypotTripped } from "@/lib/spamGuard";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  // Newsletter's error shape is `{ error }`, not `{ errors }` — tell the
  // guard so a 429 matches this route's existing response pattern.
  const limited = await enforceRateLimit(request, "newsletter", { errorField: null });
  if (limited) return limited;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotTripped(body)) {
    return Response.json({ ok: true, message: "Subscribed. Welcome to the frontier." });
  }

  const email = (body?.email || "").trim().toLowerCase();

  if (!email) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const result = await addNewsletterSubscriber(email);

  if (result.alreadySubscribed) {
    return Response.json({ ok: true, message: "You're already on the list.", count: result.count });
  }

  return Response.json({
    ok: true,
    message: "Subscribed. Welcome to the frontier.",
    count: result.count,
  });
}

export async function GET() {
  const { getNewsletterSubscribers } = await import("@/lib/repo/submissions");
  const subs = await getNewsletterSubscribers();
  return Response.json({ count: subs.length });
}
