import { createContentRepo } from "./factory";
import { STATS } from "@/data/site";

export const statsRepo = createContentRepo({
  table: "stats",
  idColumn: "id",
  idIsText: false,
  jsonColumns: [],
  staticData: STATS,
  columns: ["value", "suffix", "label", "position", "visible"],
});
