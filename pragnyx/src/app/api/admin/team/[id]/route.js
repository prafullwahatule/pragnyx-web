import { teamRepo } from "@/lib/repo/team";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(teamRepo);
