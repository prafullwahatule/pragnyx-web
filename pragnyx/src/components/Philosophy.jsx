import { Compass, Sparkles, BrainCircuit } from "lucide-react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    icon: Compass,
    title: "Innovation",
    copy:
      "We treat the default as a draft, not a destination. Every boundary is an invitation to ask what could replace it.",
  },
  {
    icon: Sparkles,
    title: "Creativity",
    copy:
      "The ideas worth building start where strict logic loosens its grip. That's the frontier where PragnyX begins its work.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Thinking",
    copy:
      "Wisdom for the next frontier means reasoning that's deliberate and considered — built to outlast the moment it solves.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Philosophy
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-2xl">
            Think beyond logic.
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 110}>
              <div className="group h-full gradient-border cut transition-transform duration-300 hover:-translate-y-1.5">
                <div className="cut h-full bg-surface px-7 py-9 flex flex-col">
                  <div className="cut-sm w-12 h-12 flex items-center justify-center bg-surface-2 border border-line mb-7 text-blue group-hover:text-violet transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-mute leading-relaxed">{copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
