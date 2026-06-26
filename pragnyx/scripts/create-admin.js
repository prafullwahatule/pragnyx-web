/**
 * Creates (or resets the password of) the PragnyX admin account directly
 * in the database. Useful for local setup/testing, or if you ever need to
 * reset the password without going through the login-bootstrap flow.
 *
 * Usage:
 *   node scripts/create-admin.js you@example.com "a strong password"
 *
 * Requires DATABASE_URL to be set (reads .env.local automatically if present).
 */
const path = require("path");

try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
} catch {
  // fine if DATABASE_URL is already in the shell env
}

const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

async function main() {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error('Usage: node scripts/create-admin.js you@example.com "your password"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Add it to .env.local or your shell environment.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("sslmode=disable") ? false : { rejectUnauthorized: false },
  });

  const client = await pool.connect();
  try {
    const { SCHEMA_SQL } = require("../src/lib/schema.js");
    await client.query(SCHEMA_SQL);

    const passwordHash = await bcrypt.hash(password, 10);
    const existing = await client.query("SELECT id FROM admin_users WHERE email = $1", [email.toLowerCase()]);

    if (existing.rows.length > 0) {
      await client.query("UPDATE admin_users SET password_hash = $1 WHERE email = $2", [
        passwordHash,
        email.toLowerCase(),
      ]);
      console.log(`✅ Password updated for ${email}.`);
    } else {
      await client.query(
        "INSERT INTO admin_users (email, password_hash, name) VALUES ($1,$2,$3)",
        [email.toLowerCase(), passwordHash, "Admin"]
      );
      console.log(`✅ Admin account created for ${email}.`);
    }
    console.log("   You can now sign in at /admin/login.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
