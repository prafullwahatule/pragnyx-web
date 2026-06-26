import { mentorsRepo } from "@/lib/repo/mentors";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminMentorsPage() {
  const mentors = await mentorsRepo.getAll();

  return (
    <AdminCrudManager
      title="Mentors"
      description="PragnyX Learning mentors shown on the /learning page."
      apiPath="/api/admin/mentors"
      initialItems={mentors}
      idField="id"
      idIsEditable
      titleField="name"
      subtitleTemplate="{title}"
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "bio", label: "Bio", type: "textarea", required: true },
        { name: "tracks", label: "Tracks", type: "tags" },
        { name: "rating", label: "Rating (e.g. 4.9)", type: "number", step: "0.1" },
        { name: "sessions", label: "Sessions taught", type: "number" },
        {
          name: "color",
          label: "Accent color",
          type: "select",
          options: [
            { value: "blue", label: "Blue" },
            { value: "violet", label: "Violet" },
          ],
        },
      ]}
    />
  );
}
