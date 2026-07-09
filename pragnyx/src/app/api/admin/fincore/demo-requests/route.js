import { getFinCoreDemoRequests } from "@/lib/repo/fincore";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getFinCoreDemoRequests();
  return Response.json({ items });
}
