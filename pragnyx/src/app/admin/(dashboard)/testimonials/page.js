import { testimonialsRepo } from "@/lib/repo/testimonials";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminTestimonialsPage() {
  const testimonials = await testimonialsRepo.getAll();

  return (
    <AdminCrudManager
      title="Testimonials"
      description="Shown in the carousel on the homepage."
      apiPath="/api/admin/testimonials"
      initialItems={testimonials}
      idField="id"
      idIsEditable={false}
      titleField="name"
      subtitleTemplate="{role}"
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "role", label: "Role / company", type: "text", required: true },
        { name: "quote", label: "Quote", type: "textarea", required: true },
      ]}
    />
  );
}
