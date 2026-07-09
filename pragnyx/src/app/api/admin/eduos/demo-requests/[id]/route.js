import { updateEduOSDemoRequestStatus, deleteEduOSDemoRequest } from "@/lib/repo/eduos";
import { requireAdmin } from "@/lib/apiGuard";

export async function PATCH(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updated = await updateEduOSDemoRequestStatus(id, body.status || "read");
  return Response.json({ item: updated });
}

export async function DELETE(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  await deleteEduOSDemoRequest(id);
  return Response.json({ ok: true });
}
