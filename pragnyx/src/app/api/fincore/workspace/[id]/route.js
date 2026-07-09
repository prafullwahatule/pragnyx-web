import { getWorkspace } from "@/lib/repo/fincore";

export async function GET(request, { params }) {
  const { id } = await params;
  const workspace = await getWorkspace(decodeURIComponent(id));
  if (!workspace) {
    return Response.json({ error: "Workspace not found." }, { status: 404 });
  }
  return Response.json({ ok: true, workspace });
}
