import { Target, ShieldCheck, Users2, Zap } from "lucide-react";
import Reveal from "./Reveal";

const VALUES = [
  {
    icon: Target,
    title: "Reasoning over guessing",
    copy: "If we can't explain why a system made a decision, we don't consider it finished — for our products or for ourselves.",
  },
  {
    icon: ShieldCheck,
    title: "Earned trust, not claimed trust",
    copy: "We'd rather under-promise on a pilot and over-deliver than the other way around. Trust compounds; hype doesn't.",
  },
  {
    icon: Users2,
    title: "People teach better than platforms",
    copy: "PragnyX Learning exists because a real mentor answering a real question still beats a perfectly-produced course video.",
  },
  {
    icon: Zap,
    title: "Ship the boring, hard parts first",
    copy: "The unglamorous infrastructure — auditability, reliability, plain explanations — comes before the flashy demo.",
  },
];

export default function ValuesGrid() {
  return (
    <section className="relative bg-surface py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              What we actually believe
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Values that show up in the product, not just the careers page.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 90}>
              <div className="h-full gradient-border cut">
                <div className="cut h-full bg-void px-7 py-8 flex gap-5">
                  <div className="cut-sm w-11 h-11 flex items-center justify-center bg-surface-2 border border-line text-blue shrink-0">
                    <value.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-medium tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-mute leading-relaxed">
                      {value.copy}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
