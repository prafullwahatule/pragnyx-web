import { getEffectivePlans } from "@/lib/eduos/effectivePlans";
import PlanPricingEditor from "@/components/admin/PlanPricingEditor";

export default async function AdminEduOSPricingPage() {
  const plans = await getEffectivePlans();

  return (
    <PlanPricingEditor
      title="EduOS pricing"
      description="Prices shown on the EduOS marketing site and charged at checkout. Enterprise stays sales-assisted and isn't priced here."
      apiPath="/api/admin/eduos/plan-prices"
      initialPlans={plans}
    />
  );
}
