import { query, isDbConfigured, ensureSchema } from "../db";
import { CERTIFICATES } from "@/data/certificates";

function rowToCertificate(row) {
  return {
    id: row.id,
    recipientName: row.recipient_name,
    course: row.course || {},
    trainer: row.trainer || {},
    durationLabel: row.duration_label,
    durationMinutes: row.duration_minutes,
    trainingType: row.training_type,
    sessionsCount: row.sessions_count,
    learnersCount: row.learners_count,
    skills: row.skills || [],
    issuedOn: row.issued_on ? formatDateOnly(row.issued_on) : null,
    completionDate: row.completion_date ? formatDateOnly(row.completion_date) : null,
    certifyingOrg: row.certifying_org,
    status: row.status,
    pdfUrl: row.pdf_url,
    imageUrl: row.image_url,
  };
}

function formatDateOnly(d) {
  // pg returns DATE columns as JS Date objects in local time; normalize to YYYY-MM-DD
  if (typeof d === "string") return d.slice(0, 10);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function getAllCertificates() {
  if (!isDbConfigured()) return CERTIFICATES;
  await ensureSchema();
  const res = await query("SELECT * FROM certificates ORDER BY created_at DESC");
  if (!res) return [];
  return res.rows.map(rowToCertificate);
}

export async function getCertificateById(id) {
  if (!id) return null;
  const normalized = String(id).trim().toUpperCase();
  if (!isDbConfigured()) {
    return CERTIFICATES.find((c) => c.id.toUpperCase() === normalized) || null;
  }
  await ensureSchema();
  const res = await query("SELECT * FROM certificates WHERE UPPER(id) = $1", [normalized]);
  if (!res || !res.rows[0]) {
    // Fall back to static seed certs too, in case DB doesn't have the sample one
    return CERTIFICATES.find((c) => c.id.toUpperCase() === normalized) || null;
  }
  return rowToCertificate(res.rows[0]);
}

export async function createCertificate(data) {
  await ensureSchema();
  const res = await query(
    `INSERT INTO certificates
      (id, recipient_name, course, trainer, duration_label, duration_minutes, training_type,
       sessions_count, learners_count, skills, issued_on, completion_date, certifying_org,
       status, pdf_url, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING *`,
    [
      data.id,
      data.recipientName,
      JSON.stringify(data.course || {}),
      JSON.stringify(data.trainer || {}),
      data.durationLabel || "",
      data.durationMinutes || 0,
      data.trainingType || "",
      data.sessionsCount || 0,
      data.learnersCount || 0,
      JSON.stringify(data.skills || []),
      data.issuedOn || null,
      data.completionDate || null,
      data.certifyingOrg || "PragnyX Learning",
      data.status || "verified",
      data.pdfUrl || "",
      data.imageUrl || "",
    ]
  );
  return rowToCertificate(res.rows[0]);
}

export async function updateCertificate(id, data) {
  await ensureSchema();
  const res = await query(
    `UPDATE certificates SET
       recipient_name=$1, course=$2, trainer=$3, duration_label=$4, duration_minutes=$5,
       training_type=$6, sessions_count=$7, learners_count=$8, skills=$9, issued_on=$10,
       completion_date=$11, certifying_org=$12, status=$13, pdf_url=$14, image_url=$15
     WHERE id=$16 RETURNING *`,
    [
      data.recipientName,
      JSON.stringify(data.course || {}),
      JSON.stringify(data.trainer || {}),
      data.durationLabel || "",
      data.durationMinutes || 0,
      data.trainingType || "",
      data.sessionsCount || 0,
      data.learnersCount || 0,
      JSON.stringify(data.skills || []),
      data.issuedOn || null,
      data.completionDate || null,
      data.certifyingOrg || "PragnyX Learning",
      data.status || "verified",
      data.pdfUrl || "",
      data.imageUrl || "",
      id,
    ]
  );
  return res.rows[0] ? rowToCertificate(res.rows[0]) : null;
}

export async function deleteCertificate(id) {
  await ensureSchema();
  await query("DELETE FROM certificates WHERE id = $1", [id]);
  return true;
}
