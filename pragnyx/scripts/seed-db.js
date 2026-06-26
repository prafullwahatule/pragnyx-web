/**
 * Seeds the database with the original static content shipped with the
 * site (src/data/site.js, src/data/certificates.js), so the admin panel
 * and live site have starting data to edit instead of empty tables.
 *
 * Safe to re-run: skips tables that already have rows, so it won't
 * duplicate data or overwrite edits you've made in the admin panel.
 *
 * Usage:
 *   node scripts/seed-db.js
 *
 * Requires DATABASE_URL to be set (reads from .env.local automatically
 * if present, via the dotenv import below).
 */
const path = require("path");

try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
} catch {
  // dotenv not installed — fine if DATABASE_URL is already in the shell env.
}

const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local or your shell environment, then re-run.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("sslmode=disable") ? false : { rejectUnauthorized: false },
});

// ── Static data (duplicated here in plain JS so this script has zero
//    dependency on the Next.js build / module aliasing) ──────────────────

const NAV_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

async function loadSiteData() {
  // Re-use the actual site.js / certificates.js content by reading the
  // compiled exports through a tiny on-the-fly transpile-free import:
  // since these are plain ESM files with simple array/object literals,
  // we load them by stripping the `export const` syntax — far simpler
  // and more reliable than wiring Babel into a one-off script.
  const fs = require("fs");
  const sitePath = path.join(__dirname, "..", "src", "data", "site.js");
  const certPath = path.join(__dirname, "..", "src", "data", "certificates.js");

  const siteSource = fs
    .readFileSync(sitePath, "utf8")
    .replace(/^export\s+const/gm, "const")
    .replace(/^export\s+function/gm, "function")
    .replace(/^export\s+default.*$/gm, "");

  const certSource = fs
    .readFileSync(certPath, "utf8")
    .replace(/^export\s+const/gm, "const")
    .replace(/^export\s+function/gm, "function")
    .replace(/^export\s+default.*$/gm, "");

  const siteModule = { exports: {} };
  const siteFn = new Function("module", "exports", `${siteSource}\nmodule.exports = { PRODUCTS, FOUNDER, TEAM, STATS, TESTIMONIALS, FAQS, MENTORS, LEARNING_TRACKS, LEARNING_PLANS, JOBS };`);
  siteFn(siteModule, siteModule.exports);

  const certModule = { exports: {} };
  const certFn = new Function("module", "exports", `${certSource}\nmodule.exports = { CERTIFICATES };`);
  certFn(certModule, certModule.exports);

  return { ...siteModule.exports, ...certModule.exports };
}

async function tableIsEmpty(client, table) {
  const res = await client.query(`SELECT COUNT(*) FROM ${table}`);
  return Number(res.rows[0].count) === 0;
}

