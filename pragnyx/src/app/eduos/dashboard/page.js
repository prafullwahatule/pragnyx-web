import { redirect } from "next/navigation";
import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import DashboardShell from "@/components/eduos/DashboardShell";
import { getCustomerSession } from "@/lib/eduos/session";

export const metadata = {
  title: "Dashboard — PragnyX EduOS",
  description: "Manage your institution's subscription, modules, team, and support.",
};

export default async function EduOSDashboardPage() {
  // Middleware already blocks unauthenticated requests to this route, but
  // we re-check here too (defense in depth) and — more importantly — use
  // the session as the ONLY source for which workspace to render, instead
  // of a client-suppliable ?workspace= query param.
  const session = await getCustomerSession();
  if (!session) redirect("/eduos/login");
  if (session.mustResetPassword) redirect("/eduos/reset-password");
  if (!session.onboardingCompleted) redirect("/eduos/onboarding");

  return (
    <>
      <EduOSNavbar />
      <main>
        <section style={{ padding: "48px 0 90px" }}>
          <div className="e-shell">
            <DashboardShell workspaceId={session.workspaceId} />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
