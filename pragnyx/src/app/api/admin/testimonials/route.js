import { testimonialsRepo } from "@/lib/repo/testimonials";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(testimonialsRepo);
