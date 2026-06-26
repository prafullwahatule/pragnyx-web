import { query, isDbConfigured, ensureSchema } from "../db";
import { hashPassword, verifyPassword } from "../auth";

/**
 * The admin account is bootstrapped from ADMIN_EMAIL / ADMIN_PASSWORD env
 * vars on first successful login attempt that matches those env vars —
 * there is no public signup route. After that, the hashed password lives
 * in the database and env vars are no longer read for login (so rotating
 * the password via the admin panel works without redeploying).
 */
export async function findAdminByEmail(email) {
  if (!isDbConfigured()) return null;
  await ensureSchema();
  const res = await query("SELECT * FROM admin_users WHERE email = $1", [email.toLowerCase()]);
  return res?.rows[0] || null;
}

export async function createAdminUser({ email, password, name = "Admin" }) {
  await ensureSchema();
  const passwordHash = await hashPassword(password);
  const res = await query(
    "INSERT INTO admin_users (email, password_hash, name) VALUES ($1,$2,$3) RETURNING *",
    [email.toLowerCase(), passwordHash, name]
  );
  return res.rows[0];
}

export async function updateAdminPassword(id, newPassword) {
  await ensureSchema();
  const passwordHash = await hashPassword(newPassword);
  await query("UPDATE admin_users SET password_hash = $1 WHERE id = $2", [passwordHash, id]);
  return true;
}

export async function adminUserCount() {
  if (!isDbConfigured()) return 0;
  await ensureSchema();
  const res = await query("SELECT COUNT(*) FROM admin_users");
  return Number(res.rows[0].count);
}

/**
 * Authenticates a login attempt. Handles three cases:
 * 1. No DB configured → reject (admin panel requires a database).
 * 2. No admin user exists yet AND credentials match ADMIN_EMAIL/ADMIN_PASSWORD
 *    env vars → bootstrap the admin_users row, then succeed.
 * 3. Admin user exists → check email + bcrypt-compare password.
 */
export async function authenticateAdmin(email, password) {
  if (!isDbConfigured()) {
    return { ok: false, reason: "no-db" };
  }

  const normalizedEmail = (email || "").trim().toLowerCase();
  const existing = await findAdminByEmail(normalizedEmail);

  if (!existing) {
    const count = await adminUserCount();
    const envEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || "";

    if (
      count === 0 &&
      envEmail &&
      envPassword &&
      normalizedEmail === envEmail &&
      password === envPassword
    ) {
      const created = await createAdminUser({ email: normalizedEmail, password, name: "Admin" });
      return { ok: true, user: created };
    }
    return { ok: false, reason: "invalid-credentials" };
  }

  const valid = await verifyPassword(password, existing.password_hash);
  if (!valid) return { ok: false, reason: "invalid-credentials" };

  return { ok: true, user: existing };
}
