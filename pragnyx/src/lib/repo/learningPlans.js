import { createContentRepo } from "./factory";
import { LEARNING_PLANS } from "@/data/site";

export const learningPlansRepo = createContentRepo({
  table: "learning_plans",
  idColumn: "id",
  idIsText: false,
  jsonColumns: ["features"],
  staticData: LEARNING_PLANS,
  columns: ["name", "price", "period", "description", "features", "featured", "position", "visible"],
});
