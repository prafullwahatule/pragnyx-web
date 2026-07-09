import { ADD_ONS } from "@/lib/fincore/plans";
import Reveal from "../Reveal";
import { PlusCircle } from "lucide-react";

export default function ModularAddons() {
  return (
    <div style={{ marginTop: 64 }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <span className="e-eyebrow" style={{ justifyContent: "center" }}>Modular by design</span>
          <h3 style={{ marginTop: 12, fontSize: 22, fontWeight: 600 }}>Unlock modules as you grow</h3>
          <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--e-ink-mute)", lineHeight: 1.6 }}>
            Every plan can add capability on top — pay for what your business actually needs, when it needs it.
          </p>
        </div>
      </Reveal>

      <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="e-addon-grid">
        {ADD_ONS.map((addon, i) => (
          <Reveal key={addon.id} delay={i * 50}>
            <div className="e-card" style={{ padding: "18px 18px" }}>
              <PlusCircle size={16} strokeWidth={1.75} color="var(--e-primary)" />
              <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>{addon.name}</div>
              <div style={{ marginTop: 5, fontSize: 12.5, color: "var(--e-ink-mute)", lineHeight: 1.5 }}>{addon.description}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .e-addon-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .e-addon-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
