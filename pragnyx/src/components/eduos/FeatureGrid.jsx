"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  UserSquare2,
  Wallet,
  MessagesSquare,
  Wand2,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "dashboards",
    label: "Dashboards & Analytics",
    icon: LayoutDashboard,
    features: [
      { title: "Executive Dashboards", desc: "Real-time KPIs, fee collection & admissions charts, with a dedicated dashboard for every role." },
      { title: "Per-role portals", desc: "Admin, Principal, HOD, Faculty, Student, Parent, Accountant, Librarian, Hostel Warden, Placement Officer — each sees only what's relevant to them." },
      { title: "Analytics Suite", desc: "Admissions trends, revenue trends, attendance trends, department-wise comparison, and placement funnel, all live." },
      { title: "Smart Data Tables", desc: "Instant search, column customization, and one-click export to Excel, CSV or PDF on every module." },
    ],
  },
  {
    id: "student360",
    label: "Student 360",
    icon: UserSquare2,
    features: [
      { title: "One timeline view", desc: "Attendance, fees, academics, documents, disciplinary and achievement records in a single profile." },
      { title: "Role-based access control", desc: "Strict, granular permissions — a faculty member sees a different slice of the profile than a parent or accountant." },
      { title: "Full academic lifecycle", desc: "Admissions & CRM, academics & timetable, attendance, exams & results, hostel, transport, library, alumni." },
      { title: "HR & Payroll, Placements", desc: "Staff records and payroll, plus a placement funnel that tracks students from drive to offer." },
    ],
  },
  {
    id: "finance",
    label: "Finance & Accounting",
    icon: Wallet,
    features: [
      { title: "Ledger accounts & vouchers", desc: "Full double-entry accounting built for institutional finance, not retrofitted from a generic template." },
      { title: "Bank reconciliation", desc: "Match transactions against statements without a spreadsheet on the side." },
      { title: "Budgets & trial balance", desc: "Department-wise budgets with a live trial balance the finance team can trust." },
    ],
  },
  {
    id: "communication",
    label: "Communication Center",
    icon: MessagesSquare,
    features: [
      { title: "Broadcast by role, any channel", desc: "SMS, WhatsApp, Email, and in-app — sent instantly to exactly the audience you pick." },
      { title: "Rule-based automation", desc: "e.g. auto-alert parents the moment a student's attendance drops below a threshold." },
      { title: "Full delivery logs", desc: "Know exactly what was sent, to whom, on which channel, and whether it was delivered." },
    ],
  },
  {
    id: "builders",
    label: "No-Code Builders",
    icon: Wand2,
    features: [
      { title: "Workflow Automation Builder", desc: "IF-trigger → action chains, built by your team without a developer." },
      { title: "Dashboard Builder", desc: "Drag-and-drop dashboards tailored to how your institution actually reports." },
      { title: "Dynamic Form Builder", desc: "New admission or feedback forms in minutes, not a dev sprint." },
      { title: "Report Builder", desc: "Custom, reusable report templates across every module." },
    ],
  },
  {
    id: "ai",
    label: "AI Copilot & Search",
    icon: GraduationCap,
    features: [
      { title: "EduOS AI Copilot", desc: "An always-available assistant for instant search and navigation across the whole system." },
      { title: "Command palette (Ctrl+K)", desc: "Global search across students, faculty, and records — built for power users." },
    ],
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: ShieldCheck,
    features: [
      { title: "Role-based access control", desc: "Granular permissions enforced at the data layer, not just hidden in the UI." },
      { title: "Full audit logging", desc: "Every sensitive action is traceable — who did what, and when." },
      { title: "Encrypted sensitive data", desc: "Aadhaar numbers, bank details, and other sensitive fields are encrypted at rest." },
    ],
  },
];

export default function FeatureGrid() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const activeCategory = CATEGORIES.find((c) => c.id === active);

  return (
    <div>
      <div className="e-tab-row" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="e-tab-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                border: `1px solid ${isActive ? "transparent" : "var(--e-border-strong)"}`,
                background: isActive ? "linear-gradient(120deg, var(--e-primary), var(--e-primary-light))" : "var(--e-surface)",
                color: isActive ? "#fff" : "var(--e-ink-mute)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={15} strokeWidth={1.75} />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="e-feature-cards">
        {activeCategory.features.map((f) => (
          <div key={f.title} className="e-card" style={{ padding: 26 }}>
            <h3 style={{ fontSize: 17, fontWeight: 600 }}>{f.title}</h3>
            <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--e-ink-mute)", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .e-feature-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
