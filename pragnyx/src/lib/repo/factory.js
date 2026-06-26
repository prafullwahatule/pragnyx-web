import { query, isDbConfigured, ensureSchema } from "../db";

/**
 * Builds a small CRUD repo for a simple content table that follows the
 * `position` + `visible` ordering convention used across this project.
 *
 * @param {object} opts
 * @param {string} opts.table - table name
 * @param {string} opts.idColumn - primary key column name ("id")
 * @param {boolean} opts.idIsText - true if the PK is a TEXT id (e.g. "mentor-arjun"), false if SERIAL int
 * @param {string[]} opts.jsonColumns - columns stored as JSONB that need JSON.stringify on write
 * @param {object} opts.staticData - fallback array used when no DB is configured
 * @param {(row:any)=>any} [opts.mapRow] - optional row transform (defaults to identity, but camelCases columns)
 */
export function createContentRepo({ table, idColumn = "id", idIsText = false, jsonColumns = [], staticData = [], columns }) {
  const cols = columns; // ordered list of column names, excluding id

  function rowToEntity(row) {
    const entity = { [idColumn === "id" ? "id" : idColumn]: row[idColumn] };
    for (const col of cols) {
      const camel = col.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      entity[camel] = row[col];
    }
    return entity;
  }

  async function getPublic() {
    if (!isDbConfigured()) return staticData;
    await ensureSchema();
    const res = await query(
      `SELECT * FROM ${table} WHERE visible = true ORDER BY position ASC, ${idColumn} ASC`
    );
    if (!res || res.rows.length === 0) return staticData;
    return res.rows.map(rowToEntity);
  }

  async function getAll() {
    if (!isDbConfigured()) {
      return staticData.map((d, i) => ({ ...d, position: i, visible: true }));
    }
    await ensureSchema();
    const res = await query(`SELECT * FROM ${table} ORDER BY position ASC, ${idColumn} ASC`);
    return res ? res.rows.map(rowToEntity) : [];
  }

  async function getById(id) {
    await ensureSchema();
    const res = await query(`SELECT * FROM ${table} WHERE ${idColumn} = $1`, [id]);
    return res && res.rows[0] ? rowToEntity(res.rows[0]) : null;
  }

  async function create(data) {
    await ensureSchema();
    const colNames = idIsText ? [idColumn, ...cols] : cols;
    const values = colNames.map((col) => {
      const camel = col.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      const v = camel === idColumn ? data[idColumn] : data[camel];
      if (jsonColumns.includes(col)) return JSON.stringify(v ?? []);
      return v;
    });
    const placeholders = colNames.map((_, i) => `$${i + 1}`).join(", ");
    const res = await query(
      `INSERT INTO ${table} (${colNames.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return rowToEntity(res.rows[0]);
  }

  async function update(id, data) {
    await ensureSchema();
    const setClauses = cols.map((col, i) => `${col} = $${i + 1}`).join(", ");
    const values = cols.map((col) => {
      const camel = col.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      const v = data[camel];
      if (jsonColumns.includes(col)) return JSON.stringify(v ?? []);
      return v;
    });
    values.push(id);
    const res = await query(
      `UPDATE ${table} SET ${setClauses} WHERE ${idColumn} = $${cols.length + 1} RETURNING *`,
      values
    );
    return res.rows[0] ? rowToEntity(res.rows[0]) : null;
  }

  async function remove(id) {
    await ensureSchema();
    await query(`DELETE FROM ${table} WHERE ${idColumn} = $1`, [id]);
    return true;
  }

  async function reorder(orderedIds) {
    await ensureSchema();
    await Promise.all(
      orderedIds.map((id, index) =>
        query(`UPDATE ${table} SET position = $1 WHERE ${idColumn} = $2`, [index, id])
      )
    );
    return true;
  }

  return { getPublic, getAll, getById, create, update, remove, reorder };
}