async function main() {
  const { SCHEMA_SQL } = require("../src/lib/schema.js");
  const client = await pool.connect();

  try {
    console.log("Creating tables (if they don't already exist)...");
    await client.query(SCHEMA_SQL);

    const data = await loadSiteData();

    if (await tableIsEmpty(client, "nav_links")) {
      console.log("Seeding nav_links...");
      for (let i = 0; i < NAV_LINKS.length; i++) {
        const l = NAV_LINKS[i];
        await client.query(
          "INSERT INTO nav_links (href, label, position) VALUES ($1,$2,$3)",
          [l.href, l.label, i]
        );
      }
    }

    if (await tableIsEmpty(client, "products")) {
      console.log("Seeding products...");
      for (let i = 0; i < data.PRODUCTS.length; i++) {
        const p = data.PRODUCTS[i];
        await client.query(
          `INSERT INTO products (slug, name, tag, summary, bullets, color, position)
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [p.slug, p.name, p.tag || "", p.summary || "", JSON.stringify(p.bullets || []), p.color || "blue", i]
        );
      }
    }

    if (await tableIsEmpty(client, "founder")) {
      console.log("Seeding founder...");
      await client.query(
        "INSERT INTO founder (name, title, bio, quote) VALUES ($1,$2,$3,$4)",
        [data.FOUNDER.name, data.FOUNDER.title, data.FOUNDER.bio, data.FOUNDER.quote]
      );
    }

    if (await tableIsEmpty(client, "team_members")) {
      console.log("Seeding team_members...");
      for (let i = 0; i < data.TEAM.length; i++) {
        const t = data.TEAM[i];
        await client.query(
          "INSERT INTO team_members (id, name, role, bio, position) VALUES ($1,$2,$3,$4,$5)",
          [t.id, t.name, t.role || "", t.bio || "", i]
        );
      }
    }

    if (await tableIsEmpty(client, "stats")) {
      console.log("Seeding stats...");
      for (let i = 0; i < data.STATS.length; i++) {
        const s = data.STATS[i];
        await client.query(
          "INSERT INTO stats (value, suffix, label, position) VALUES ($1,$2,$3,$4)",
          [s.value, s.suffix || "", s.label || "", i]
        );
      }
    }

    if (await tableIsEmpty(client, "testimonials")) {
      console.log("Seeding testimonials...");
      for (let i = 0; i < data.TESTIMONIALS.length; i++) {
        const t = data.TESTIMONIALS[i];
        await client.query(
          "INSERT INTO testimonials (name, role, quote, position) VALUES ($1,$2,$3,$4)",
          [t.name, t.role || "", t.quote || "", i]
        );
      }
    }

    if (await tableIsEmpty(client, "faqs")) {
      console.log("Seeding faqs...");
      for (let i = 0; i < data.FAQS.length; i++) {
        const f = data.FAQS[i];
        await client.query("INSERT INTO faqs (q, a, position) VALUES ($1,$2,$3)", [f.q, f.a || "", i]);
      }
    }

    if (await tableIsEmpty(client, "mentors")) {
      console.log("Seeding mentors...");
      for (let i = 0; i < data.MENTORS.length; i++) {
        const m = data.MENTORS[i];
        await client.query(
          `INSERT INTO mentors (id, name, title, bio, tracks, rating, sessions, color, position)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
          [m.id, m.name, m.title || "", m.bio || "", JSON.stringify(m.tracks || []), m.rating || 5, m.sessions || 0, m.color || "blue", i]
        );
      }
    }

    if (await tableIsEmpty(client, "learning_tracks")) {
      console.log("Seeding learning_tracks...");
      for (let i = 0; i < data.LEARNING_TRACKS.length; i++) {
        await client.query("INSERT INTO learning_tracks (label, position) VALUES ($1,$2)", [data.LEARNING_TRACKS[i], i]);
      }
    }

    if (await tableIsEmpty(client, "learning_plans")) {
      console.log("Seeding learning_plans...");
      for (let i = 0; i < data.LEARNING_PLANS.length; i++) {
        const p = data.LEARNING_PLANS[i];
        await client.query(
          `INSERT INTO learning_plans (name, price, period, description, features, featured, position)
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [p.name, p.price || "", p.period || "", p.description || "", JSON.stringify(p.features || []), !!p.featured, i]
        );
      }
    }

    if (await tableIsEmpty(client, "jobs")) {
      console.log("Seeding jobs...");
      for (let i = 0; i < data.JOBS.length; i++) {
        const j = data.JOBS[i];
        await client.query(
          "INSERT INTO jobs (id, title, location, type, summary, position) VALUES ($1,$2,$3,$4,$5,$6)",
          [j.id, j.title, j.location || "Remote", j.type || "Full-time", j.summary || "", i]
        );
      }
    }

    if (await tableIsEmpty(client, "certificates")) {
      console.log("Seeding certificates...");
      for (const c of data.CERTIFICATES) {
        await client.query(
          `INSERT INTO certificates
            (id, recipient_name, course, trainer, duration_label, duration_minutes, training_type,
             sessions_count, learners_count, skills, issued_on, completion_date, certifying_org, status, pdf_url, image_url)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
          [
            c.id,
            c.recipientName,
            JSON.stringify(c.course || {}),
            JSON.stringify(c.trainer || {}),
            c.durationLabel || "",
            c.durationMinutes || 0,
            c.trainingType || "",
            c.sessionsCount || 0,
            c.learnersCount || 0,
            JSON.stringify(c.skills || []),
            c.issuedOn || null,
            c.completionDate || null,
            c.certifyingOrg || "PragnyX Learning",
            c.status || "verified",
            c.pdfUrl || "",
            c.imageUrl || "",
          ]
        );
      }
    }

    console.log("\n✅ Seed complete. Your database now has the site's starting content.");
    console.log("   Go to /admin to start editing it.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
