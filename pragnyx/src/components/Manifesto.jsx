import Image from "next/image";
import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative bg-surface py-32 lg:py-44 border-t border-line overflow-hidden"
    >
      <div className="absolute inset-0 bp-grid opacity-60 pointer-events-none" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] opacity-[0.05] animate-spin-slow">
        <Image src="/logo/pragnyx-badge.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
            Manifesto
          </span>
        </Reveal>

        <div className="mt-8 space-y-2 sm:space-y-3">
          <Reveal delay={80}>
            <p className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
              Challenging boundaries.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
              Exploring new possibilities.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-gradient">
              Building lasting impact.
            </p>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-mute">
              Think beyond logic
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-blue to-violet" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
