import Reveal from "../Reveal";

const PAIRS = [
  { problem: "Admissions, fees, and academics live in separate, disconnected tools.", solution: "One system — every department reads from the same live data." },
  { problem: "Dashboards are static exports, days out of date by the time anyone reads them.", solution: "Real-time dashboards per role, updating as data changes." },
  { problem: "Every custom report or workflow tweak means calling a developer.", solution: "No-code Workflow, Dashboard, Form & Report Builders your team runs directly." },
  { problem: "Parents and staff find out about issues after it's too late to act.", solution: "Rule-based automation — e.g. auto-alert parents when attendance drops below a threshold." },
];

export default function ProblemSolution() {
  return (
    <section className="e-section" style={{ background: "var(--e-bg-alt)" }}>
      <div className="e-shell">
        <Reveal>
          <span className="e-eyebrow">Why institutions switch</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 600, maxWidth: 640 }}>
            Old ERPs were built for a different decade. EduOS wasn&apos;t.
          </h2>
        </Reveal>

        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, fontSize: 12.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--e-ink-faint)", paddingBottom: 14 }} className="e-ps-header">
            <span>The old way</span>
            <span>With EduOS</span>
          </div>
          {PAIRS.map((pair, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="e-ps-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "22px 0", borderTop: "1px solid var(--e-border)" }}>
                <p style={{ fontSize: 15, color: "var(--e-ink-faint)", lineHeight: 1.6, textDecoration: "line-through", textDecorationColor: "var(--e-border-strong)" }}>
                  {pair.problem}
                </p>
                <p style={{ fontSize: 15, color: "var(--e-ink)", lineHeight: 1.6, fontWeight: 500 }}>{pair.solution}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .e-ps-header { display: none !important; }
          .e-ps-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
