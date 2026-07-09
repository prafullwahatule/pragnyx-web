import { getFinCoreDemoRequests } from "@/lib/repo/fincore";
import SubmissionsInbox from "@/components/admin/SubmissionsInbox";

export default async function AdminFinCoreDemoRequestsPage() {
  const items = await getFinCoreDemoRequests();

  return (
    <SubmissionsInbox
      title="FinCore demo requests"
      description="Submitted via the FinCore 'Book a Demo' form and the Enterprise signup path."
      apiPath="/api/admin/fincore/demo-requests"
      initialItems={items}
      type="fincore-demo"
    />
  );
}
