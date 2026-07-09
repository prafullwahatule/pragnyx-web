import FinCoreNavbar from "@/components/fincore/FinCoreNavbar";
import FinCoreFooter from "@/components/fincore/FinCoreFooter";
import Hero from "@/components/fincore/Hero";
import ProblemSolution from "@/components/fincore/ProblemSolution";
import FeatureGrid from "@/components/fincore/FeatureGrid";
import PurchaseJourney from "@/components/fincore/PurchaseJourney";
import LicensingPanel from "@/components/fincore/LicensingPanel";
import PricingTiers from "@/components/fincore/PricingTiers";
import ModularAddons from "@/components/fincore/ModularAddons";
import Roadmap from "@/components/fincore/Roadmap";
import Testimonials from "@/components/fincore/Testimonials";
import FinCoreFAQ from "@/components/fincore/FinCoreFAQ";
import DemoForm from "@/components/fincore/DemoForm";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinCorePage() {
  return (
    <>
      <FinCoreNavbar />
      <main>
        <Hero />
        <ProblemSolution />

        <section id="features" className="e-section">
          <div className="e-shell">
            <Reveal>
              <span className="e-eyebrow">Everything, in one system</span>
              <h2 style={{ marginTop: 14, fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 600, maxWidth: 640 }}>
                Real features. Nothing hypothetical.
              </h2>
              <p style={{ marginTop: 12, fontSize: 15, color: "var(--e-ink-mute)", maxWidth: 560 }}>
                Every card below is a working capability in FinCore today — grouped by what your team actually does.
              </p>
            </Reveal>
            <div style={{ marginTop: 40 }}>
              <FeatureGrid />
            </div>
          </div>
        </section>

        <PurchaseJourney />
        <LicensingPanel />

        <section className="e-section">
          <div className="e-shell">
            <Reveal>
              <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
                <span className="e-eyebrow" style={{ justifyContent: "center" }}>Editions</span>
                <h2 style={{ marginTop: 14, fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 600 }}>
                  Starter, Professional, Enterprise
                </h2>
                <p style={{ marginTop: 12, fontSize: 15, color: "var(--e-ink-mute)" }}>
                  Modular licensing — start where you are, unlock more as you grow.
                </p>
              </div>
            </Reveal>
            <div style={{ marginTop: 40 }}>
              <PricingTiers compact />
            </div>
            <ModularAddons />
          </div>
        </section>

        <Roadmap />
        <Testimonials />
        <FinCoreFAQ />

        <section className="e-section" style={{ background: "var(--e-bg-alt)" }}>
          <div className="e-shell">
            <Reveal>
              <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
                <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 600 }}>See PragnyX FinCore in action</h2>
                <p style={{ marginTop: 12, fontSize: 15, color: "var(--e-ink-mute)" }}>
                  Book a walkthrough with our team, scoped to your business&apos;s size and workflows.
                </p>
              </div>
            </Reveal>
            <DemoForm />
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Link href="/fincore/signup" className="e-btn e-btn-ghost" style={{ display: "inline-flex" }}>
                Or start self-serve on Starter/Professional <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FinCoreFooter />
    </>
  );
}
