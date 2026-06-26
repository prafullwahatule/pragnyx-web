import { learningPlansRepo } from "@/lib/repo/learningPlans";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(learningPlansRepo);
