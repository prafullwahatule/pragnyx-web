import { query, isDbConfigured, ensureSchema } from "../db";
import { FOUNDER } from "@/data/site";

export async function getFounder() {
  if (!isDbConfigured()) return FOUNDER;
  await ensureSchema();
  const res = await query("SELECT * FROM founder ORDER BY id ASC LIMIT 1");
  if (!res || res.rows.length === 0) return FOUNDER;
  const row = res.rows[0];
  return { name: row.name, title: row.title, bio: row.bio, quote: row.quote };
}

export async function updateFounder(data) {
  await ensureSchema();
  const existing = await query("SELECT id FROM founder ORDER BY id ASC LIMIT 1");
  if (existing.rows.length === 0) {
    const res = await query(
      "INSERT INTO founder (name, title, bio, quote) VALUES ($1,$2,$3,$4) RETURNING *",
      [data.name, data.title, data.bio, data.quote]
    );
    return res.rows[0];
  }
  const res = await query(
    "UPDATE founder SET name=$1, title=$2, bio=$3, quote=$4 WHERE id=$5 RETURNING *",
    [data.name, data.title, data.bio, data.quote, existing.rows[0].id]
  );
  return res.rows[0];
}
