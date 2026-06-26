import { Quote } from "lucide-react";
import { FOUNDER } from "@/data/site";
import Reveal from "./Reveal";

export default function Founder({ founder = FOUNDER }) {
  return (
    <section className="relative bg-void py-28 lg:py-36 border-t border-line overflow-hidden">
      <div className="absolute inset-0 bp-grid-fine opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Founder
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Started by someone who got tired of guessing.
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="gradient-border cut">
                <div className="cut bg-surface px-7 py-8">
                  <div className="cut-sm w-20 h-20 flex items-center justify-center bg-surface-2 border border-line text-2xl font-display font-medium text-gradient">
                    {founder.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight">
                    {founder.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
                    {founder.title}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <p className="text-base sm:text-lg text-mute leading-relaxed max-w-2xl">
                {founder.bio}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 gradient-border cut">
                <div className="cut bg-surface px-8 py-8 sm:px-10 sm:py-9 flex gap-5">
                  <Quote
                    size={28}
                    strokeWidth={1.5}
                    className="text-blue shrink-0 -mt-1"
                  />
                  <p className="font-display text-xl sm:text-2xl leading-snug tracking-tight">
                    {founder.quote}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
