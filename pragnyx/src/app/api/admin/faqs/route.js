import { faqsRepo } from "@/lib/repo/faqs";
import { createCollectionHandlers } from "@/lib/adminCrudFactory";

export const { GET, POST } = createCollectionHandlers(faqsRepo);
