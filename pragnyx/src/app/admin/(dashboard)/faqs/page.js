import { faqsRepo } from "@/lib/repo/faqs";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminFaqsPage() {
  const faqs = await faqsRepo.getAll();

  return (
    <AdminCrudManager
      title="FAQs"
      description="Shown on the homepage and /solutions page."
      apiPath="/api/admin/faqs"
      initialItems={faqs}
      idField="id"
      idIsEditable={false}
      titleField="q"
      fields={[
        { name: "q", label: "Question", type: "text", required: true },
        { name: "a", label: "Answer", type: "textarea", required: true },
      ]}
    />
  );
}
