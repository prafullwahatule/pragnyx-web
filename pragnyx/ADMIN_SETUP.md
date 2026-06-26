# PragnyX Admin Panel — Setup Guide

Your site now has a full admin panel at **`/admin`** for managing every
piece of content (Solutions, Mentors, Jobs, Team, FAQs, Testimonials,
Stats, Pricing Plans, Learning Tracks, the Founder section, and
Certificates) plus an inbox for everything visitors submit (contact
messages, newsletter signups, learning requests, job applications).

It needs a Postgres database to store that data. Without one, the site
still works exactly as before (it falls back to the original static
content), but the admin panel can't save anything and form submissions
just get logged instead of stored.

This guide gets you from zero to a fully working admin panel on your
live Vercel domain in about 10 minutes.

---

## 1. Add a Postgres database

The easiest path on Vercel is **Neon**, which is built into Vercel's
Marketplace integrations (this replaced the old "Vercel Postgres"
product — same thing, different name).

1. Open your project on [vercel.com](https://vercel.com) → go to the
   **Storage** tab.
2. Click **Create Database** → choose **Neon** (Postgres).
3. Follow the prompts to create it and connect it to this project.
4. Vercel will automatically add a `DATABASE_URL` (or similarly named)
   environment variable to your project. Go to **Settings → Environment
   Variables** and confirm it's there — if it's named something else
   (e.g. `POSTGRES_URL`), copy its value into a new variable named
   exactly `DATABASE_URL`.

Already use Supabase, Railway, or another Postgres host instead? Skip
straight to step 2 — any standard Postgres connection string works,
this code isn't tied to a specific provider.

## 2. Set the remaining environment variables

In **Vercel → Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `DATABASE_URL` | Your Postgres connection string (from step 1) |
| `ADMIN_SESSION_SECRET` | A long random string — generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` | The email you'll use to log in the first time |
| `ADMIN_PASSWORD` | The password you'll use to log in the first time |

Apply these to all environments (Production, Preview, Development) so
it works the same everywhere. Then **redeploy** (Vercel → Deployments →
⋯ → Redeploy) so the new variables take effect.

> `ADMIN_EMAIL` / `ADMIN_PASSWORD` are only used **once** — the moment
> you successfully log in for the first time, a real admin account is
> created in the database and those two variables stop being read. You
> can change your password afterwards from inside the admin panel
> (top-left avatar menu → coming from `/api/admin/account`), or just
> leave the env vars in place; they're harmless once the account exists.

## 3. (Optional but recommended) Seed your existing content

Your site currently has real content hardcoded in `src/data/site.js`
(Solutions, Mentors, Jobs, Team, etc.) and `src/data/certificates.js`.
Running the seed script copies all of that into your new database, so
you start editing from your actual content instead of empty tables.

Run this **once**, from your own machine, with `DATABASE_URL` pointing
at your production database:

```bash
# install dependencies if you haven't already
npm install

# create a .env.local with your production DATABASE_URL, or export it:
export DATABASE_URL="postgres://...your connection string..."

npm run db:seed
```

It's safe to run more than once — it only seeds tables that are still
empty, so it will never duplicate data or overwrite anything you've
already edited in the admin panel.

If you skip this step, that's fine too — the database tables get
created automatically the first time the site or admin panel runs, and
the public site falls back to showing the static content until you add
your own through the admin panel.

## 4. Log in

Go to **`https://your-domain.com/admin/login`** and sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in step 2.

That's it — you're in. From here you can edit every section of the
site and see incoming form submissions.

---

## What's in the admin panel

**Site content** (each is a full add / edit / delete / reorder / show-hide screen):
- Solutions (the four service cards on the homepage and `/solutions`)
- Mentors (`/learning`)
- Pricing plans (`/learning`)
- Learning tracks (the dropdown options on the mentorship request form)
- Jobs (`/careers`)
- Team (`/about`)
- Founder (the founder section on `/about`)
- Testimonials (homepage carousel)
- FAQs (homepage and `/solutions`)
- Stats (the animated counters)

**Certificates** — issue, edit, or revoke PragnyX Learning certificates.
Issuing one here makes it instantly checkable at
`/learning/certificate/<id>` on the live site. The downloadable,
QR-coded PDF version is a separate **offline** step — that pipeline
needs a headless browser and can't run inside a serverless function, so
it stays a local script. After issuing a certificate in the admin
panel, run:

```bash
node scripts/certificates/render-certificate.js <certificate-id>
```

and follow the rest of `scripts/certificates/README.md` if you want the
printable PDF too. The live verification page works immediately either
way.

**Inbox**
- Contact messages (from `/contact`)
- Newsletter subscribers (from the footer form)
- Learning requests (from the mentorship request form on `/learning`)
- Job applications (from `/careers`)

---

## A couple of things worth knowing

- **Site navigation** (the links in the header) is intentionally *not*
  editable from the admin panel — changing nav labels without updating
  the matching page would just produce broken-looking links, so that
  one stays a code change.
- **The "Pillars/Values" section** on the homepage and about page (the
  philosophy/values cards with icons) isn't wired into this admin panel
  either — it uses icon components that don't translate cleanly into a
  database field. Everything else listed above is fully editable.
- If you ever remove `DATABASE_URL`, the live site doesn't break — it
  just falls back to showing the original static content again, the
  same way it did before the admin panel existed.
