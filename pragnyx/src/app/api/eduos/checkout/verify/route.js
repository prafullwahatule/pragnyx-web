import { isRazorpayConfigured, verifyPaymentSignature } from "@/lib/eduos/razorpay";
import { provisionWorkspace } from "@/lib/eduos/provisioning";
import { getEffectivePlan } from "@/lib/eduos/effectivePlans";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    planId,
    institution,
    addOns,
  } = body || {};

  if (!orderId || !paymentId || !signature) {
    return Response.json({ error: "Missing payment confirmation details." }, { status: 400 });
  }

  const plan = await getEffectivePlan(planId);
  if (!plan) {
    return Response.json({ error: "Unknown plan." }, { status: 400 });
  }

  if (!isRazorpayConfigured()) {
    return Response.json({ error: "Payments aren't configured." }, { status: 503 });
  }

  const valid = verifyPaymentSignature({ orderId, paymentId, signature });
  if (!valid) {
    return Response.json({ error: "Payment signature verification failed." }, { status: 400 });
  }

  try {
    const workspace = await provisionWorkspace({
      institution,
      plan: planId,
      addOns: addOns || [],
      paymentId,
    });

    return Response.json({ ok: true, workspace });
  } catch (err) {
    console.error("[eduos] provisioning failed after successful payment", err);
    return Response.json(
      {
        error:
          "Payment succeeded but workspace provisioning failed. Our team has been notified — contact support@pragnyx.in with your payment ID: " +
          paymentId,
      },
      { status: 500 }
    );
  }
}
