// Plan catalogue for PragnyX FinCore.
//
// NOTE ON PRICING: the product brief intentionally avoids hardcoded prices
// on the marketing site ("Contact Sales" / "Book a Demo"). But a real
// self-serve checkout needs an actual amount to charge. The amounts below
// are clearly marked placeholders so the flow is fully wired end-to-end —
// swap them for real numbers before going live. Enterprise stays
// sales-assisted (demo booking, no self-serve checkout), matching the
// brief's own carve-out.

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Single-branch SMEs and startups getting off spreadsheets.",
    price: 2999,
    currency: "INR",
    billingPeriod: "month",
    selfServe: true,
    limits: {
      companies: 1,
      users: 3,
      invoices: 500,
      storageGB: 10,
      aiCredits: 300,
    },
    modules: [
      "Executive Dashboard (cash flow, revenue, GST summary)",
      "Accounting (journal, ledger, trial balance, day book)",
      "GST Sales, Purchase & Returns",
      "Sales & Purchase (invoices, quotations, orders)",
      "Banking (accounts, payments, receipts)",
      "Smart Data Tables & Exports (Excel, CSV, PDF)",
    ],
    addOnEligible: ["Inventory Pro", "Advanced Analytics", "Extra Storage"],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Growing businesses running inventory, banking & compliance together.",
    price: 7999,
    currency: "INR",
    billingPeriod: "month",
    selfServe: true,
    featured: true,
    limits: {
      companies: 3,
      users: 25,
      invoices: 5000,
      storageGB: 100,
      aiCredits: 2000,
    },
    modules: [
      "Everything in Starter",
      "Inventory (items, warehouses, stock movement, reorder alerts)",
      "Bank Reconciliation",
      "TDS, GST & Audit Compliance Reports",
      "Business Intelligence & Analytics (KPIs, trends, forecasts)",
      "AI Copilot, Global Search & Command Palette",
      "Automation (recurring invoices, payment reminders, approval workflow)",
    ],
    addOnEligible: ["Payroll", "AI Suite", "Multi Branch", "API Access", "Extra AI Credits"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Multi-branch manufacturers, wholesalers and enterprise groups.",
    price: null,
    currency: "INR",
    billingPeriod: "custom",
    selfServe: false,
    limits: {
      companies: "Unlimited",
      users: "Unlimited",
      invoices: "Unlimited",
      storageGB: "Custom",
      aiCredits: "Custom",
    },
    modules: [
      "Everything in Professional",
      "Multi-branch / multi-company consolidation",
      "Payroll (employees, salary, attendance integration)",
      "Batch & serial tracking, advanced inventory analysis",
      "Role-based access, audit logs & field-level encryption",
      "Dedicated onboarding & SLA-backed support",
      "API access with elevated rate limits",
    ],
    addOnEligible: [],
  },
];

export const ADD_ONS = [
  { id: "inventory-pro", name: "Inventory Pro", description: "Batch tracking, serial tracking & warehouse-level reorder alerts." },
  { id: "advanced-analytics", name: "Advanced Analytics", description: "Cash flow forecasting & revenue/expense trend modelling." },
  { id: "payroll", name: "Payroll", description: "Employee records, salary runs & attendance integration." },
  { id: "ai-suite", name: "AI Suite", description: "FinCore AI Copilot for natural-language accounting queries." },
  { id: "multi-branch", name: "Multi Branch", description: "Consolidated reporting across branches and companies." },
  { id: "extra-storage", name: "Extra Storage", description: "+100GB document & ledger storage." },
  { id: "extra-ai-credits", name: "Extra AI Credits", description: "+2,000 AI Copilot credits / month." },
  { id: "api-access", name: "API Access", description: "REST API keys for integrating third-party systems." },
];

export function getPlan(planId) {
  return PLANS.find((p) => p.id === planId) || null;
}

export function formatPrice(plan) {
  if (plan.price == null) return "Custom";
  return `₹${plan.price.toLocaleString("en-IN")}`;
}
