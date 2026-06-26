import { getAdminSession } from "./session";

/**
 * Use at the top of every /api/admin/* route handler:
 *
 *   const guard = await requireAdmin();
 *   if (guard) return guard;
 *
 * Returns a 401 Response if not authenticated, or null if the request
 * should proceed.
 */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }
  return null;
}
