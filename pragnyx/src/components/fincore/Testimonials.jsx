import Reveal from "../Reveal";
import { ShieldCheck, Lock, Server, MapPin } from "lucide-react";

const TESTIMONIALS = [
  { quote: "Placeholder — real testimonial to be added after pilot businesses go live.", name: "Business Name", role: "Founder" },
  { quote: "Placeholder — real testimonial to be added after pilot businesses go live.", name: "Business Name", role: "Finance Head" },
  { quote: "Placeholder — real testimonial to be added after pilot businesses go live.", name: "Business Name", role: "Chartered Accountant" },
];

const BADGES = [
  { icon: MapPin, label: "Made in India" },
  { icon: Server, label: "Secure Cloud" },
  { icon: ShieldCheck, label: "Enterprise Security" },
  { icon: Lock, label: "Encrypted at Rest" },
];

export default function Testimonials() {
  return (
    <section className="e-section" style={{ background: "var(--e-bg-alt)" }}>
      <div className="e-shell">
        <Reveal>
          <span className="e-eyebrow">Trusted by businesses</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600 }}>What early partners are saying</h2>
        </Reveal>

        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="e-testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="e-card" style={{ padding: 26, height: "100%" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--e-ink-mute)", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ marginTop: 18, fontSize: 13.5, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--e-ink-faint)" }}>{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid var(--e-border-strong)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--e-ink-mute)",
              }}
            >
              <Icon size={15} strokeWidth={1.75} color="var(--e-primary)" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .e-testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
