import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import SignupWizard from "@/components/fincore/SignupWizard";
import { getEffectivePlans } from "@/lib/fincore/effectivePlans";

export const metadata = {
  title: "Get Started — PragnyX FinCore",
  description: "Choose your plan, add your business details, and get your FinCore workspace provisioned automatically.",
  alternates: { canonical: "https://pragnyx.in/fincore/signup" },
  openGraph: {
    title: "Get Started — PragnyX FinCore",
    description: "Choose your plan, add your business details, and get your FinCore workspace provisioned automatically.",
    url: "https://pragnyx.in/fincore/signup",
    siteName: "PragnyX FinCore",
    type: "website",
  },
};

export default async function FinCoreSignupPage({ searchParams }) {
  const params = await searchParams;
  const plans = await getEffectivePlans();
  const requestedPlan = plans.find((p) => p.id === params?.plan);

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section className="e-dot-grid" style={{ padding: "64px 0 80px" }}>
          <div className="e-shell">
            <SignupWizard plans={plans} initialPlan={requestedPlan?.id} />
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
