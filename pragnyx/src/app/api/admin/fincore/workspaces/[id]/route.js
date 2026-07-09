import { updateWorkspaceSubscriptionStatus, deleteWorkspace } from "@/lib/repo/fincore";
import { requireAdmin } from "@/lib/apiGuard";

export async function PATCH(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updated = await updateWorkspaceSubscriptionStatus(decodeURIComponent(id), body.status || "active");
  return Response.json({ item: updated });
}

export async function DELETE(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  await deleteWorkspace(decodeURIComponent(id));
  return Response.json({ ok: true });
}
