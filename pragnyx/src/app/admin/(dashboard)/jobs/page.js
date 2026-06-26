import { jobsRepo } from "@/lib/repo/jobs";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminJobsPage() {
  const jobs = await jobsRepo.getAll();

  return (
    <AdminCrudManager
      title="Jobs"
      description="Open roles shown on the /careers page."
      apiPath="/api/admin/jobs"
      initialItems={jobs}
      idField="id"
      idIsEditable
      titleField="title"
      subtitleTemplate="{location} · {type}"
      fields={[
        { name: "title", label: "Job title", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: [
            { value: "Full-time", label: "Full-time" },
            { value: "Part-time", label: "Part-time" },
            { value: "Contract", label: "Contract" },
            { value: "Internship", label: "Internship" },
          ],
        },
        { name: "summary", label: "Summary", type: "textarea", required: true },
      ]}
    />
  );
}
