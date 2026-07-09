import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import SignupWizard from "@/components/eduos/SignupWizard";
import { getPlan } from "@/lib/eduos/plans";

export const metadata = {
  title: "Get Started — PragnyX EduOS",
  description: "Choose your plan, add your institution details, and get your EduOS workspace provisioned automatically.",
};

export default async function EduOSSignupPage({ searchParams }) {
  const params = await searchParams;
  const requestedPlan = getPlan(params?.plan);

  return (
    <>
      <EduOSNavbar />
      <main>
        <section className="e-dot-grid" style={{ padding: "64px 0 80px" }}>
          <div className="e-shell">
            <SignupWizard initialPlan={requestedPlan?.id} />
          </div>
        </section>
      </main>
      <EduOSFooter />
    </>
  );
}
