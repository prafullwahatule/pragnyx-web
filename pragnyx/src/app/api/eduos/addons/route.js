import { getEffectiveAddOns } from "@/lib/eduos/effectivePlans";

export const dynamic = "force-dynamic";

export async function GET() {
  const addOns = await getEffectiveAddOns();
  return Response.json({ addOns });
}
