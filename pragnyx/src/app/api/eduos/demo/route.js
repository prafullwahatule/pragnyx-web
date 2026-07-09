import { createEduOSDemoRequest } from "@/lib/repo/eduos";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body?.name || "").trim();
  const institution = (body?.institution || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const phone = (body?.phone || "").trim();
  const institutionSize = (body?.institutionSize || "").trim();
  const message = (body?.message || "").trim();

  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!institution) errors.institution = "Institution name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone) errors.phone = "Phone number is required.";
  if (!institutionSize) errors.institutionSize = "Select an institution size.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  // Persists to the database (same pattern as /api/contact and
  // /api/learning-request) when DATABASE_URL is configured; otherwise
  // falls back to a server log so the flow still works end-to-end.
  await createEduOSDemoRequest({ name, institution, email, phone, institutionSize, message });

  return Response.json({
    ok: true,
    message: "Demo request received — our team will reach out within one business day.",
  });
}
