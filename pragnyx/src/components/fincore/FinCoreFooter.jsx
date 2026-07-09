import Link from "next/link";
import { LinkedInIcon, InstagramIcon } from "../SocialIcons";

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.62 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.63 1.57.24 2.73.12 3.02.73.79 1.17 1.81 1.17 3.05 0 4.37-2.66 5.33-5.19 5.61.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0023.02 11.5C23.02 5.24 18.27.5 12 .5z" />
    </svg>
  );
}

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/fincore#features", label: "Features" },
      { href: "/fincore/pricing", label: "Pricing" },
      { href: "/fincore#roadmap", label: "Roadmap" },
      { href: "/solutions#pragnyx-fincore", label: "Solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/fincore#faq", label: "FAQ" },
      { href: "/contact", label: "Documentation (coming soon)" },
      { href: "/fincore/login", label: "Log in" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function FinCoreFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--e-border)", background: "var(--e-bg-alt)" }}>
      <div className="e-shell" style={{ padding: "64px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 48 }} className="e-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, var(--e-primary), var(--e-primary-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "var(--e-font-display)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                X
              </span>
              <span style={{ fontFamily: "var(--e-font-display)", fontWeight: 600, fontSize: 15 }}>FinCore</span>
            </div>
            <p style={{ marginTop: 14, maxWidth: 320, fontSize: 14, color: "var(--e-ink-mute)", lineHeight: 1.6 }}>
              The AI financial operating system for modern businesses. A product by PragnyX.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[
                { icon: LinkedInIcon, href: "https://www.linkedin.com/company/pragnyx/" },
                { icon: InstagramIcon, href: "https://www.instagram.com/pragnyx" },
                { icon: GithubIcon, href: "https://github.com/pragnyx" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--e-border-strong)",
                    color: "var(--e-ink-mute)",
                  }}
                >
                  <Icon size={15} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--e-ink-faint)" }}>
                {col.heading}
              </span>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link, i) => (
                  <Link key={i} href={link.href} style={{ fontSize: 14, color: "var(--e-ink-mute)" }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--e-border)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12.5,
            color: "var(--e-ink-faint)",
          }}
        >
          <span>© {new Date().getFullYear()} PragnyX. PragnyX FinCore — all rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .e-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
