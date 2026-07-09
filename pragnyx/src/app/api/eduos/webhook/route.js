import { verifyWebhookSignature } from "@/lib/eduos/razorpay";

// Razorpay webhook — configure this URL (https://pragnyx.in/api/eduos/webhook)
// in the Razorpay dashboard, with the same secret as RAZORPAY_WEBHOOK_SECRET.
// This is the durable source of truth for payment state (the client-side
// verify route handles the happy path redirect; this handles retries,
// delayed captures, refunds, and disputes so the workspace status stays
// correct even if the browser tab closes mid-checkout).

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !verifyWebhookSignature({ rawBody, signature })) {
    return Response.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  const type = event?.event;

  // SWAP POINT: on payment.captured, confirm/extend subscriptionStatus in
  // the real workspaces table. On payment.failed or refund events, mark
  // the workspace as past_due / suspended. Logged here for visibility.
  console.log("[eduos] webhook received", { type, id: event?.id });

  switch (type) {
    case "payment.captured":
    case "order.paid":
    case "payment.failed":
    case "refund.processed":
      break;
    default:
      break;
  }

  return Response.json({ ok: true });
}
