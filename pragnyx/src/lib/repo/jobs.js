import { createContentRepo } from "./factory";
import { JOBS } from "@/data/site";

export const jobsRepo = createContentRepo({
  table: "jobs",
  idColumn: "id",
  idIsText: true,
  jsonColumns: [],
  staticData: JOBS,
  columns: ["title", "location", "type", "summary", "position", "visible"],
});
