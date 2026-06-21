import Reveal from "./Reveal";

export default function Overview() {
  return (
    <section id="overview" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="absolute inset-0 bp-grid-fine opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
                  Overview
                </span>
              </div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight">
                Engineering the next frontier of thought.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={120}>
              <p className="text-lg sm:text-xl text-mute leading-relaxed">
                PragnyX is a future-focused brand dedicated to innovation,
                creativity and intelligent thinking. We believe in challenging
                boundaries, exploring new possibilities, and building a world
                driven by ideas that create lasting impact.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-12 gradient-border cut">
                <p className="cut bg-surface px-8 py-9 sm:px-10 sm:py-10 font-display text-2xl sm:text-3xl leading-snug tracking-tight">
                  At PragnyX, the future is not predicted —{" "}
                  <span className="text-gradient">it is engineered.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
