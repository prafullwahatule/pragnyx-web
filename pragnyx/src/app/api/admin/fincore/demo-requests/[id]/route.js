import { updateFinCoreDemoRequestStatus, deleteFinCoreDemoRequest } from "@/lib/repo/fincore";
import { requireAdmin } from "@/lib/apiGuard";

export async function PATCH(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updated = await updateFinCoreDemoRequestStatus(id, body.status || "read");
  return Response.json({ item: updated });
}

export async function DELETE(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  await deleteFinCoreDemoRequest(id);
  return Response.json({ ok: true });
}
