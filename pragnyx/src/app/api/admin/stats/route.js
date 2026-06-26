import { statsRepo } from "@/lib/repo/stats";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(statsRepo);
