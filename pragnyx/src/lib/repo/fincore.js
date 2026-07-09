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

export async function updateWorkspaceSubscriptionStatus(companyId, status) {
  if (!isDbConfigured()) {
    const existing = memWorkspaces.get(companyId);
    if (!existing) return null;
    const updated = { ...existing, subscriptionStatus: status };
    memWorkspaces.set(companyId, updated);
    return updated;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE fincore_workspaces SET subscription_status = $1 WHERE company_id = $2 RETURNING *",
    [status, companyId]
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
