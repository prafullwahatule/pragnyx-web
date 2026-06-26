import { requireAdmin } from "@/lib/apiGuard";

/**
 * Builds GET/POST handlers for a /api/admin/<entity> collection route,
 * backed by a repo created with createContentRepo (getAll, create, reorder).
 */
export function createCollectionHandlers(repo) {
  async function GET() {
    const guard = await requireAdmin();
    if (guard) return guard;
    const items = await repo.getAll();
    return Response.json({ items });
  }

  async function POST(request) {
    const guard = await requireAdmin();
    if (guard) return guard;
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (body?.reorder) {
      await repo.reorder(body.reorder);
      return Response.json({ ok: true });
    }

    const created = await repo.create(body);
    return Response.json({ item: created }, { status: 201 });
  }

  return { GET, POST };
}

/**
 * Builds PATCH/DELETE handlers for a /api/admin/<entity>/[id] item route.
 */
export function createItemHandlers(repo) {
  async function PATCH(request, { params }) {
    const guard = await requireAdmin();
    if (guard) return guard;
    const { id } = await params;
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }
    const updated = await repo.update(id, body);
    if (!updated) return Response.json({ error: "Not found." }, { status: 404 });
    return Response.json({ item: updated });
  }

  async function DELETE(request, { params }) {
    const guard = await requireAdmin();
    if (guard) return guard;
    const { id } = await params;
    await repo.remove(id);
    return Response.json({ ok: true });
  }

  return { PATCH, DELETE };
}
