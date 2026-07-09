import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DashboardMosaic from "./DashboardMosaic";

export default function Hero() {
  return (
    <section className="e-dot-grid e-mesh-bg" style={{ paddingTop: 64, paddingBottom: 80, overflow: "hidden" }}>
      <div className="e-shell" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} id="e-hero-grid">
        <div>
          <span
            className="e-glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px 7px 14px",
              borderRadius: 999,
            }}
          >
            <span className="e-eyebrow" style={{ margin: 0 }}>Enterprise Education ERP + AI Operating System</span>
          </span>
          <h1 style={{ marginTop: 20, fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.08 }}>
            The AI Operating System for <span className="e-gradient-text">Modern Educational Institutions</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.6, color: "var(--e-ink-mute)", maxWidth: 520 }}>
            One intelligent platform to manage admissions, academics, finance, communication, HR,
            and placements — from admissions to alumni, in a single system.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/eduos/signup" className="e-btn e-btn-primary">
              Book a Demo <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/eduos/pricing" className="e-btn e-btn-ghost">
              See Pricing
            </Link>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              ["10+", "Role-based portals"],
              ["99.9%", "Uptime target"],
              ["24/7", "AI Copilot access"],
            ].map(([value, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--e-font-display)", fontSize: 24, fontWeight: 600 }}>{value}</div>
                <div style={{ fontSize: 12.5, color: "var(--e-ink-faint)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <DashboardMosaic />
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #e-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
