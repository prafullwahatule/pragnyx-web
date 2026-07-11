import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import PricingTiers from "@/components/fincore/PricingTiers";
import ModularAddons from "@/components/fincore/ModularAddons";
import FinCoreFAQ from "@/components/fincore/FinCoreFAQ";
import Reveal from "@/components/Reveal";
import { getEffectivePlans } from "@/lib/fincore/effectivePlans";

export const metadata = {
  title: "Pricing — PragnyX FinCore",
  description: "Starter, Professional, and Enterprise editions of PragnyX FinCore. Modular licensing — unlock modules like Inventory Pro, Payroll, and the AI Suite as add-ons.",
  alternates: { canonical: "https://pragnyx.in/fincore/pricing" },
  openGraph: {
    title: "Pricing — PragnyX FinCore",
    description: "Starter, Professional, and Enterprise editions of PragnyX FinCore. Modular licensing — unlock modules like Inventory Pro, Payroll, and the AI Suite as add-ons.",
    url: "https://pragnyx.in/fincore/pricing",
    siteName: "PragnyX FinCore",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function FinCorePricingPage() {
  const plans = await getEffectivePlans();

  return (
    <>
      <FinCoreNavbar />
      <main>
        <section className="e-dot-grid e-mesh-bg" style={{ padding: "72px 0 20px" }}>
          <div className="e-shell" style={{ textAlign: "center" }}>
            <Reveal>
              <span className="e-eyebrow" style={{ justifyContent: "center" }}>Pricing</span>
              <h1 style={{ marginTop: 16, fontSize: "clamp(30px, 4.4vw, 46px)", fontWeight: 600, maxWidth: 700, margin: "16px auto 0" }}>
                Modular pricing for every business size
              </h1>
              <p style={{ marginTop: 16, fontSize: 16, color: "var(--e-ink-mute)", maxWidth: 560, margin: "16px auto 0" }}>
                Starter and Professional are available to purchase directly online. Enterprise is scoped with our team.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="e-section" style={{ paddingTop: 40 }}>
          <div className="e-shell">
            <PricingTiers plans={plans} />
            <ModularAddons />
          </div>
        </section>

        <FinCoreFAQ />
      </main>
      <FinCoreFooter />
    </>
  );
}
