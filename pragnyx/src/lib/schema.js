// Full Postgres schema for the PragnyX admin panel.
// Every CREATE statement is idempotent (IF NOT EXISTS) so this can run on
// every cold start with no migration tooling required.
//
// Design notes:
// - `position` columns control display order on the public site; admin
//   pages let you drag/reorder which writes new position values.
// - Content tables mirror the shape of src/data/site.js exactly, so the
//   seed script can load straight from there and public components need
//   minimal changes.
// - `certificates.course` and a few other nested/variable-shape fields are
//   stored as JSONB rather than normalized — they're read as a single
//   blob everywhere they're used (certificate page, PDF generator) and
//   don't need relational queries of their own.

export const SCHEMA_SQL = `
-- ───────────────────────── Auth ─────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL DEFAULT 'Admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ───────────────────── Site content ─────────────────────
CREATE TABLE IF NOT EXISTS nav_links (
  id       SERIAL PRIMARY KEY,
  href     TEXT NOT NULL,
  label    TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS products (
  id       SERIAL PRIMARY KEY,
  slug     TEXT UNIQUE NOT NULL,
  name     TEXT NOT NULL,
  tag      TEXT NOT NULL DEFAULT '',
  summary  TEXT NOT NULL DEFAULT '',
  bullets  JSONB NOT NULL DEFAULT '[]',
  color    TEXT NOT NULL DEFAULT 'blue',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS founder (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  bio   TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS team_members (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  role     TEXT NOT NULL DEFAULT '',
  bio      TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS stats (
  id       SERIAL PRIMARY KEY,
  value    NUMERIC NOT NULL DEFAULT 0,
  suffix   TEXT NOT NULL DEFAULT '',
  label    TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS pillars (
  id       TEXT PRIMARY KEY,
  title    TEXT NOT NULL DEFAULT '',
  copy     TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS testimonials (
  id       SERIAL PRIMARY KEY,
  name     TEXT NOT NULL,
  role     TEXT NOT NULL DEFAULT '',
  quote    TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS faqs (
  id       SERIAL PRIMARY KEY,
  q        TEXT NOT NULL,
  a        TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS mentors (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  title    TEXT NOT NULL DEFAULT '',
  bio      TEXT NOT NULL DEFAULT '',
  tracks   JSONB NOT NULL DEFAULT '[]',
  rating   NUMERIC NOT NULL DEFAULT 5,
  sessions INTEGER NOT NULL DEFAULT 0,
  color    TEXT NOT NULL DEFAULT 'blue',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS learning_tracks (
  id       SERIAL PRIMARY KEY,
  label    TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS learning_plans (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  price       TEXT NOT NULL DEFAULT '',
  period      TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  features    JSONB NOT NULL DEFAULT '[]',
  featured    BOOLEAN NOT NULL DEFAULT false,
  position    INTEGER NOT NULL DEFAULT 0,
  visible     BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS jobs (
  id       TEXT PRIMARY KEY,
  title    TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Remote',
  type     TEXT NOT NULL DEFAULT 'Full-time',
  summary  TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  visible  BOOLEAN NOT NULL DEFAULT true
);

-- ───────────────────── Certificates ─────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id               TEXT PRIMARY KEY,
  recipient_name   TEXT NOT NULL,
  course           JSONB NOT NULL DEFAULT '{}',
  trainer          JSONB NOT NULL DEFAULT '{}',
  duration_label   TEXT NOT NULL DEFAULT '',
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  training_type    TEXT NOT NULL DEFAULT '',
  sessions_count   INTEGER NOT NULL DEFAULT 0,
  learners_count   INTEGER NOT NULL DEFAULT 0,
  skills           JSONB NOT NULL DEFAULT '[]',
  issued_on        DATE,
  completion_date  DATE,
  certifying_org   TEXT NOT NULL DEFAULT 'PragnyX Learning',
  status           TEXT NOT NULL DEFAULT 'verified',
  pdf_url          TEXT NOT NULL DEFAULT '',
  image_url        TEXT NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────── Submissions ──────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  source      TEXT NOT NULL DEFAULT 'contact',
  status      TEXT NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learning_requests (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  track       TEXT NOT NULL DEFAULT '',
  goal        TEXT NOT NULL DEFAULT '',
  mentor_id   TEXT,
  status      TEXT NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id          SERIAL PRIMARY KEY,
  job_id      TEXT,
  job_title   TEXT NOT NULL DEFAULT '',
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  note        TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────── PragnyX EduOS ───────────────────────
-- Multi-tenant workspace records created by the self-serve checkout flow
-- (see src/lib/eduos/provisioning.js) and demo requests from the Enterprise
-- / "Book a Demo" path. Kept separate from the tables above since this is
-- its own product line with its own lifecycle (subscriptions, renewals).

CREATE TABLE IF NOT EXISTS eduos_workspaces (
  institution_id       TEXT PRIMARY KEY,
  workspace_url         TEXT NOT NULL,
  tenant_id             TEXT NOT NULL,
  license_id            TEXT NOT NULL,
  plan                  TEXT NOT NULL,
  plan_name             TEXT NOT NULL,
  modules               JSONB NOT NULL DEFAULT '[]',
  add_ons               JSONB NOT NULL DEFAULT '[]',
  limits                JSONB NOT NULL DEFAULT '{}',
  activation_status     TEXT NOT NULL DEFAULT 'active',
  subscription_status   TEXT NOT NULL DEFAULT 'active',
  renewal_date           TIMESTAMPTZ,
  api_access             BOOLEAN NOT NULL DEFAULT false,
  institution            JSONB NOT NULL DEFAULT '{}',
  admin_account           JSONB NOT NULL DEFAULT '{}',
  billing                JSONB NOT NULL DEFAULT '{}',
  invoices                JSONB NOT NULL DEFAULT '[]',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS eduos_demo_requests (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  institution       TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT NOT NULL DEFAULT '',
  institution_size  TEXT NOT NULL DEFAULT '',
  message           TEXT NOT NULL DEFAULT '',
  status            TEXT NOT NULL DEFAULT 'new',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────── PragnyX FinCore ───────────────────────
-- Multi-tenant workspace records created by the self-serve checkout flow
-- (see src/lib/fincore/provisioning.js) and demo requests from the
-- Enterprise / "Book a Demo" path. Kept separate from the tables above
-- since this is its own product line with its own lifecycle
-- (subscriptions, renewals).

CREATE TABLE IF NOT EXISTS fincore_workspaces (
  company_id            TEXT PRIMARY KEY,
  workspace_url         TEXT NOT NULL,
  tenant_id             TEXT NOT NULL,
  license_id            TEXT NOT NULL,
  plan                  TEXT NOT NULL,
  plan_name             TEXT NOT NULL,
  modules               JSONB NOT NULL DEFAULT '[]',
  add_ons               JSONB NOT NULL DEFAULT '[]',
  limits                JSONB NOT NULL DEFAULT '{}',
  activation_status     TEXT NOT NULL DEFAULT 'active',
  subscription_status   TEXT NOT NULL DEFAULT 'active',
  renewal_date           TIMESTAMPTZ,
  api_access             BOOLEAN NOT NULL DEFAULT false,
  business                JSONB NOT NULL DEFAULT '{}',
  admin_account           JSONB NOT NULL DEFAULT '{}',
  billing                JSONB NOT NULL DEFAULT '{}',
  invoices                JSONB NOT NULL DEFAULT '[]',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fincore_demo_requests (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  business          TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT NOT NULL DEFAULT '',
  business_size     TEXT NOT NULL DEFAULT '',
  message           TEXT NOT NULL DEFAULT '',
  status            TEXT NOT NULL DEFAULT 'new',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin-editable price overrides for self-serve FinCore plans (Starter,
-- Professional). Enterprise stays "Contact Sales" and is never priced here.
-- Falls back to the defaults in src/lib/fincore/plans.js when no row
-- exists for a plan yet.
CREATE TABLE IF NOT EXISTS fincore_plan_prices (
  plan_id     TEXT PRIMARY KEY,
  price       INTEGER NOT NULL,
  currency    TEXT NOT NULL DEFAULT 'INR',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;
