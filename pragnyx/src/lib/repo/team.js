import { createContentRepo } from "./factory";
import { TEAM } from "@/data/site";

export const teamRepo = createContentRepo({
  table: "team_members",
  idColumn: "id",
  idIsText: true,
  jsonColumns: [],
  staticData: TEAM,
  columns: ["name", "role", "bio", "position", "visible"],
});
