import { getEffectivePlan } from "@/lib/eduos/effectivePlans";
import { getRazorpayClient, isRazorpayConfigured } from "@/lib/eduos/razorpay";

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

  const planId = (body?.planId || "").trim();
  const institution = body?.institution || {};

  const plan = await getEffectivePlan(planId);
  if (!plan) {
    return Response.json({ error: "Unknown plan selected." }, { status: 400 });
  }
  if (!plan.selfServe) {
    return Response.json(
      { error: "This plan is sales-assisted. Please book a demo instead." },
      { status: 400 }
    );
  }

  const errors = {};
  if (!institution.name?.trim()) errors.name = "Institution name is required.";
  if (!institution.contactPerson?.trim()) errors.contactPerson = "Contact person is required.";
  if (!institution.email?.trim() || !isValidEmail(institution.email)) {
    errors.email = "A valid email is required.";
  }
  if (!institution.phone?.trim()) errors.phone = "Phone number is required.";
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  if (!isRazorpayConfigured()) {
    return Response.json(
      {
        error:
          "Payments aren't configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment (see .env.example) to enable checkout.",
      },
      { status: 503 }
    );
  }

  const razorpay = getRazorpayClient();

  try {
    const order = await razorpay.orders.create({
      amount: plan.price * 100, // paise
      currency: plan.currency,
      receipt: `eduos_${planId}_${Date.now()}`,
      notes: {
        institutionName: institution.name,
        planId: plan.id,
      },
    });

    return Response.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      plan: { id: plan.id, name: plan.name, price: plan.price },
    });
  } catch (err) {
    console.error("[eduos] razorpay order creation failed", err);
    return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
  }
}
