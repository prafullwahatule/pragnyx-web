import { mentorsRepo } from "@/lib/repo/mentors";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(mentorsRepo);
