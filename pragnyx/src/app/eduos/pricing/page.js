import EduOSNavbar from "@/components/eduos/EduOSNavbar";
import EduOSFooter from "@/components/eduos/EduOSFooter";
import PricingTiers from "@/components/eduos/PricingTiers";
import ModularAddons from "@/components/eduos/ModularAddons";
import EduOSFAQ from "@/components/eduos/EduOSFAQ";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Pricing — PragnyX EduOS",
  description: "Starter, Professional, and Enterprise editions of PragnyX EduOS. Modular licensing — unlock modules like Workflow Builder, Advanced Analytics, and the AI Suite as add-ons.",
};

export default function EduOSPricingPage() {
  return (
    <>
      <EduOSNavbar />
      <main>
        <section className="e-dot-grid e-mesh-bg" style={{ padding: "72px 0 20px" }}>
          <div className="e-shell" style={{ textAlign: "center" }}>
            <Reveal>
              <span className="e-eyebrow" style={{ justifyContent: "center" }}>Pricing</span>
              <h1 style={{ marginTop: 16, fontSize: "clamp(30px, 4.4vw, 46px)", fontWeight: 600, maxWidth: 700, margin: "16px auto 0" }}>
                Modular pricing for every institution size
              </h1>
              <p style={{ marginTop: 16, fontSize: 16, color: "var(--e-ink-mute)", maxWidth: 560, margin: "16px auto 0" }}>
                Starter and Professional are available to purchase directly online. Enterprise is scoped with our team.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="e-section" style={{ paddingTop: 40 }}>
          <div className="e-shell">
            <PricingTiers />
            <ModularAddons />
          </div>
        </section>

        <EduOSFAQ />
      </main>
      <EduOSFooter />
    </>
  );
}
