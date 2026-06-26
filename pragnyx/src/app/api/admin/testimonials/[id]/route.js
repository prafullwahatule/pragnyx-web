import { testimonialsRepo } from "@/lib/repo/testimonials";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(testimonialsRepo);
