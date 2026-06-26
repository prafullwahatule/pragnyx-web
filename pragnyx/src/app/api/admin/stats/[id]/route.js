import { statsRepo } from "@/lib/repo/stats";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(statsRepo);
