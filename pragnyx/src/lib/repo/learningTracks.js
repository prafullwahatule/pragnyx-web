import { query, isDbConfigured, ensureSchema } from "../db";
import { LEARNING_TRACKS } from "@/data/site";

export async function getPublicLearningTracks() {
  if (!isDbConfigured()) return LEARNING_TRACKS;
  await ensureSchema();
  const res = await query("SELECT label FROM learning_tracks ORDER BY position ASC, id ASC");
  if (!res || res.rows.length === 0) return LEARNING_TRACKS;
  return res.rows.map((r) => r.label);
}

export async function getAllLearningTracks() {
  if (!isDbConfigured()) {
    return LEARNING_TRACKS.map((label, i) => ({ id: i + 1, label, position: i }));
  }
  await ensureSchema();
  const res = await query("SELECT * FROM learning_tracks ORDER BY position ASC, id ASC");
  return res ? res.rows : [];
}

export async function createLearningTrack(label) {
  await ensureSchema();
  const countRes = await query("SELECT COUNT(*) FROM learning_tracks");
  const position = Number(countRes.rows[0].count);
  const res = await query(
    "INSERT INTO learning_tracks (label, position) VALUES ($1, $2) RETURNING *",
    [label, position]
  );
  return res.rows[0];
}

export async function updateLearningTrack(id, label) {
  await ensureSchema();
  const res = await query(
    "UPDATE learning_tracks SET label = $1 WHERE id = $2 RETURNING *",
    [label, id]
  );
  return res.rows[0] || null;
}

export async function deleteLearningTrack(id) {
  await ensureSchema();
  await query("DELETE FROM learning_tracks WHERE id = $1", [id]);
  return true;
}

export async function reorderLearningTracks(orderedIds) {
  await ensureSchema();
  await Promise.all(
    orderedIds.map((id, index) =>
      query("UPDATE learning_tracks SET position = $1 WHERE id = $2", [index, id])
    )
  );
  return true;
}
