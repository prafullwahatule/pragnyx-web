import { getWorkspace } from "@/lib/repo/eduos";
import { getCustomerSession } from "@/lib/eduos/session";

export async function GET(request, { params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  // A logged-in workspace owner can only ever fetch their OWN workspace —
  // the session's workspaceId (set at login, not client-suppliable) is the
  // source of truth, never the URL param alone. This is what stops anyone
  // who merely knows/guesses another institution's code from reading its
  // dashboard data.
  const session = await getCustomerSession();
  if (!session || session.workspaceId !== decodedId) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }

  const workspace = await getWorkspace(decodedId);
  if (!workspace) {
    return Response.json({ error: "Workspace not found." }, { status: 404 });
  }

  // Never send credential material to the client, even the owner's own
  // browser — it's already done its job (login) and has no display use.
  const { tempPassword, passwordHash, ...safeAdmin } = workspace.admin || {};
  const safeWorkspace = { ...workspace, admin: safeAdmin };

  return Response.json({ ok: true, workspace: safeWorkspace });
}
