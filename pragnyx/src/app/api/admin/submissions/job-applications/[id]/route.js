import { updateJobApplicationStatus, deleteJobApplication } from "@/lib/repo/submissions";
import { requireAdmin } from "@/lib/apiGuard";

export async function PATCH(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updated = await updateJobApplicationStatus(id, body.status || "read");
  return Response.json({ item: updated });
}

export async function DELETE(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  await deleteJobApplication(id);
  return Response.json({ ok: true });
}
