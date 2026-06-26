import { query, isDbConfigured, ensureSchema } from "../db";
import { PRODUCTS as STATIC_PRODUCTS } from "@/data/site";

function rowToProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tag: row.tag,
    summary: row.summary,
    bullets: row.bullets || [],
    color: row.color,
    position: row.position,
    visible: row.visible,
  };
}

/** Public-facing: visible products, ordered, for the live site. */
export async function getPublicProducts() {
  if (!isDbConfigured()) return STATIC_PRODUCTS;
  await ensureSchema();
  const res = await query(
    "SELECT * FROM products WHERE visible = true ORDER BY position ASC, id ASC"
  );
  if (!res || res.rows.length === 0) return STATIC_PRODUCTS;
  return res.rows.map(rowToProduct);
}

/** Admin-facing: every product, including hidden ones. */
export async function getAllProducts() {
  if (!isDbConfigured()) return STATIC_PRODUCTS.map((p, i) => ({ ...p, id: i + 1, visible: true }));
  await ensureSchema();
  const res = await query("SELECT * FROM products ORDER BY position ASC, id ASC");
  return res ? res.rows.map(rowToProduct) : [];
}

export async function getProductById(id) {
  await ensureSchema();
  const res = await query("SELECT * FROM products WHERE id = $1", [id]);
  return res && res.rows[0] ? rowToProduct(res.rows[0]) : null;
}

export async function createProduct(data) {
  await ensureSchema();
  const res = await query(
    `INSERT INTO products (slug, name, tag, summary, bullets, color, position, visible)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      data.slug,
      data.name,
      data.tag || "",
      data.summary || "",
      JSON.stringify(data.bullets || []),
      data.color || "blue",
      data.position ?? 0,
      data.visible ?? true,
    ]
  );
  return rowToProduct(res.rows[0]);
}

export async function updateProduct(id, data) {
  await ensureSchema();
  const res = await query(
    `UPDATE products SET slug=$1, name=$2, tag=$3, summary=$4, bullets=$5, color=$6, position=$7, visible=$8
     WHERE id=$9 RETURNING *`,
    [
      data.slug,
      data.name,
      data.tag || "",
      data.summary || "",
      JSON.stringify(data.bullets || []),
      data.color || "blue",
      data.position ?? 0,
      data.visible ?? true,
      id,
    ]
  );
  return res.rows[0] ? rowToProduct(res.rows[0]) : null;
}

export async function deleteProduct(id) {
  await ensureSchema();
  await query("DELETE FROM products WHERE id = $1", [id]);
  return true;
}
