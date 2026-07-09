import { getEduOSDemoRequests } from "@/lib/repo/eduos";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getEduOSDemoRequests();
  return Response.json({ items });
}
