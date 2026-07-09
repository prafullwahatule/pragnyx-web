import { query, isDbConfigured, ensureSchema } from "../db";

// In-memory fallback so the flow stays fully wired on a fresh clone
// before DATABASE_URL is set — same convention as the rest of src/lib/repo.
const globalStore = globalThis;
if (!globalStore.__eduosWorkspaces) globalStore.__eduosWorkspaces = new Map();
const memWorkspaces = globalStore.__eduosWorkspaces;

function rowToWorkspace(row) {
  return {
    institutionId: row.institution_id,
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
    institution: row.institution || {},
    admin: row.admin_account || {},
    billing: row.billing || {},
    invoices: row.invoices || [],
    createdAt: row.created_at,
  };
}

export async function saveWorkspace(record) {
  if (!isDbConfigured()) {
    memWorkspaces.set(record.institutionId, record);
    return record;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO eduos_workspaces
      (institution_id, workspace_url, tenant_id, license_id, plan, plan_name, modules, add_ons, limits,
       activation_status, subscription_status, renewal_date, api_access, institution, admin_account, billing, invoices)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     ON CONFLICT (institution_id) DO UPDATE SET
       subscription_status = EXCLUDED.subscription_status,
       billing = EXCLUDED.billing,
       invoices = EXCLUDED.invoices
     RETURNING *`,
    [
      record.institutionId,
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
      JSON.stringify(record.institution || {}),
      JSON.stringify(record.admin || {}),
      JSON.stringify(record.billing || {}),
      JSON.stringify(record.invoices || []),
    ]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : record;
}

export async function getWorkspace(institutionId) {
  if (!isDbConfigured()) return memWorkspaces.get(institutionId) || null;
  await ensureSchema();
  const res = await query("SELECT * FROM eduos_workspaces WHERE institution_id = $1", [institutionId]);
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

export async function listWorkspaces() {
  if (!isDbConfigured()) return Array.from(memWorkspaces.values());
  await ensureSchema();
  const res = await query("SELECT * FROM eduos_workspaces ORDER BY created_at DESC");
  return res ? res.rows.map(rowToWorkspace) : [];
}

export async function updateWorkspaceSubscriptionStatus(institutionId, status) {
  if (!isDbConfigured()) {
    const existing = memWorkspaces.get(institutionId);
    if (!existing) return null;
    const updated = { ...existing, subscriptionStatus: status };
    memWorkspaces.set(institutionId, updated);
    return updated;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE eduos_workspaces SET subscription_status = $1 WHERE institution_id = $2 RETURNING *",
    [status, institutionId]
  );
  return res?.rows?.[0] ? rowToWorkspace(res.rows[0]) : null;
}

export async function deleteWorkspace(institutionId) {
  if (!isDbConfigured()) {
    memWorkspaces.delete(institutionId);
    return true;
  }
  await ensureSchema();
  await query("DELETE FROM eduos_workspaces WHERE institution_id = $1", [institutionId]);
  return true;
}

// ─────────────────────── Demo / Enterprise requests ───────────────────────

const globalDemo = globalThis;
if (!globalDemo.__eduosDemoRequests) globalDemo.__eduosDemoRequests = [];
const memDemoRequests = globalDemo.__eduosDemoRequests;
let memDemoIdSeq = 1;

export async function createEduOSDemoRequest({ name, institution, email, phone, institutionSize, message }) {
  if (!isDbConfigured()) {
    const record = {
      id: memDemoIdSeq++,
      name,
      institution,
      email,
      phone: phone || "",
      institution_size: institutionSize || "",
      message: message || "",
      status: "new",
      created_at: new Date().toISOString(),
    };
    memDemoRequests.unshift(record);
    console.log("[eduos-demo] new demo request (no DB configured)", { name, institution, email, phone, institutionSize });
    return record;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO eduos_demo_requests (name, institution, email, phone, institution_size, message)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, institution, email, phone || "", institutionSize || "", message || ""]
  );
  return res?.rows?.[0] || null;
}

export async function getEduOSDemoRequests() {
  if (!isDbConfigured()) return memDemoRequests;
  await ensureSchema();
  const res = await query("SELECT * FROM eduos_demo_requests ORDER BY created_at DESC");
  return res ? res.rows : [];
}

export async function updateEduOSDemoRequestStatus(id, status) {
  if (!isDbConfigured()) {
    const item = memDemoRequests.find((r) => String(r.id) === String(id));
    if (item) item.status = status;
    return item || null;
  }
  await ensureSchema();
  const res = await query(
    "UPDATE eduos_demo_requests SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return res?.rows?.[0] || null;
}

export async function deleteEduOSDemoRequest(id) {
  if (!isDbConfigured()) {
    const idx = memDemoRequests.findIndex((r) => String(r.id) === String(id));
    if (idx >= 0) memDemoRequests.splice(idx, 1);
    return true;
  }
  await ensureSchema();
  await query("DELETE FROM eduos_demo_requests WHERE id = $1", [id]);
  return true;
}
