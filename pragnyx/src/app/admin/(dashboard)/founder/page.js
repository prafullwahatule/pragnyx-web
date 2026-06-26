import { getFounder } from "@/lib/repo/founder";
import FounderEditor from "@/components/admin/FounderEditor";

export default async function AdminFounderPage() {
  const founder = await getFounder();
  return <FounderEditor initialFounder={founder} />;
}
