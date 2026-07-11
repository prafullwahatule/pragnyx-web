// Plan catalogue for PragnyX EduOS.
//
// NOTE ON PRICING: the product brief intentionally avoids hardcoded prices
// on the marketing site ("Book a demo for pricing"). But a real self-serve
// checkout needs an actual amount to charge. The amounts below are clearly
// marked placeholders so the flow is fully wired end-to-end — swap them for
// real numbers before going live. Enterprise stays sales-assisted (demo
// booking, no self-serve checkout), matching the brief's own carve-out.

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Single-campus institutions getting off spreadsheets.",
    price: 4999,
    currency: "INR",
    billingPeriod: "month",
    selfServe: true,
    limits: {
      students: 500,
      staff: 50,
      storageGB: 25,
      aiCredits: 500,
    },
    modules: [
      "Executive Dashboards",
      "Student 360 Profile",
      "Attendance & Academics",
      "Fee Collection",
      "Communication Center (Email + In-App)",
      "Smart Data Tables & Exports",
    ],
    addOnEligible: ["Workflow Builder", "Advanced Analytics", "Extra Storage"],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Growing institutions running finance, HR & placements in one place.",
    price: 12999,
    currency: "INR",
    billingPeriod: "month",
    selfServe: true,
    featured: true,
    limits: {
      students: 3000,
      staff: 300,
      storageGB: 150,
      aiCredits: 3000,
    },
    modules: [
      "Everything in Starter",
      "Finance & Accounting (ledgers, vouchers, reconciliation)",
      "Communication Center (SMS + WhatsApp + Email + rules engine)",
      "No-Code Workflow, Dashboard & Form Builders",
      "Analytics Suite (admissions, revenue, attendance, placement funnel)",
      "HR & Payroll, Hostel, Transport, Library",
    ],
    addOnEligible: ["Report Builder", "AI Suite", "API Access", "Extra AI Credits"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Multi-campus universities and large institution groups.",
    price: null,
    currency: "INR",
    billingPeriod: "custom",
    selfServe: false,
    limits: {
      students: "Unlimited",
      staff: "Unlimited",
      storageGB: "Custom",
      aiCredits: "Custom",
    },
    modules: [
      "Everything in Professional",
      "Multi-campus / multi-tenant management",
      "EduOS AI Copilot",
      "Dedicated onboarding & SLA-backed support",
      "Custom module & integration development",
      "API access with elevated rate limits",
    ],
    addOnEligible: [],
  },
];

// NOTE ON PRICING: same placeholder convention as PLANS above — these are
// default monthly INR prices, overridable per-add-on from the admin panel
// (Admin → EduOS → Pricing) via eduos_addon_prices. Swap for real numbers
// before going live.
export const ADD_ONS = [
  { id: "workflow-builder", name: "Workflow Automation Builder", description: "IF-trigger → action chains for any module.", price: 999 },
  { id: "advanced-analytics", name: "Advanced Analytics", description: "Department-wise comparisons & trend forecasting.", price: 1499 },
  { id: "report-builder", name: "Report Builder", description: "Custom report templates, scheduled exports.", price: 999 },
  { id: "ai-suite", name: "AI Suite", description: "EduOS AI Copilot + natural-language search across records.", price: 1999 },
  { id: "extra-storage", name: "Extra Storage", description: "+100GB document & records storage.", price: 499 },
  { id: "extra-ai-credits", name: "Extra AI Credits", description: "+2,000 AI Copilot credits / month.", price: 799 },
  { id: "api-access", name: "API Access", description: "REST API keys for integrating third-party systems.", price: 1299 },
];

export function getPlan(planId) {
  return PLANS.find((p) => p.id === planId) || null;
}

export function formatPrice(plan) {
  if (plan.price == null) return "Custom";
  return `₹${plan.price.toLocaleString("en-IN")}`;
}
