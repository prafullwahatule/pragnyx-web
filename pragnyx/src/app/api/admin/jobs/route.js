import { jobsRepo } from "@/lib/repo/jobs";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(jobsRepo);
