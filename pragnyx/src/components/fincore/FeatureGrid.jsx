"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BookText,
  ReceiptText,
  Boxes,
  Landmark,
  Wand2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "dashboards",
    label: "Dashboards & Analytics",
    icon: LayoutDashboard,
    features: [
      { title: "Executive Dashboard", desc: "Live cash flow, revenue, expenses, profit, GST summary, bank balance and outstanding payments/receivables, in one view." },
      { title: "Business Intelligence", desc: "Financial KPIs, revenue and expense trends, profit analysis, and cash flow forecasting, all live." },
      { title: "Inventory Analysis", desc: "Stock movement, reorder trends, and warehouse-level performance without a spreadsheet on the side." },
      { title: "Smart Data Tables", desc: "Instant search, column customization, and one-click export to Excel, CSV or PDF on every module." },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: BookText,
    features: [
      { title: "Journal & Ledger", desc: "Full double-entry accounting built for real business finance, not retrofitted from a generic template." },
      { title: "Trial Balance & Day Book", desc: "A live trial balance and day book your finance team can trust, without manual reconciliation." },
      { title: "Balance Sheet & P&L", desc: "Balance sheet, profit & loss, and cash flow statements generated directly from your ledger." },
      { title: "Voucher Entry", desc: "Fast, structured voucher entry across payment, receipt, journal and contra types." },
    ],
  },
  {
    id: "gst",
    label: "GST & Compliance",
    icon: ReceiptText,
    features: [
      { title: "GST Sales & Purchase", desc: "GST-ready sales and purchase registers, built to match return filing formats." },
      { title: "Returns & Input Tax Credit", desc: "Track GST returns and input tax credit without leaving the platform." },
      { title: "TDS & Audit Reports", desc: "TDS tracking and audit-ready reports across every module." },
      { title: "GST Reports", desc: "Summary and detailed GST reports, exportable for your CA or tax consultant." },
    ],
  },
  {
    id: "operations",
    label: "Inventory, Sales & Purchase",
    icon: Boxes,
    features: [
      { title: "Items & Warehouses", desc: "Multi-warehouse inventory with stock movement tracked in real time." },
      { title: "Batch & Serial Tracking", desc: "Full traceability for regulated or serialized inventory, plus reorder alerts." },
      { title: "Quotations, Orders & Invoices", desc: "Sales quotations, sales orders, invoices and credit notes in one flow." },
      { title: "Purchase & Vendors", desc: "Purchase orders, bills, vendor records and debit notes, matched to inventory automatically." },
    ],
  },
  {
    id: "banking",
    label: "Banking, Payroll & HR",
    icon: Landmark,
    features: [
      { title: "Bank Accounts & Reconciliation", desc: "Match transactions against statements without a spreadsheet on the side." },
      { title: "Payments & Receipts", desc: "Track every payment and receipt against the right ledger account automatically." },
      { title: "Payroll", desc: "Employee records, salary runs, and attendance integration for accurate payroll." },
      { title: "Compliance", desc: "TDS, GST and audit reports kept current as payroll and banking data changes." },
    ],
  },
  {
    id: "builders",
    label: "Automation",
    icon: Wand2,
    features: [
      { title: "Recurring Invoices", desc: "Set once, bill automatically — recurring invoices with no manual re-entry." },
      { title: "Payment Reminders", desc: "Automated reminders to customers as receivables approach their due date." },
      { title: "Approval Workflow", desc: "Role-based approval chains for vouchers, purchases and payments." },
      { title: "Role Based Access", desc: "Granular permissions so every user sees exactly what their role requires." },
    ],
  },
  {
    id: "ai",
    label: "AI Copilot & Search",
    icon: Sparkles,
    features: [
      { title: "FinCore AI Copilot", desc: "Natural-language accounting assistance — ask a question, get a grounded answer from your own ledger." },
      { title: "Global Search & Command Palette", desc: "Instant search across invoices, ledgers, and vendors — built for power users." },
    ],
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: ShieldCheck,
    features: [
      { title: "Role-based access control", desc: "Granular permissions enforced at the data layer, not just hidden in the UI." },
      { title: "Full audit logging", desc: "Every sensitive action is traceable — who did what, and when." },
      { title: "Encrypted sensitive data", desc: "Bank details, GST numbers, and other sensitive fields are encrypted at rest." },
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
