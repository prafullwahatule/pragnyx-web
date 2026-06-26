import { query, isDbConfigured, ensureSchema } from "../db";

// ─────────────────────── Contact submissions ───────────────────────

export async function createContactSubmission({ name, email, message, source = "contact" }) {
  if (!isDbConfigured()) {
    console.log("[contact] new message (no DB configured)", { name, email, message });
    return null;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO contact_submissions (name, email, message, source) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, email, message, source]
  );
  return res.rows[0];
}

export async function getContactSubmissions() {
  if (!isDbConfigured()) return [];
  await ensureSchema();
  const res = await query("SELECT * FROM contact_submissions ORDER BY created_at DESC");
  return res ? res.rows : [];
}

export async function updateContactSubmissionStatus(id, status) {
  await ensureSchema();
  const res = await query(
    "UPDATE contact_submissions SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return res.rows[0] || null;
}

export async function deleteContactSubmission(id) {
  await ensureSchema();
  await query("DELETE FROM contact_submissions WHERE id = $1", [id]);
  return true;
}

// ─────────────────────── Newsletter subscribers ───────────────────────

export async function addNewsletterSubscriber(email) {
  if (!isDbConfigured()) {
    return { ok: true, count: null };
  }
  await ensureSchema();
  const existing = await query("SELECT id FROM newsletter_subscribers WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    const countRes = await query("SELECT COUNT(*) FROM newsletter_subscribers");
    return { alreadySubscribed: true, count: Number(countRes.rows[0].count) };
  }
  await query("INSERT INTO newsletter_subscribers (email) VALUES ($1)", [email]);
  const countRes = await query("SELECT COUNT(*) FROM newsletter_subscribers");
  return { alreadySubscribed: false, count: Number(countRes.rows[0].count) };
}

export async function getNewsletterSubscribers() {
  if (!isDbConfigured()) return [];
  await ensureSchema();
  const res = await query("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC");
  return res ? res.rows : [];
}

export async function deleteNewsletterSubscriber(id) {
  await ensureSchema();
  await query("DELETE FROM newsletter_subscribers WHERE id = $1", [id]);
  return true;
}

// ─────────────────────── Learning requests ───────────────────────

export async function createLearningRequest({ name, email, track, goal, mentorId }) {
  if (!isDbConfigured()) {
    console.log("[learning-request] new request (no DB configured)", { name, email, track, goal, mentorId });
    return null;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO learning_requests (name, email, track, goal, mentor_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, track, goal, mentorId || null]
  );
  return res.rows[0];
}

export async function getLearningRequests() {
  if (!isDbConfigured()) return [];
  await ensureSchema();
  const res = await query("SELECT * FROM learning_requests ORDER BY created_at DESC");
  return res ? res.rows : [];
}

export async function updateLearningRequestStatus(id, status) {
  await ensureSchema();
  const res = await query(
    "UPDATE learning_requests SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return res.rows[0] || null;
}

export async function deleteLearningRequest(id) {
  await ensureSchema();
  await query("DELETE FROM learning_requests WHERE id = $1", [id]);
  return true;
}

// ─────────────────────── Job applications ───────────────────────

export async function createJobApplication({ jobId, jobTitle, name, email, note }) {
  if (!isDbConfigured()) {
    console.log("[job-application] new application (no DB configured)", { jobId, jobTitle, name, email });
    return null;
  }
  await ensureSchema();
  const res = await query(
    `INSERT INTO job_applications (job_id, job_title, name, email, note) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [jobId || null, jobTitle || "", name, email, note || ""]
  );
  return res.rows[0];
}

export async function getJobApplications() {
  if (!isDbConfigured()) return [];
  await ensureSchema();
  const res = await query("SELECT * FROM job_applications ORDER BY created_at DESC");
  return res ? res.rows : [];
}

export async function updateJobApplicationStatus(id, status) {
  await ensureSchema();
  const res = await query(
    "UPDATE job_applications SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return res.rows[0] || null;
}

export async function deleteJobApplication(id) {
  await ensureSchema();
  await query("DELETE FROM job_applications WHERE id = $1", [id]);
  return true;
}
