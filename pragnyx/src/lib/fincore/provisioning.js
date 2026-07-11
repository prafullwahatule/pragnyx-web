import crypto from "crypto";
import { getEffectivePlan } from "./effectivePlans";
import { saveWorkspace, getWorkspace } from "@/lib/repo/fincore";
import { sendWelcomeEmail, sendReceiptEmail } from "./emails";

function slugify(name) {
  return (name || "business")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30) || "business";
}

function randomId(prefix, bytes = 4) {
  return `${prefix}-${crypto.randomBytes(bytes).toString("hex").toUpperCase()}`;
}

function generateTempPassword() {
  // 12-char password: mixed case + digits, no ambiguous chars.
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let out = "";
  const bytes = crypto.randomBytes(12);
  for (let i = 0; i < 12; i++) out += chars[bytes[i] % chars.length];
  return out;
}

/**
 * Given a unique base slug and the set of already-taken slugs, find the
 * first available subdomain (company.pragnyx.in). In production this
 * check would run against the real workspaces table.
 */
async function resolveSubdomain(baseSlug, isTaken) {
  let slug = baseSlug;
  let n = 1;
  while (await isTaken(slug)) {
    n += 1;
    slug = `${baseSlug}-${n}`;
  }
  return slug;
}

/**
 * Creates a full workspace record for a newly-paid company: license,
 * tenant, subdomain, and an admin account with a temporary password.
 * Persists it via the store module (swap-in point for a real DB) and
 * returns the record — the caller is responsible for emailing credentials
 * (see /api/fincore/checkout/verify).
 */
export async function provisionWorkspace({ business, plan: planId, addOns = [], paymentId, orderId }) {
  const plan = await getEffectivePlan(planId);
  if (!plan) throw new Error(`Unknown plan: ${planId}`);

  const baseSlug = slugify(business.name);
  const subdomain = await resolveSubdomain(baseSlug, async (slug) => {
    const existing = await getWorkspace(`${slug}.pragnyx.in`);
    return Boolean(existing);
  });

  const companyId = `${subdomain}.pragnyx.in`;
  const now = new Date();
  const renewalDate = new Date(now);
  renewalDate.setMonth(renewalDate.getMonth() + 1);

  const record = {
    companyId,
    workspaceUrl: `https://${companyId}`,
    tenantId: randomId("TEN"),
    licenseId: randomId("LIC"),
    plan: plan.id,
    planName: plan.name,
    modules: plan.modules,
    addOns,
    limits: plan.limits,
    activationStatus: "active",
    subscriptionStatus: "active",
    createdAt: now.toISOString(),
    renewalDate: renewalDate.toISOString(),
    apiAccess: plan.id !== "starter",
    business: {
      name: business.name,
      type: business.type,
      gstNumber: business.gstNumber,
      pan: business.pan,
      email: business.email,
      phone: business.phone,
      address: business.address,
      industry: business.industry,
      employees: business.employees,
    },
    admin: {
      email: business.email,
      tempPassword: generateTempPassword(),
      mustResetPassword: true,
    },
    billing: {
      lastPaymentId: paymentId || null,
      razorpayOrderId: orderId || null,
      amount: plan.price,
      currency: plan.currency,
      period: plan.billingPeriod,
    },
    invoices: paymentId
      ? [
          {
            id: randomId("INV", 3),
            date: now.toISOString(),
            amount: plan.price,
            currency: plan.currency,
            status: "paid",
            paymentId,
          },
        ]
      : [],
  };

  await saveWorkspace(record);

  // Real transactional emails via Resend — wrapped so a flaky email
  // provider can never block or fail workspace creation. sendEmail()
  // itself never throws, but we still belt-and-suspenders it here since
  // this is a critical path.
  try {
    await sendWelcomeEmail(record);
    if (record.invoices[0]) {
      await sendReceiptEmail({ workspace: record, invoice: record.invoices[0] });
    }
  } catch (err) {
    console.error("[fincore] provisioning email failed", err);
  }

  console.log("[fincore] workspace provisioned", {
    companyId: record.companyId,
    tenantId: record.tenantId,
    licenseId: record.licenseId,
    plan: record.plan,
    adminEmail: record.admin.email,
  });

  return record;
}
