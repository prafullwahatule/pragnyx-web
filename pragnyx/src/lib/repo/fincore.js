import { query, isDbConfigured, ensureSchema } from "../db";

// In-memory fallback so the flow stays fully wired on a fresh clone
// before DATABASE_URL is set — same convention as the rest of src/lib/repo.
const globalStore = globalThis;
if (!globalStore.__fincoreWorkspaces) globalStore.__fincoreWorkspaces = new Map();
const memWorkspaces = globalStore.__fincoreWorkspaces;

function rowToWorkspace(row) {
  return {
    companyId: row.company_id,
    workspaceUrl: row.workspace_url,
    tenantId: row.tenant_id,
    licenseId: row.license_id,
    plan: row.plan,
    planName: row.plan_name,
    modules: row.modules || [],
    addOns: row.add_ons || [],
    limits: row.limits || {},
    activationStatus: row.activation_status,
    subscriptionStatus: row.subscription_status,
    renewalDate: row.renewal_date,
    apiAccess: row.api_access,
    business: row.business || {},
    admin: row.admin_account || {},
    billing: row.billing || {},
    invoices: row.invoices || [],
    onboardingCompleted: Boolean(row.onboarding_completed),
    createdAt: row.created_at,
  };
}

export async function saveWorkspace(record) {
  if (!isDbConfigured()) {
    memWorkspaces.set(record.companyId, record);
    return record;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO fincore_workspaces
      (company_id, workspace_url, tenant_id, license_id, plan, plan_name, modules, add_ons, limits,
       activation_status, subscription_status, renewal_date, api_access, business, admin_account, billing, invoices)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     ON CONFLICT (company_id) DO UPDATE SET
       subscription_status = EXCLUDED.subscription_status,
       billing = EXCLUDED.billing,
       invoices = EXCLUDED.invoices
     RETURNING *`,
    [
      record.companyId,
      record.workspaceUrl,
      record.tenantId,
      record.licenseId,
      record.plan,
      record.planName,
      JSON.stringify(record.modules || []),
      JSON.stringify(record.addOns || []),
      JSON.stringify(record.limits || {}),
      record.activationStatus,
      record.subscriptionStatus,
      record.renewalDate,
      record.apiAccess,
      JSON.stringify(record.business || {}),
      JSON.stringify(record.admin || {}),
      JSON.stringify(record.billing || {}),
      JSON.stringify(record.invoices || []),
    ]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : record;
}

export async function getWorkspace(companyId) {
  if (!isDbConfigured()) return memWorkspaces.get(companyId) || null;
  await ensureSchema();
  const res = await query("SELECT * FROM fincore_workspaces WHERE company_id = $1", [companyId]);
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

export async function listWorkspaces() {
  if (!isDbConfigured()) return Array.from(memWorkspaces.values());
  await ensureSchema();
  const res = await query("SELECT * FROM fincore_workspaces ORDER BY created_at DESC");
  return res ? res.rows.map(rowToWorkspace) : [];
}

/**
 * Updates a workspace's subscription state. Accepts either a plain status
 * string (existing admin-panel usage: activate/suspend) or a patch object
 * for the richer webhook-driven updates: { status, renewalDate,
 * billingPatch, addInvoice }. `billingPatch` is shallow-merged into the
 * existing `billing` blob; `addInvoice` appends one invoice.
 */
export async function updateWorkspaceSubscriptionStatus(companyId, statusOrPatch) {
  const patch = typeof statusOrPatch === "string" ? { status: statusOrPatch } : statusOrPatch || {};
  const { status, renewalDate, billingPatch, addInvoice } = patch;

  const existing = await getWorkspace(companyId);
  if (!existing) return null;

  const nextBilling = billingPatch ? { ...existing.billing, ...billingPatch } : existing.billing;
  const nextInvoices = addInvoice ? [...(existing.invoices || []), addInvoice] : existing.invoices;

  if (!isDbConfigured()) {
    const updated = {
      ...existing,
      ...(status ? { subscriptionStatus: status } : {}),
      ...(renewalDate ? { renewalDate } : {}),
      billing: nextBilling,
      invoices: nextInvoices,
    };
    memWorkspaces.set(companyId, updated);
    return updated;
  }

  await ensureSchema();
  const res = await query(
    `UPDATE fincore_workspaces SET
       subscription_status = COALESCE($1, subscription_status),
       renewal_date = COALESCE($2, renewal_date),
       billing = $3,
       invoices = $4
     WHERE company_id = $5 RETURNING *`,
    [status || null, renewalDate || null, JSON.stringify(nextBilling || {}), JSON.stringify(nextInvoices || []), companyId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

/**
 * Finds the workspace whose most recent checkout order matches this
 * Razorpay order ID — the link the webhook uses to resolve which
 * workspace a payment/refund event belongs to (see
 * src/lib/fincore/provisioning.js, which stamps `billing.razorpayOrderId`).
 */
export async function getWorkspaceByOrderId(orderId) {
  if (!orderId) return null;
  if (!isDbConfigured()) {
    for (const ws of memWorkspaces.values()) {
      if (ws?.billing?.razorpayOrderId === orderId) return ws;
    }
    return null;
  }
  await ensureSchema();
  const res = await query(
    "SELECT * FROM fincore_workspaces WHERE billing->>'razorpayOrderId' = $1 LIMIT 1",
    [orderId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

/**
 * Patches the `admin` (admin_account) blob on a workspace — used by the
 * customer login/reset-password flow to set a real `passwordHash`, clear
 * the one-time `tempPassword`, and flip `mustResetPassword`. A read-modify
 * -write against the JSONB column, same convention as the rest of this
 * store — no schema migration needed since admin_account is already JSONB.
 */
export async function updateWorkspaceAdmin(companyId, adminPatch) {
  const existing = await getWorkspace(companyId);
  if (!existing) return null;
  const nextAdmin = { ...existing.admin, ...adminPatch };

  if (!isDbConfigured()) {
    const updated = { ...existing, admin: nextAdmin };
    memWorkspaces.set(companyId, updated);
    return updated;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE fincore_workspaces SET admin_account = $1 WHERE company_id = $2 RETURNING *",
    [JSON.stringify(nextAdmin), companyId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

/**
 * Patches the `business` blob — used by the post-login onboarding
 * wizard's "confirm business details" step. Same read-modify-write
 * convention as updateWorkspaceAdmin() above, against the other JSONB
 * column on this table.
 */
export async function updateWorkspaceBusiness(companyId, businessPatch) {
  const existing = await getWorkspace(companyId);
  if (!existing) return null;
  const nextBusiness = { ...existing.business, ...businessPatch };

  if (!isDbConfigured()) {
    const updated = { ...existing, business: nextBusiness };
    memWorkspaces.set(companyId, updated);
    return updated;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE fincore_workspaces SET business = $1 WHERE company_id = $2 RETURNING *",
    [JSON.stringify(nextBusiness), companyId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

/**
 * Marks the post-login onboarding wizard as done (finished OR explicitly
 * skipped — the caller decides which, this just flips the flag) so it
 * never shows again. See src/proxy.js for the redirect this gates.
 */
export async function completeOnboarding(companyId) {
  if (!isDbConfigured()) {
    const existing = memWorkspaces.get(companyId);
    if (!existing) return null;
    const updated = { ...existing, onboardingCompleted: true };
    memWorkspaces.set(companyId, updated);
    return updated;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE fincore_workspaces SET onboarding_completed = true WHERE company_id = $1 RETURNING *",
    [companyId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

export async function deleteWorkspace(companyId) {
  if (!isDbConfigured()) {
    memWorkspaces.delete(companyId);
    return true;
  }
  await ensureSchema();
  await query("DELETE FROM fincore_workspaces WHERE company_id = $1", [companyId]);
  return true;
}

// ─────────────────────── Demo / Enterprise requests ───────────────────────

const globalDemo = globalThis;
if (!globalDemo.__fincoreDemoRequests) globalDemo.__fincoreDemoRequests = [];
const memDemoRequests = globalDemo.__fincoreDemoRequests;
let memDemoIdSeq = 1;

export async function createFinCoreDemoRequest({ name, business, email, phone, businessSize, message }) {
  if (!isDbConfigured()) {
    const record = {
      id: memDemoIdSeq++,
      name,
      business,
      email,
      phone: phone || "",
      business_size: businessSize || "",
      message: message || "",
      status: "new",
      created_at: new Date().toISOString(),
    };
    memDemoRequests.unshift(record);
    console.log("[fincore-demo] new demo request (no DB configured)", { name, business, email, phone, businessSize });
    return record;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO fincore_demo_requests (name, business, email, phone, business_size, message)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, business, email, phone || "", businessSize || "", message || ""]
  );
  return res?.rows?.[0] || null;
}

export async function getFinCoreDemoRequests() {
  if (!isDbConfigured()) return memDemoRequests;
  await ensureSchema();
  const res = await query("SELECT * FROM fincore_demo_requests ORDER BY created_at DESC");
  return res ? res.rows : [];
}

export async function updateFinCoreDemoRequestStatus(id, status) {
  if (!isDbConfigured()) {
    const item = memDemoRequests.find((r) => String(r.id) === String(id));
    if (item) item.status = status;
    return item || null;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE fincore_demo_requests SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return res?.rows?.[0] || null;
}

export async function deleteFinCoreDemoRequest(id) {
  if (!isDbConfigured()) {
    const idx = memDemoRequests.findIndex((r) => String(r.id) === String(id));
    if (idx >= 0) memDemoRequests.splice(idx, 1);
    return true;
  }
  await ensureSchema();
  await query("DELETE FROM fincore_demo_requests WHERE id = $1", [id]);
  return true;
}

// ─────────────────────── Plan price overrides ───────────────────────
// Admin-editable prices for self-serve plans. Returns a plain
// { [planId]: price } map — components merge this over the defaults in
// src/lib/fincore/plans.js so a missing row just falls back silently.

const globalPrices = globalThis;
if (!globalPrices.__fincorePlanPrices) globalPrices.__fincorePlanPrices = new Map();
const memPlanPrices = globalPrices.__fincorePlanPrices;

export async function getPlanPriceOverrides() {
  if (!isDbConfigured()) {
    return Object.fromEntries(memPlanPrices);
  }
  await ensureSchema();
  const res = await query("SELECT plan_id, price FROM fincore_plan_prices");
  const map = {};
  for (const row of res?.rows || []) map[row.plan_id] = Number(row.price);
  return map;
}

export async function setPlanPrice(planId, price) {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    throw new Error("Price must be a non-negative number.");
  }
  if (!isDbConfigured()) {
    memPlanPrices.set(planId, numericPrice);
    return { planId, price: numericPrice };
  }
  await ensureSchema();
  await query(
    `INSERT INTO fincore_plan_prices (plan_id, price, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (plan_id) DO UPDATE SET price = EXCLUDED.price, updated_at = now()`,
    [planId, numericPrice]
  );
  return { planId, price: numericPrice };
}

// Admin-editable prices for add-ons — identical pattern to the plan-price
// overrides above, just against fincore_addon_prices / ADD_ONS instead.
const globalAddonPrices = globalThis;
if (!globalAddonPrices.__fincoreAddonPrices) globalAddonPrices.__fincoreAddonPrices = new Map();
const memAddonPrices = globalAddonPrices.__fincoreAddonPrices;

export async function getAddonPriceOverrides() {
  if (!isDbConfigured()) {
    return Object.fromEntries(memAddonPrices);
  }
  await ensureSchema();
  const res = await query("SELECT addon_id, price FROM fincore_addon_prices");
  const map = {};
  for (const row of res?.rows || []) map[row.addon_id] = Number(row.price);
  return map;
}

export async function setAddonPrice(addonId, price) {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    throw new Error("Price must be a non-negative number.");
  }
  if (!isDbConfigured()) {
    memAddonPrices.set(addonId, numericPrice);
    return { addonId, price: numericPrice };
  }
  await ensureSchema();
  await query(
    `INSERT INTO fincore_addon_prices (addon_id, price, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (addon_id) DO UPDATE SET price = EXCLUDED.price, updated_at = now()`,
    [addonId, numericPrice]
  );
  return { addonId, price: numericPrice };
}

/**
 * Persists a workspace's active add-on list (the "Modules" tab's "Add
 * module" action). Proration/actual billing isn't wired up yet per the
 * brief — this just makes the selection stick and visible.
 */
export async function updateWorkspaceAddOns(companyId, addOns) {
  if (!isDbConfigured()) {
    const existing = memWorkspaces.get(companyId);
    if (!existing) return null;
    const updated = { ...existing, addOns };
    memWorkspaces.set(companyId, updated);
    return updated;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE fincore_workspaces SET add_ons = $1 WHERE company_id = $2 RETURNING *",
    [JSON.stringify(addOns || []), companyId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}
