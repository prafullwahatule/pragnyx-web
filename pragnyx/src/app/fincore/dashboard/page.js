import { redirect } from "next/navigation";
import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import DashboardShell from "@/components/fincore/DashboardShell";
import { getCustomerSession } from "@/lib/fincore/session";

export const metadata = {
  title: "Dashboard — PragnyX FinCore",
  description: "Manage your company's subscription, modules, team, and support.",
};

export default async function FinCoreDashboardPage() {
  // Middleware already blocks unauthenticated requests to this route, but
  // we re-check here too (defense in depth) and — more importantly — use
  // the session as the ONLY source for which workspace to render, instead
  // of a client-suppliable ?workspace= query param.
  const session = await getCustomerSession();
  if (!session) redirect("/fincore/login");
  if (session.mustResetPassword) redirect("/fincore/reset-password");
  if (!session.onboardingCompleted) redirect("/fincore/onboarding");

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section style={{ padding: "48px 0 90px" }}>
          <div className="e-shell">
            <DashboardShell workspaceId={session.workspaceId} />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
