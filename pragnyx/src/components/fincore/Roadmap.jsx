import Reveal from "../Reveal";
import { Sparkles } from "lucide-react";

const ROADMAP = [
  "AI Bookkeeping — automated categorization straight from bank feeds",
  "Bank Auto Reconciliation",
  "Voice Accounting",
  "AI Financial Forecasting",
  "OCR Invoice Scanner",
  "AI Tax Assistant",
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="e-section">
      <div className="e-shell">
        <Reveal>
          <span className="e-eyebrow">Coming soon</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600, maxWidth: 560 }}>
            On the roadmap — not yet shipped
          </h2>
          <p style={{ marginTop: 12, fontSize: 14.5, color: "var(--e-ink-mute)", maxWidth: 560 }}>
            Kept separate from the feature list above on purpose — everything under Features today is live and working.
          </p>
        </Reveal>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="e-roadmap-grid">
          {ROADMAP.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <div
                className="e-card"
                style={{ padding: 22, display: "flex", alignItems: "flex-start", gap: 14, borderStyle: "dashed" }}
              >
                <Sparkles size={17} strokeWidth={1.75} color="var(--e-accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14.5, color: "var(--e-ink-mute)", lineHeight: 1.6 }}>{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .e-roadmap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
