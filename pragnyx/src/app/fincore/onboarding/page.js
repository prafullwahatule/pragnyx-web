import { redirect } from "next/navigation";
import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import OnboardingWizard from "@/components/fincore/OnboardingWizard";
import { getCustomerSession } from "@/lib/fincore/session";

export const metadata = {
  title: "Get set up — PragnyX FinCore",
  description: "Confirm your business details, pick your first modules, and invite your team.",
};

export default async function FinCoreOnboardingPage() {
  // Middleware already blocks unauthenticated/mustResetPassword requests
  // to this route, but we re-check here too (defense in depth) — same
  // pattern as the dashboard and reset-password pages.
  const session = await getCustomerSession();
  if (!session) redirect("/fincore/login");
  if (session.mustResetPassword) redirect("/fincore/reset-password");
  if (session.onboardingCompleted) redirect("/fincore/dashboard");

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section style={{ padding: "70px 0 100px" }}>
          <div className="e-shell">
            <OnboardingWizard workspaceId={session.workspaceId} />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
