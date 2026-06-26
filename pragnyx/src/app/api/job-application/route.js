import { jobsRepo } from "@/lib/repo/jobs";
import { createJobApplication } from "@/lib/repo/submissions";

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

  const jobId = (body?.jobId || "").trim();
  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim().toLowerCase();
  const note = (body?.note || "").trim();

  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  const jobs = await jobsRepo.getPublic();
  const job = jobs.find((j) => j.id === jobId);

  await createJobApplication({
    jobId: job?.id || jobId || null,
    jobTitle: job?.title || body?.jobTitle || "",
    name,
    email,
    note,
  });

  return Response.json({
    ok: true,
    message: "Application sent. We'll be in touch.",
  });
}
