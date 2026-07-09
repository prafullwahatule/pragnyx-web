import Reveal from "../Reveal";

const PAIRS = [
  { problem: "Accounting, GST, inventory, and banking live in separate, disconnected tools.", solution: "One system — every module reads from the same live ledger." },
  { problem: "Dashboards are static exports, days out of date by the time anyone reads them.", solution: "Real-time dashboards for cash flow, GST, and outstanding payments, updating as data changes." },
  { problem: "Every custom report or reconciliation means a spreadsheet on the side.", solution: "Smart Tables, Global Search, and one-click export to Excel, CSV or PDF on every module." },
  { problem: "Owners find out about cash flow problems after it's too late to act.", solution: "Automation — e.g. auto-remind customers when receivables cross a due date." },
];

export default function ProblemSolution() {
  return (
    <section className="e-section" style={{ background: "var(--e-bg-alt)" }}>
      <div className="e-shell">
        <Reveal>
          <span className="e-eyebrow">Why businesses switch</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 600, maxWidth: 640 }}>
            Old accounting software was built for a different decade. FinCore wasn&apos;t.
          </h2>
        </Reveal>

        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, fontSize: 12.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--e-ink-faint)", paddingBottom: 14 }} className="e-ps-header">
            <span>The old way</span>
            <span>With FinCore</span>
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
