import { updateLearningTrack, deleteLearningTrack } from "@/lib/repo/learningTracks";
import { requireAdmin } from "@/lib/apiGuard";

export async function PATCH(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  const label = (body?.label || "").trim();
  if (!label) {
    return Response.json({ error: "Label is required." }, { status: 400 });
  }
  const updated = await updateLearningTrack(id, label);
  if (!updated) return Response.json({ error: "Not found." }, { status: 404 });
  return Response.json({ item: updated });
}

export async function DELETE(request, { params }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { id } = await params;
  await deleteLearningTrack(id);
  return Response.json({ ok: true });
}
