import { getNewsletterSubscribers } from "@/lib/repo/submissions";
import SubmissionsInbox from "@/components/admin/SubmissionsInbox";

export default async function AdminNewsletterPage() {
  const items = await getNewsletterSubscribers();

  return (
    <SubmissionsInbox
      title="Newsletter subscribers"
      description="Everyone who subscribed via the footer newsletter form."
      apiPath="/api/admin/submissions/newsletter"
      initialItems={items}
      type="newsletter"
      hasStatus={false}
    />
  );
}
