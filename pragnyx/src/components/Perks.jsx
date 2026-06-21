import { Globe2, Clock, GraduationCap, HeartHandshake } from "lucide-react";
import Reveal from "./Reveal";

const PERKS = [
  {
    icon: Globe2,
    title: "Remote-first, always",
    copy: "Work from wherever you do your best thinking. We're distributed across time zones by design.",
  },
  {
    icon: Clock,
    title: "Async by default",
    copy: "Meetings are the exception, not the default. Deep work blocks are protected.",
  },
  {
    icon: GraduationCap,
    title: "Free PragnyX Learning access",
    copy: "Every team member gets unlimited 1:1 sessions with our mentor network, on us.",
  },
  {
    icon: HeartHandshake,
    title: "Profit-sharing from year one",
    copy: "Everyone who builds the outcome shares in it — not just equity that vests in four years.",
  },
];

export default function Perks() {
  return (
    <section className="relative bg-surface py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Why PragnyX
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Built so good people stay.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 90}>
              <div className="h-full gradient-border cut">
                <div className="cut h-full bg-void px-6 py-8 flex flex-col">
                  <div className="cut-sm w-11 h-11 flex items-center justify-center bg-surface-2 border border-line text-violet">
                    <perk.icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-display text-base font-medium tracking-tight">
                    {perk.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-mute leading-relaxed">
                    {perk.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
