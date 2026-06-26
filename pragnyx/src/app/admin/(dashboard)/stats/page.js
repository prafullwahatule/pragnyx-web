import { statsRepo } from "@/lib/repo/stats";
import AdminCrudManager from "@/components/admin/AdminCrudManager";

export default async function AdminStatsPage() {
  const stats = await statsRepo.getAll();

  return (
    <AdminCrudManager
      title="Stats"
      description="The animated counters shown on the homepage and /about page."
      apiPath="/api/admin/stats"
      initialItems={stats}
      idField="id"
      idIsEditable={false}
      titleField="label"
      subtitleTemplate="{value}{suffix}"
      fields={[
        { name: "value", label: "Value (number)", type: "number", required: true },
        { name: "suffix", label: "Suffix (e.g. +, %, /7)", type: "text" },
        { name: "label", label: "Label", type: "text", required: true },
      ]}
    />
  );
}
