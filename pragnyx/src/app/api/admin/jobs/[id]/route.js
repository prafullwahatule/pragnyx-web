import { jobsRepo } from "@/lib/repo/jobs";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(jobsRepo);
