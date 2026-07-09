"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/eduos#features", label: "Features" },
  { href: "/eduos/pricing", label: "Pricing" },
  { href: "/eduos#roadmap", label: "Roadmap" },
];

export default function EduOSNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled || open ? "var(--e-surface-glass)" : "transparent",
        backdropFilter: scrolled || open ? "blur(16px)" : "none",
        borderBottom: scrolled || open ? "1px solid var(--e-border)" : "1px solid transparent",
        transition: "all 0.25s ease",
      }}
    >
      <nav className="e-shell" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/eduos" style={{ display: "flex", alignItems: "center", gap: 9 }} onClick={() => setOpen(false)}>
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(135deg, var(--e-primary), var(--e-primary-light))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "var(--e-font-display)",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            X
          </span>
          <span style={{ fontFamily: "var(--e-font-display)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em" }}>
            EduOS
          </span>
        </Link>

        <div className="e-nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: 14, fontWeight: 500, color: "var(--e-ink-mute)" }}
              className="e-nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeToggle />
          <Link href="/eduos/login" className="e-btn e-btn-ghost e-btn-sm e-hide-mobile">
            Log in
          </Link>
          <Link href="/eduos/pricing" className="e-btn e-btn-primary e-btn-sm e-hide-mobile">
            Get Started
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="e-show-mobile"
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{ background: "none", border: "none", padding: 6, color: "var(--e-ink)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ borderTop: "1px solid var(--e-border)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ fontSize: 14, fontWeight: 500 }}>
              {link.label}
            </Link>
          ))}
          <Link href="/eduos/login" onClick={() => setOpen(false)} className="e-btn e-btn-ghost e-btn-block">
            Log in
          </Link>
          <Link href="/eduos/pricing" onClick={() => setOpen(false)} className="e-btn e-btn-primary e-btn-block">
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        .e-nav-link:hover { color: var(--e-primary) !important; }
        .e-show-mobile { display: none; }
        @media (max-width: 860px) {
          .e-nav-links { display: none !important; }
          .e-hide-mobile { display: none !important; }
          .e-show-mobile { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
