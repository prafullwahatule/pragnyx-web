# PragnyX — Website

A dark-themed, multi-page brand site for **PragnyX**, built with Next.js (App Router) + Tailwind CSS v4.

## What's inside

**Pages** (`src/app/`)
- `/` — Home: hero, animated stats, product teasers, philosophy, PragnyX Learning teaser, testimonials carousel, manifesto, FAQ accordion, contact CTA
- `/solutions` — Atlas, Lumen, Forge, Signal — full product detail sections
- `/learning` — **PragnyX Learning**: how it works, filterable mentor directory, pricing plans, working booking/request form
- `/about` — company story, values, timeline, stats
- `/careers` — perks + open roles with inline apply forms
- `/contact` — full contact form
- `not-found.js` — on-brand 404 page

**Working API routes** (`src/app/api/`)
- `POST /api/contact` — validates and logs contact submissions (used by Contact page + Careers apply forms)
- `POST /api/newsletter` — validates and stores email signups (used by Footer)
- `POST /api/learning-request` — validates and logs PragnyX Learning session requests, supports optional mentor preselection

All forms are real client components with loading/error/success states wired to these routes — not static mockups.

**Content** (`src/data/site.js`) — single source of truth for nav links, products, mentors, pricing plans, testimonials, FAQ, jobs, and stats. Edit this file to change copy across the whole site without touching components.

**Components** (`src/components/`) — Navbar, Footer, PageHero, and section components for each page, plus shared UI helpers (Reveal scroll animations, AnimatedCounter, NewsletterForm, SocialIcons).

**Assets** (`public/logo/`) — wordmark + badge logos (background-removed, transparent PNGs) and favicons.

Fonts (Space Grotesk, Inter, JetBrains Mono) are bundled locally via `@fontsource`, so the site doesn't depend on Google Fonts at build/runtime.

## Run it locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build for production
```bash
npm run build
npm start
```

## Deploy to pragnyx.in (free, with Vercel)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → sign in with GitHub → "Import Project" → select the repo. Vercel auto-detects Next.js, no config needed.
3. Once deployed, go to your Vercel project → **Settings → Domains** → add `pragnyx.in` (and `www.pragnyx.in`).
4. Vercel will show you DNS records (an `A` record and a `CNAME`). Add those in your domain registrar's DNS settings.
5. Wait for DNS to propagate (10 min–few hours). Vercel issues free SSL automatically.

## Things to customize before launch
- **API routes** (`src/app/api/*/route.js`): currently log submissions server-side with in-memory storage for the newsletter. Wire these up to a real backend — a database, a CRM, or an email service (Resend, Postmark) — before launch, since data does not persist across server restarts as-is.
- **Content** (`src/data/site.js`): product descriptions, mentor bios, job listings, pricing, testimonials, and FAQ are all placeholder copy reflecting a plausible product lineup. Replace with your real products, team, and pricing.
- **Email + social links**: update `hello@pragnyx.in` and the LinkedIn / X / Instagram `href="#"` placeholders in `Contact.jsx` and `Footer.jsx` with your real links.
- **Favicon/OG image**: already set from your badge logo, but feel free to swap `public/logo/favicon-*.png` if you'd like a different crop.

