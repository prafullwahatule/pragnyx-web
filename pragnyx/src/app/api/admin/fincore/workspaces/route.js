import { listWorkspaces } from "@/lib/repo/fincore";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await listWorkspaces();
  return Response.json({ items });
}
