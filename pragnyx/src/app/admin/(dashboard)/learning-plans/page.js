import { learningPlansRepo } from "@/lib/repo/learningPlans";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminLearningPlansPage() {
  const plans = await learningPlansRepo.getAll();

  return (
    <AdminCrudManager
      title="Pricing plans"
      description="PragnyX Learning pricing tiers shown on the /learning page."
      apiPath="/api/admin/learning-plans"
      initialItems={plans}
      idField="id"
      idIsEditable={false}
      titleField="name"
      subtitleTemplate="{price} {period}"
      fields={[
        { name: "name", label: "Plan name", type: "text", required: true },
        { name: "price", label: "Price (e.g. $45)", type: "text", required: true },
        { name: "period", label: "Period (e.g. / session)", type: "text" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "features", label: "Features", type: "tags" },
        { name: "featured", label: "Mark as \"Most popular\"", type: "checkbox" },
      ]}
    />
  );
}
