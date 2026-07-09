import { getEduOSDemoRequests } from "@/lib/repo/eduos";
import SubmissionsInbox from "@/components/admin/SubmissionsInbox";

export default async function AdminEduOSDemoRequestsPage() {
  const items = await getEduOSDemoRequests();

  return (
    <SubmissionsInbox
      title="EduOS demo requests"
      description="Submitted via the EduOS 'Book a Demo' form and the Enterprise signup path."
      apiPath="/api/admin/eduos/demo-requests"
      initialItems={items}
      type="eduos-demo"
    />
  );
}
