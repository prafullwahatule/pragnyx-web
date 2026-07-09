import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import SignupWizard from "@/components/eduos/SignupWizard";
import { getEffectivePlans } from "@/lib/eduos/effectivePlans";

export const metadata = {
  title: "Get Started — PragnyX EduOS",
  description: "Choose your plan, add your institution details, and get your EduOS workspace provisioned automatically.",
};

export default async function EduOSSignupPage({ searchParams }) {
  const params = await searchParams;
  const plans = await getEffectivePlans();
  const requestedPlan = plans.find((p) => p.id === params?.plan);

  return (
    <>
      <EduOSNavbar />
      <main>
        <section className="e-dot-grid" style={{ padding: "64px 0 80px" }}>
          <div className="e-shell">
            <SignupWizard plans={plans} initialPlan={requestedPlan?.id} />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
