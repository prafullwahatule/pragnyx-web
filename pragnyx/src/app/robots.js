const SITE_URL = "https://pragnyx.in"; // matches metadataBase in src/app/layout.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/",
          // Auth/session-gated app surfaces — no indexable content, and
          // the workspace dashboards would 307-redirect an unauthenticated
          // crawler back to /login anyway.
          "/eduos/login",
          "/eduos/dashboard",
          "/eduos/onboarding",
          "/eduos/reset-password",
          "/fincore/login",
          "/fincore/dashboard",
          "/fincore/onboarding",
          "/fincore/reset-password",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
