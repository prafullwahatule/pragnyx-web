import { faqsRepo } from "@/lib/repo/faqs";
import { createItemHandlers } from "@/lib/adminCrudFactory";

export const { PATCH, DELETE } = createItemHandlers(faqsRepo);
