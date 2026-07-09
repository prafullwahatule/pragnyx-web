import { getEffectivePlans } from "@/lib/fincore/effectivePlans";
import { setPlanPrice } from "@/lib/repo/fincore";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const plans = await getEffectivePlans();
  return Response.json({ plans });
}

export async function PATCH(request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await request.json().catch(() => ({}));
  const { planId, price } = body || {};

  if (!planId) {
    return Response.json({ error: "planId is required." }, { status: 400 });
  }
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return Response.json({ error: "Enter a valid, non-negative price." }, { status: 400 });
  }

  try {
    await setPlanPrice(planId, numericPrice);
    const plans = await getEffectivePlans();
    return Response.json({ ok: true, plans });
  } catch (err) {
    return Response.json({ error: err.message || "Could not update price." }, { status: 500 });
  }
}
