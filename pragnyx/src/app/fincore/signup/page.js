import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import SignupWizard from "@/components/fincore/SignupWizard";
import { getPlan } from "@/lib/fincore/plans";

export const metadata = {
  title: "Get Started — PragnyX FinCore",
  description: "Choose your plan, add your business details, and get your FinCore workspace provisioned automatically.",
};

export default async function FinCoreSignupPage({ searchParams }) {
  const params = await searchParams;
  const requestedPlan = getPlan(params?.plan);

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section className="e-dot-grid" style={{ padding: "64px 0 80px" }}>
          <div className="e-shell">
            <SignupWizard initialPlan={requestedPlan?.id} />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
