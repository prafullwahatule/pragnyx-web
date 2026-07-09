import Reveal from "../Reveal";

const STEPS = [
  { n: "01", title: "Choose your plan", desc: "Compare Starter, Professional and Enterprise, then pick the one that fits your institution." },
  { n: "02", title: "Institution details", desc: "Name, type, contact person, student & staff counts, address — takes about two minutes." },
  { n: "03", title: "Payment", desc: "Secure checkout via Razorpay. Enterprise plans skip this step for a sales-assisted setup instead." },
  { n: "04", title: "Workspace created automatically", desc: "Your subdomain, database, and super-admin account are provisioned the moment payment clears." },
  { n: "05", title: "Credentials emailed", desc: "Institution ID, workspace URL, and a temporary admin password land in your inbox." },
  { n: "06", title: "First login & onboarding", desc: "Log in, reset your password, and a short onboarding wizard gets your modules configured." },
];

export default function PurchaseJourney() {
  return (
    <section className="e-section">
      <div className="e-shell">
        <Reveal>
          <span className="e-eyebrow">How it works</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 600, maxWidth: 620 }}>
            From landing page to logged-in admin, in one flow.
          </h2>
        </Reveal>

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="e-journey-grid">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 60}>
              <div className="e-card" style={{ padding: 26, height: "100%" }}>
                <span className="e-num-badge">{step.n}</span>
                <h3 style={{ marginTop: 12, fontSize: 16.5, fontWeight: 600 }}>{step.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14, color: "var(--e-ink-mute)", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .e-journey-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .e-journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
