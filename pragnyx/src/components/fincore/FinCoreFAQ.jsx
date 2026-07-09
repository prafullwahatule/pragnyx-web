"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "../Reveal";

const FAQS = [
  { q: "Is our data isolated from other businesses?", a: "Yes. Every business gets a separate cloud workspace, a separate database, and its own subdomain (e.g. acmetraders.pragnyx.in). No business can access another business's data." },
  { q: "How fast is the workspace ready after payment?", a: "Immediately. Workspace creation, database provisioning, and your admin account are generated automatically the moment payment is confirmed — no manual setup on our side." },
  { q: "Can we upgrade or add modules later?", a: "Yes. Plans and add-ons (Inventory Pro, Payroll, AI Suite, extra storage, extra AI credits) can be changed from your billing dashboard at any time." },
  { q: "Why is Enterprise demo-only, not self-serve?", a: "Multi-branch and multi-company rollouts usually need custom module work and a dedicated onboarding plan, so we scope those with your team directly before setup." },
  { q: "Is the platform secure enough for sensitive financial data?", a: "Role-based access control, full audit logging, and encryption at rest for sensitive fields like GST numbers and bank details are built into every plan." },
  { q: "Can our CA or tax consultant access our FinCore workspace?", a: "Yes. Invite them as a team member with a role scoped to accounting and GST modules — no need to share your admin login." },
];

export default function FinCoreFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="e-section">
      <div className="e-shell" style={{ maxWidth: 780 }}>
        <Reveal>
          <span className="e-eyebrow">Questions</span>
          <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600 }}>Frequently asked</h2>
        </Reveal>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="e-card" style={{ overflow: "hidden" }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--e-ink)",
                  }}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0, color: "var(--e-ink-faint)" }}
                  />
                </button>
                {isOpen && (
                  <p style={{ padding: "0 22px 20px", fontSize: 14, color: "var(--e-ink-mute)", lineHeight: 1.7 }}>{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
