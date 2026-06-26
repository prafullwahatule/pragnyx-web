import { getJobApplications } from "@/lib/repo/submissions";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getJobApplications();
  return Response.json({ items });
}
