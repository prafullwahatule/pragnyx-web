import { getEffectiveAddOns } from "@/lib/fincore/effectivePlans";
import { setAddonPrice } from "@/lib/repo/fincore";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const addOns = await getEffectiveAddOns();
  return Response.json({ addOns });
}

export async function PATCH(request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await request.json().catch(() => ({}));
  const { addonId, price } = body || {};

  if (!addonId) {
    return Response.json({ error: "addonId is required." }, { status: 400 });
  }
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return Response.json({ error: "Enter a valid, non-negative price." }, { status: 400 });
  }

  try {
    await setAddonPrice(addonId, numericPrice);
    const addOns = await getEffectiveAddOns();
    return Response.json({ ok: true, addOns });
  } catch (err) {
    return Response.json({ error: err.message || "Could not update price." }, { status: 500 });
  }
}
