import { Check, ArrowUpRight } from "lucide-react";
import { LEARNING_PLANS } from "@/data/site";
import Reveal from "./Reveal";

export default function PricingPlans({ plans = LEARNING_PLANS, onChoosePlan }) {
  return (
    <section id="pricing" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Pricing
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Pay for sessions, not seat licenses.
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={`relative h-full cut ${
                  plan.featured
                    ? "bg-gradient-to-br from-blue/40 to-violet/40 p-[1.5px]"
                    : "gradient-border"
                }`}
              >
                <div className="cut h-full bg-surface px-7 py-9 flex flex-col">
                  {plan.featured && (
                    <span className="absolute -top-3 left-7 cut-sm bg-gradient-to-r from-blue to-violet px-3 py-1 font-mono text-[10px] tracking-[0.1em] uppercase text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-medium tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-mute">{plan.period}</span>
                  </div>
                  <p className="mt-4 text-sm text-mute leading-relaxed">
                    {plan.description}
                  </p>

                  <ul className="mt-7 flex flex-col gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check size={15} strokeWidth={2} className="text-blue mt-0.5 shrink-0" />
                        <span className="text-paper/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onChoosePlan(plan.name)}
                    className={`mt-8 inline-flex items-center justify-center gap-2 cut px-6 py-3.5 font-mono text-xs tracking-[0.14em] uppercase transition-transform duration-300 hover:-translate-y-0.5 ${
                      plan.featured
                        ? "bg-gradient-to-r from-blue to-violet text-white"
                        : "border border-line bg-surface-2 text-paper hover:border-blue/50"
                    }`}
                  >
                    Get started
                    <ArrowUpRight size={14} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
