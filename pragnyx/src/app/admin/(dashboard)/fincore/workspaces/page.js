import { listWorkspaces } from "@/lib/repo/fincore";
import WorkspacesTable from "@/components/admin/WorkspacesTable";

export default async function AdminFinCoreWorkspacesPage() {
  const items = await listWorkspaces();

  return (
    <WorkspacesTable
      initialItems={items}
      title="FinCore workspaces"
      description="Companies provisioned through the FinCore self-serve checkout flow."
      apiBasePath="/api/admin/fincore/workspaces"
      idKey="companyId"
      profileKey="business"
    />
  );
}
