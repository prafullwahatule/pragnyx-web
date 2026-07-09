import Reveal from "../Reveal";
import { KeyRound } from "lucide-react";

const FIELDS = [
  ["License ID", "LIC-8F2A91"],
  ["Workspace ID", "acmetraders.pragnyx.in"],
  ["Tenant ID", "TEN-4C10E7"],
  ["Activation Status", "Active"],
  ["Subscription Status", "Active"],
  ["Renewal Date", "12 Aug 2026"],
  ["Module Access", "Professional + AI Suite"],
  ["AI Credits", "2,000 / month"],
  ["Storage Limit", "100 GB"],
  ["Invoice Limit", "5,000 / month"],
  ["User Limit", "25"],
  ["API Access", "Enabled"],
];

export default function LicensingPanel() {
  return (
    <section className="e-section" style={{ background: "var(--e-bg-alt)" }}>
      <div className="e-shell" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} id="e-license-grid">
        <Reveal>
          <span className="e-eyebrow">Licensing, made visible</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600 }}>
            Every company gets its own license, tenant, and workspace.
          </h2>
          <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7, color: "var(--e-ink-mute)" }}>
            No shared databases, no cross-company visibility. Your subscription status, renewal
            date, module access, and usage limits are always one click away from your admin
            dashboard — never buried in a support ticket.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="e-glass" style={{ padding: 30, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 160, height: 160, borderRadius: "50%", background: "linear-gradient(135deg, var(--e-primary), var(--e-primary-light))", opacity: 0.15 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
              <KeyRound size={18} strokeWidth={1.75} color="var(--e-primary)" />
              <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--e-ink-mute)" }}>
                Sample license
              </span>
            </div>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", position: "relative" }} className="e-license-fields">
              {FIELDS.map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 11.5, color: "var(--e-ink-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                  <div style={{ marginTop: 3, fontSize: 14, fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #e-license-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .e-license-fields { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
