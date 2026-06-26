import {
  getAllLearningTracks,
  createLearningTrack,
  reorderLearningTracks,
} from "@/lib/repo/learningTracks";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getAllLearningTracks();
  return Response.json({ items });
}

export async function POST(request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body?.reorder) {
    await reorderLearningTracks(body.reorder);
    return Response.json({ ok: true });
  }

  const label = (body?.label || "").trim();
  if (!label) {
    return Response.json({ error: "Label is required." }, { status: 400 });
  }
  const created = await createLearningTrack(label);
  return Response.json({ item: created }, { status: 201 });
}
