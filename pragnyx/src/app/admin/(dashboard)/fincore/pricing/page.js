import { getEffectivePlans, getEffectiveAddOns } from "@/lib/fincore/effectivePlans";
import PlanPricingEditor from "@/components/admin/PlanPricingEditor";

export default async function AdminFinCorePricingPage() {
  const [plans, addOns] = await Promise.all([getEffectivePlans(), getEffectiveAddOns()]);

  return (
    <PlanPricingEditor
      title="FinCore pricing"
      description="Prices shown on the FinCore marketing site and charged at checkout. Enterprise stays sales-assisted and isn't priced here."
      apiPath="/api/admin/fincore/plan-prices"
      initialPlans={plans}
      addonApiPath="/api/admin/fincore/addon-prices"
      initialAddOns={addOns}
    />
  );
}
