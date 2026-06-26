import { deleteNewsletterSubscriber } from "@/lib/repo/submissions";
import { requireAdmin } from "@/lib/apiGuard";

export async function DELETE(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  await deleteNewsletterSubscriber(id);
  return Response.json({ ok: true });
}
