import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://pragnyx.in"),

  // Core
  title: {
    default: "PragnyX — Wisdom for the Next Frontier",
    template: "%s | PragnyX",
  },
  description:
    "PragnyX is a future-focused brand dedicated to innovation, creativity, and intelligent thinking. We challenge boundaries, explore new possibilities, and build a world driven by ideas that create lasting impact. The future is not predicted — it is engineered.",
  keywords: [
    "PragnyX",
    "innovation",
    "future technology",
    "creative thinking",
    "intelligent design",
    "next frontier",
    "engineering the future",
  ],
  authors: [{ name: "PragnyX", url: "https://pragnyx.in" }],
  creator: "PragnyX",
  publisher: "PragnyX",

  // Canonical
  alternates: {
    canonical: "https://pragnyx.in",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pragnyx.in",
    siteName: "PragnyX",
    title: "PragnyX — Wisdom for the Next Frontier",
    description:
      "Future-focused innovation, creativity, and intelligent thinking. At PragnyX, the future is not predicted — it is engineered.",
    // Image comes from src/app/opengraph-image.js (Next's file convention) —
    // Next generates it and injects og:image (and the twitter:image
    // fallback below) automatically, so there's nothing to list here.
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "PragnyX — Wisdom for the Next Frontier",
    description:
      "Future-focused innovation, creativity, and intelligent thinking. The future is not predicted — it is engineered.",
    site: "@pragnyx",      // update to your handle
    creator: "@pragnyx",   // update to your handle
    // No explicit images — falls back to opengraph-image.js, same as above.
  },

  // Icons
  icons: {
    icon: [
      { url: "/logo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-16.png", sizes: "16x16", type: "image/png" }, // add if you have it
    ],
    apple: { url: "/logo/favicon-180.png", sizes: "180x180" },
    shortcut: "/logo/favicon-32.png",
  },

  // Manifest
  manifest: "/site.webmanifest", // add a webmanifest for PWA signals

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your tokens)
  // verification: {
  //   google: "your-google-site-verification-token",
  //   yandex: "your-yandex-token",
  // },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PragnyX",
  url: "https://pragnyx.in",
  logo: "https://pragnyx.in/logo/favicon-180.png",
  description:
    "PragnyX is a future-focused brand dedicated to innovation, creativity, and intelligent thinking.",
  sameAs: [
    // "https://twitter.com/pragnyx",
    // "https://linkedin.com/company/pragnyx",
  ],
};

export default function RootLayout({ children }) {
  // Plausible — privacy-friendly, cookieless analytics (not Google
  // Analytics). Only renders once NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
  // (see .env.example), so local/dev/preview environments don't send
  // traffic anywhere by default. Covers the whole site — this layout
  // wraps every route, including /eduos/* and /fincore/*.
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-void text-paper selection:bg-fuchsia-500/30 selection:text-white">
        {children}
        {plausibleDomain && (
          <Script defer data-domain={plausibleDomain} src={plausibleSrc} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}