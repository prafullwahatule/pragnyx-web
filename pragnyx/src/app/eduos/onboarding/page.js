import { redirect } from "next/navigation";
import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import OnboardingWizard from "@/components/eduos/OnboardingWizard";
import { getCustomerSession } from "@/lib/eduos/session";

export const metadata = {
  title: "Get set up — PragnyX EduOS",
  description: "Confirm your institution details, pick your first modules, and invite your team.",
};

export default async function EduOSOnboardingPage() {
  // Middleware already blocks unauthenticated/mustResetPassword requests
  // to this route, but we re-check here too (defense in depth) — same
  // pattern as the dashboard and reset-password pages.
  const session = await getCustomerSession();
  if (!session) redirect("/eduos/login");
  if (session.mustResetPassword) redirect("/eduos/reset-password");
  if (session.onboardingCompleted) redirect("/eduos/dashboard");

  return (
    <>
      <EduOSNavbar />
      <main>
        <section style={{ padding: "70px 0 100px" }}>
          <div className="e-shell">
            <OnboardingWizard workspaceId={session.workspaceId} />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
