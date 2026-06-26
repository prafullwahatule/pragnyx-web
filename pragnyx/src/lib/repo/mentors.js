import { createContentRepo } from "./factory";
import { MENTORS } from "@/data/site";

export const mentorsRepo = createContentRepo({
  table: "mentors",
  idColumn: "id",
  idIsText: true,
  jsonColumns: ["tracks"],
  staticData: MENTORS,
  columns: ["name", "title", "bio", "tracks", "rating", "sessions", "color", "position", "visible"],
});
