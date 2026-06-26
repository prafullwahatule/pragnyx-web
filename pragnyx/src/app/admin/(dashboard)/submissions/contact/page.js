import { getContactSubmissions } from "@/lib/repo/submissions";
import SubmissionsInbox from "@/components/admin/SubmissionsInbox";

export default async function AdminContactSubmissionsPage() {
  const items = await getContactSubmissions();

  return (
    <SubmissionsInbox
      title="Contact messages"
      description="Submitted via the /contact page form."
      apiPath="/api/admin/submissions/contact"
      initialItems={items}
      type="contact"
    />
  );
}
