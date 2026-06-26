import { getLearningRequests } from "@/lib/repo/submissions";
import SubmissionsInbox from "@/components/admin/SubmissionsInbox";

export default async function AdminLearningRequestsPage() {
  const items = await getLearningRequests();

  return (
    <SubmissionsInbox
      title="Learning requests"
      description="Submitted via the mentorship request form on /learning."
      apiPath="/api/admin/submissions/learning-requests"
      initialItems={items}
      type="learning-requests"
    />
  );
}
