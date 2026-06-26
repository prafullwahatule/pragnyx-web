import { teamRepo } from "@/lib/repo/team";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminTeamPage() {
  const team = await teamRepo.getAll();

  return (
    <AdminCrudManager
      title="Team"
      description="Team members shown on the /about page."
      apiPath="/api/admin/team"
      initialItems={team}
      idField="id"
      idIsEditable
      titleField="name"
      subtitleTemplate="{role}"
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "role", label: "Role", type: "text", required: true },
        { name: "bio", label: "Bio", type: "textarea", required: true },
      ]}
    />
  );
}
