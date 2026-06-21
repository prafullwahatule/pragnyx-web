import { MessageCircle, UserCheck, CalendarCheck, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Tell us your goal",
    copy: "Skip the syllabus browsing. Tell us what you're trying to get better at and how you learn best.",
  },
  {
    icon: UserCheck,
    title: "Get matched",
    copy: "We match you with a mentor whose track record fits — not just whoever's online.",
  },
  {
    icon: CalendarCheck,
    title: "Book a session",
    copy: "Start with a free intro call. If it clicks, book sessions as you go — no long contracts.",
  },
  {
    icon: TrendingUp,
    title: "Track real progress",
    copy: "Each session ends with notes and a next step, so progress compounds instead of resetting.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-surface py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              How it works
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Four steps. No cohort to wait for.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="relative h-full gradient-border cut">
                <div className="cut h-full bg-void px-6 py-8 flex flex-col">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 cut-sm w-11 h-11 flex items-center justify-center bg-surface-2 border border-line text-blue">
                    <step.icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-display text-base font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-mute leading-relaxed">
                    {step.copy}
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
