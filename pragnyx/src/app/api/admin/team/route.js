import { teamRepo } from "@/lib/repo/team";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(teamRepo);
