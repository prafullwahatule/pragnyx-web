import { getFounder, updateFounder } from "@/lib/repo/founder";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const founder = await getFounder();
  return Response.json({ item: founder });
}

export async function PATCH(request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  const updated = await updateFounder(body);
  return Response.json({ item: updated });
}
