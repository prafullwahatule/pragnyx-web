import { createContentRepo } from "./factory";
import { NAV_LINKS } from "@/data/site";

export const navLinksRepo = createContentRepo({
  table: "nav_links",
  idColumn: "id",
  idIsText: false,
  jsonColumns: [],
  staticData: NAV_LINKS,
  columns: ["href", "label", "position", "visible"],
});
