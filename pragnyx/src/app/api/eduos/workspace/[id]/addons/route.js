import { getWorkspace, updateWorkspaceAddOns } from "@/lib/repo/eduos";
import { getEffectiveAddOns } from "@/lib/eduos/effectivePlans";
import { getCustomerSession } from "@/lib/eduos/session";

// Toggles a single add-on on/off for the caller's own workspace. No
// proration/real billing engine yet (per the brief, that's a later
// project) — this persists the selection and returns its monthly cost so
// the dashboard can show it.
export async function POST(request, { params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const session = await getCustomerSession();
  if (!session || session.workspaceId !== decodedId) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { addonId, action } = body || {};
  if (!addonId || !["add", "remove"].includes(action)) {
    return Response.json({ error: "addonId and a valid action ('add' or 'remove') are required." }, { status: 400 });
  }

  const workspace = await getWorkspace(decodedId);
  if (!workspace) {
    return Response.json({ error: "Workspace not found." }, { status: 404 });
  }

  const effectiveAddOns = await getEffectiveAddOns();
  const addonMeta = effectiveAddOns.find((a) => a.id === addonId);
  if (!addonMeta) {
    return Response.json({ error: "Unknown add-on." }, { status: 400 });
  }

  const currentAddOns = workspace.addOns || [];
  const nextAddOns =
    action === "add"
      ? currentAddOns.includes(addonId) ? currentAddOns : [...currentAddOns, addonId]
      : currentAddOns.filter((a) => a !== addonId);

  const updated = await updateWorkspaceAddOns(decodedId, nextAddOns);

  return Response.json({
    ok: true,
    addOns: updated?.addOns ?? nextAddOns,
    addon: addonMeta,
  });
}
