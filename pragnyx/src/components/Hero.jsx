import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 bp-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/40 to-void" />

      {/* Gradient atmosphere blobs */}
      <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-blue/20 blur-[120px] animate-drift" />
      <div
        className="absolute -bottom-32 -right-20 h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[120px] animate-drift"
        style={{ animationDelay: "3s" }}
      />

      {/* Watermark badge mark */}
      <div className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[34rem] h-[34rem] opacity-[0.07] animate-spin-slow hidden lg:block">
        <Image src="/logo/pragnyx-badge.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-10 pt-28 pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 opacity-0 animate-[fade-up_0.8s_0.05s_ease-out_forwards]">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Wisdom for the Next Frontier
            </span>
          </div>

          <h1 className="font-display font-medium text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.06] lg:text-[4.5rem] lg:leading-[1.03] tracking-tight opacity-0 animate-[fade-up_0.8s_0.15s_ease-out_forwards]">
            The future is not
            <br />
            predicted.{" "}
            <span className="text-gradient">It is engineered.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base sm:text-lg text-mute leading-relaxed opacity-0 animate-[fade-up_0.8s_0.3s_ease-out_forwards]">
            PragnyX is a future-focused brand dedicated to innovation, creativity
            and intelligent thinking — challenging boundaries, exploring new
            possibilities, and building a world driven by ideas that create
            lasting impact.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4 opacity-0 animate-[fade-up_0.8s_0.45s_ease-out_forwards]">
            <a
              href="#philosophy"
              className="group inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Think Beyond Logic
              <ArrowRight size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-2 cut border border-line bg-surface/60 px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-paper transition-colors duration-300 hover:border-blue/50"
            >
              Read the Manifesto
            </a>
          </div>
        </div>
      </div>

      <a
        href="#overview"
        className="absolute bottom-9 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-mute hover:text-paper transition-colors"
        aria-label="Scroll to overview"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
