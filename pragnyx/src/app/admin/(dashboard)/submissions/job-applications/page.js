import { getJobApplications } from "@/lib/repo/submissions";
import SubmissionsInbox from "@/components/admin/SubmissionsInbox";

export default async function AdminJobApplicationsPage() {
  const items = await getJobApplications();

  return (
    <SubmissionsInbox
      title="Job applications"
      description="Submitted via the apply form on /careers."
      apiPath="/api/admin/submissions/job-applications"
      initialItems={items}
      type="job-applications"
    />
  );
}
