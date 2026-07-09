import { listWorkspaces } from "@/lib/repo/eduos";
import WorkspacesTable from "@/components/admin/WorkspacesTable";

export default async function AdminEduOSWorkspacesPage() {
  const items = await listWorkspaces();

  return <WorkspacesTable initialItems={items} />;
}
