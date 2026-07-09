import { getEffectivePlans } from "@/lib/fincore/effectivePlans";

export const dynamic = "force-dynamic";

export async function GET() {
  const plans = await getEffectivePlans();
  return Response.json({ plans });
}
