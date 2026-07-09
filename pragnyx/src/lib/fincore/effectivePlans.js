// SERVER-ONLY. Do not import this from a "use client" component — it
// pulls in the DB client (via lib/repo/fincore -> lib/db -> pg), which
// can't be bundled for the browser. Client components should instead
// receive plans as a prop from a server component, or fetch them from
// /api/fincore/plans.
//
// PLANS in ./plans holds the static catalogue (features, limits,
// tagline). Actual self-serve prices can be overridden from the admin
// panel (Admin → FinCore → Pricing) and are stored in
// fincore_plan_prices. These helpers merge the two so every price shown
// to a visitor — and every amount actually charged at checkout —
// reflects the latest admin-set value.

import { PLANS } from "./plans";
import { getPlanPriceOverrides } from "@/lib/repo/fincore";

export async function getEffectivePlans() {
  const overrides = await getPlanPriceOverrides();
  return PLANS.map((p) =>
    p.selfServe && overrides[p.id] != null ? { ...p, price: overrides[p.id] } : { ...p }
  );
}

export async function getEffectivePlan(planId) {
  const plans = await getEffectivePlans();
  return plans.find((p) => p.id === planId) || null;
}
