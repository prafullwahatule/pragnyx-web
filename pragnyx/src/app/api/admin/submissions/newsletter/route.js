import { getNewsletterSubscribers } from "@/lib/repo/submissions";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getNewsletterSubscribers();
  return Response.json({ items });
}
