import { mentorsRepo } from "@/lib/repo/mentors";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(mentorsRepo);
