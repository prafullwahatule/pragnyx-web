import crypto from "crypto";
import { verifyWebhookSignature } from "@/lib/eduos/razorpay";
import { getWorkspaceByOrderId, updateWorkspaceSubscriptionStatus } from "@/lib/repo/eduos";
import { sendReceiptEmail } from "@/lib/eduos/emails";
import { wasEventProcessed, markEventProcessed } from "@/lib/webhookIdempotency";

// Razorpay webhook — configure this URL (https://pragnyx.in/api/eduos/webhook)
// in the Razorpay dashboard, with the same secret as RAZORPAY_WEBHOOK_SECRET.
// This is the durable source of truth for payment state (the client-side
// verify route handles the happy path redirect; this handles retries,
// delayed captures, refunds, and disputes so the workspace status stays
// correct even if the browser tab closes mid-checkout).
//
// Workspace resolution: every checkout order is stamped onto the resulting
// workspace as `billing.razorpayOrderId` (see provisionWorkspace). Webhook
// events carry that same order_id on their payment entity, so
// getWorkspaceByOrderId() is how an event gets matched back to a workspace.
// For a brand-new signup, the *first* payment.captured/order.paid event
// commonly arrives for an order whose workspace doesn't exist yet (the
// synchronous /checkout/verify call creates it) — that's expected and
// logged as a no-op, not an error.

const PRODUCT = "eduos";

function addBillingPeriod(fromDate, period) {
  const next = new Date(fromDate);
  if (period === "year") next.setFullYear(next.getFullYear() + 1);
  else next.setMonth(next.getMonth() + 1); // "month" and any other/custom period default to monthly
  return next;
}

function randomInvoiceId() {
  return `INV-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

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
  const eventId = event?.id;

  // Idempotency first — Razorpay redelivers events on timeout or a
  // non-2xx response, so a duplicate delivery must be a safe no-op.
  if (await wasEventProcessed(eventId)) {
    return Response.json({ ok: true, duplicate: true });
  }

  switch (type) {
    case "payment.captured":
    case "order.paid": {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;
      const workspace = orderId ? await getWorkspaceByOrderId(orderId) : null;

      if (!workspace) {
        console.log("[eduos] webhook: no workspace found for order (likely the initial signup payment, already handled by /checkout/verify)", { orderId, type });
        break;
      }

      const period = workspace.billing?.period || "month";
      const base = workspace.renewalDate ? new Date(workspace.renewalDate) : new Date();
      const renewalDate = addBillingPeriod(base, period).toISOString();

      const invoice = {
        id: randomInvoiceId(),
        date: new Date().toISOString(),
        amount: paymentEntity?.amount ? paymentEntity.amount / 100 : workspace.billing?.amount,
        currency: paymentEntity?.currency?.toUpperCase() || workspace.billing?.currency || "INR",
        status: "paid",
        paymentId,
      };

      const updated = await updateWorkspaceSubscriptionStatus(workspace.institutionId, {
        status: "active",
        renewalDate,
        billingPatch: { lastPaymentId: paymentId },
        addInvoice: invoice,
      });

      try {
        if (updated) await sendReceiptEmail({ workspace: updated, invoice });
      } catch (err) {
        console.error("[eduos] receipt email failed", err);
      }
      break;
    }

    case "payment.failed": {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const workspace = orderId ? await getWorkspaceByOrderId(orderId) : null;

      if (!workspace) {
        console.log("[eduos] webhook: payment.failed for an order with no matching workspace", { orderId });
        break;
      }

      // Grace period, not immediate suspension — the customer keeps
      // access while they retry payment or sort out a card decline.
      await updateWorkspaceSubscriptionStatus(workspace.institutionId, { status: "past_due" });
      break;
    }

    case "refund.processed": {
      const refundEntity = event?.payload?.refund?.entity;
      const paymentEntity = event?.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const workspace = orderId ? await getWorkspaceByOrderId(orderId) : null;

      if (!workspace) {
        console.log("[eduos] webhook: refund.processed for an order with no matching workspace", { orderId });
        break;
      }

      // A full refund reads as a cancellation; a partial refund is
      // logged and the workspace is suspended pending manual review
      // rather than assumed-cancelled.
      const isFullRefund = refundEntity?.amount != null && refundEntity.amount === paymentEntity?.amount;
      await updateWorkspaceSubscriptionStatus(workspace.institutionId, {
        status: isFullRefund ? "cancelled" : "suspended",
      });
      console.log("[eduos] refund processed", {
        institutionId: workspace.institutionId,
        paymentId: refundEntity?.payment_id,
        refundAmount: refundEntity?.amount,
        isFullRefund,
      });
      break;
    }

    default:
      console.log("[eduos] webhook: unhandled event type", { type });
      break;
  }

  await markEventProcessed(eventId, PRODUCT, type);
  return Response.json({ ok: true });
}
