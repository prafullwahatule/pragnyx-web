// Signature hero visual: a stack of overlapping role-dashboard cards.
// Encodes the product's real differentiator (one OS, a different view per
// role) instead of a generic single bar-chart mockup.
// Replace the placeholder bars with real product screenshots later —
// each card below is a natural drop-in slot (see comments).

const ROLE_CARDS = [
  { label: "Principal", metric: "94.2%", metricLabel: "Attendance today", bars: [60, 82, 74, 91, 68], accent: "primary" },
  { label: "Accountant", metric: "₹18.4L", metricLabel: "Fees collected (MTD)", bars: [40, 55, 70, 65, 88], accent: "gold" },
  { label: "Placement Officer", metric: "312", metricLabel: "Offers this season", bars: [30, 45, 62, 80, 95], accent: "primary" },
];

export default function DashboardMosaic() {
  return (
    <div className="e-mosaic" aria-hidden="true">
      {ROLE_CARDS.map((card, i) => (
        <div key={card.label} className={`e-mosaic-card e-mosaic-card-${i}`}>
          <div className="e-mosaic-head">
            <span className="e-mosaic-dot" />
            <span>{card.label} view</span>
          </div>
          <div className="e-mosaic-metric">{card.metric}</div>
          <div className="e-mosaic-metric-label">{card.metricLabel}</div>
          <div className="e-mosaic-bars">
            {card.bars.map((h, j) => (
              <span
                key={j}
                style={{
                  height: `${h}%`,
                  background:
                    card.accent === "gold"
                      ? "linear-gradient(180deg, var(--e-accent), var(--e-accent-soft))"
                      : "linear-gradient(180deg, var(--e-primary-light), var(--e-primary))",
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .e-mosaic {
          position: relative;
          width: 100%;
          height: 420px;
        }
        .e-mosaic::before {
          content: "";
          position: absolute;
          inset: 20px 10% 20px 10%;
          background: radial-gradient(closest-side, rgba(70, 64, 214, 0.22), transparent 70%);
          filter: blur(30px);
          z-index: 0;
        }
        .e-mosaic-card {
          position: absolute;
          width: 260px;
          padding: 20px;
          border-radius: var(--e-radius-md);
          background: var(--e-surface);
          border: 1px solid var(--e-border);
          box-shadow: var(--e-shadow-lg);
        }
        .e-mosaic-card-0 { top: 10px; left: 0; z-index: 3; transform: rotate(-3deg); }
        .e-mosaic-card-1 { top: 90px; left: 140px; z-index: 2; transform: rotate(2deg); }
        .e-mosaic-card-2 { top: 220px; left: 30px; z-index: 1; transform: rotate(-1.5deg); }
        .e-mosaic-head {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: var(--e-ink-mute);
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .e-mosaic-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg, var(--e-primary), var(--e-primary-light));
        }
        .e-mosaic-metric {
          margin-top: 12px; font-family: var(--e-font-display);
          font-size: 26px; font-weight: 600;
        }
        .e-mosaic-metric-label { font-size: 12.5px; color: var(--e-ink-faint); margin-top: 2px; }
        .e-mosaic-bars {
          margin-top: 16px; display: flex; align-items: flex-end; gap: 6px; height: 48px;
        }
        .e-mosaic-bars span { flex: 1; border-radius: 3px; min-height: 6px; }
        @media (max-width: 1023px) {
          .e-mosaic { height: 340px; }
          .e-mosaic-card { width: 210px; padding: 16px; }
          .e-mosaic-card-1 { left: 100px; }
        }
        @media (max-width: 480px) {
          .e-mosaic-card-2 { display: none; }
        }
      `}</style>
    </div>
  );
}
