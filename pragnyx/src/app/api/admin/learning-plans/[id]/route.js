import { learningPlansRepo } from "@/lib/repo/learningPlans";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(learningPlansRepo);
