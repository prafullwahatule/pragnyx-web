import { createContentRepo } from "./factory";
import { FAQS } from "@/data/site";

export const faqsRepo = createContentRepo({
  table: "faqs",
  idColumn: "id",
  idIsText: false,
  jsonColumns: [],
  staticData: FAQS,
  columns: ["q", "a", "position", "visible"],
});
