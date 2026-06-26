import { getAllProducts, createProduct } from "@/lib/repo/products";
import { requireAdmin } from "@/lib/apiGuard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const items = await getAllProducts();
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
  const created = await createProduct(body);
  return Response.json({ item: created }, { status: 201 });
}
