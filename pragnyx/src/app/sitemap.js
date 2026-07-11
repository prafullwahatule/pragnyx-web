const SITE_URL = "https://pragnyx.in"; // matches metadataBase in src/app/layout.js

// Static, indexable marketing/content routes only. Deliberately excludes:
//  - /eduos/login, /fincore/login — functional auth pages, marked
//    robots:{index:false} on the page itself (see those page.js files)
//  - /eduos/dashboard, /eduos/onboarding, /eduos/reset-password (+fincore
//    equivalents) — gated behind a session, nothing for a crawler to see
//  - /admin/* — private, has its own auth
//  - /learning/certificate/[id] — per-recipient dynamic pages; each one
//    already ships full canonical/openGraph metadata via its own
//    generateMetadata() so it's discoverable when shared/linked, but
//    there's no fixed list of them to enumerate here
const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning", changeFrequency: "weekly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.2 },
  { path: "/eduos", changeFrequency: "weekly", priority: 0.9 },
  { path: "/eduos/pricing", changeFrequency: "weekly", priority: 0.8 },
  { path: "/eduos/signup", changeFrequency: "monthly", priority: 0.6 },
  { path: "/fincore", changeFrequency: "weekly", priority: 0.9 },
  { path: "/fincore/pricing", changeFrequency: "weekly", priority: 0.8 },
  { path: "/fincore/signup", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap() {
  const lastModified = new Date();
  return STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
