import { getAllCertificates, createCertificate } from "@/lib/repo/certificates";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getAllCertificates();
  return Response.json({ items });
}

export async function POST(request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body?.id || !body?.recipientName) {
    return Response.json(
      { error: "Certificate ID and recipient name are required." },
      { status: 400 }
    );
  }

  const created = await createCertificate(body);
  return Response.json({ item: created }, { status: 201 });
}
