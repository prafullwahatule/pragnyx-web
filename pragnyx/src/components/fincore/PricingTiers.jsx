"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, formatPrice } from "@/lib/fincore/plans";
import Reveal from "../Reveal";

export default function PricingTiers({ compact = false, plans = PLANS }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="e-pricing-grid">
      {plans.map((plan, i) => (
        <Reveal key={plan.id} delay={i * 80}>
          <div
            className={`e-card${plan.featured ? " e-glow-ring" : ""}`}
            style={{
              padding: 30,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              border: plan.featured ? "1.5px solid var(--e-primary)" : undefined,
              boxShadow: plan.featured ? "var(--e-shadow-lg)" : undefined,
            }}
          >
            {plan.featured && (
              <span
                style={{
                  position: "absolute",
                  top: -13,
                  left: 30,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "linear-gradient(120deg, var(--e-primary), var(--e-primary-light))",
                  padding: "4px 12px",
                  borderRadius: 999,
                }}
              >
                Most chosen
              </span>
            )}
            <h3 style={{ fontSize: 20, fontWeight: 600 }}>{plan.name}</h3>
            <p style={{ marginTop: 8, fontSize: 13.5, color: "var(--e-ink-mute)", lineHeight: 1.5, minHeight: 40 }}>{plan.tagline}</p>

            <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "var(--e-font-display)", fontSize: 32, fontWeight: 600 }}>
                {formatPrice(plan)}
              </span>
              {plan.price != null && <span style={{ fontSize: 13, color: "var(--e-ink-faint)" }}>/ month</span>}
            </div>
            <p style={{ marginTop: 4, fontSize: 12, color: "var(--e-ink-faint)" }}>
              {plan.price != null ? "Starting price · billed monthly" : "Book a demo for custom pricing"}
            </p>

            {!compact && (
              <ul style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
                {plan.modules.map((m) => (
                  <li key={m} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, lineHeight: 1.5 }}>
                    <Check size={15} strokeWidth={2.25} color="var(--e-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ color: "var(--e-ink-mute)" }}>{m}</span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={plan.selfServe ? `/fincore/signup?plan=${plan.id}` : "/fincore/signup?plan=enterprise"}
              className={`e-btn ${plan.featured ? "e-btn-primary" : "e-btn-ghost"} e-btn-block`}
              style={{ marginTop: 24 }}
            >
              {plan.selfServe ? `Start with ${plan.name}` : "Book a Demo"}
            </Link>
          </div>
        </Reveal>
      ))}

      <style>{`
        @media (max-width: 900px) {
          .e-pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
