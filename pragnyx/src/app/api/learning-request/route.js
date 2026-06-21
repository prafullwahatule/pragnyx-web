import { MENTORS, LEARNING_TRACKS } from "@/data/site";

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
  const email = (body?.email || "").trim().toLowerCase();
  const track = (body?.track || "").trim();
  const mentorId = (body?.mentorId || "").trim();
  const goal = (body?.goal || "").trim();

  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!track) errors.track = "Pick what you'd like to learn.";
  if (track && !LEARNING_TRACKS.includes(track)) {
    errors.track = "Pick a track from the list.";
  }
  if (!goal || goal.length < 10) {
    errors.goal = "Add a sentence or two on your goal (10+ characters).";
  }

  const mentor = mentorId ? MENTORS.find((m) => m.id === mentorId) : null;
  if (mentorId && !mentor) {
    errors.mentorId = "Unknown mentor selected.";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  console.log("[learning-request] new request", {
    name,
    email,
    track,
    goal,
    mentor: mentor?.name || "No preference",
    receivedAt: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    message: mentor
      ? `Request sent. We'll reach out to set up your intro call with ${mentor.name}.`
      : "Request sent. We'll match you with a mentor and follow up by email.",
  });
}
