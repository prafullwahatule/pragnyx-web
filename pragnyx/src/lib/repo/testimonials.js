import { createContentRepo } from "./factory";
import { TESTIMONIALS } from "@/data/site";

export const testimonialsRepo = createContentRepo({
  table: "testimonials",
  idColumn: "id",
  idIsText: false,
  jsonColumns: [],
  staticData: TESTIMONIALS,
  columns: ["name", "role", "quote", "position", "visible"],
});
