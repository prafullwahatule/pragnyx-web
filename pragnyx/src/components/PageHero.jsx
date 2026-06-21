export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative bg-void pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-blue/15 blur-[120px] animate-drift" />
      <div
        className="absolute -bottom-32 -right-20 h-[22rem] w-[22rem] rounded-full bg-violet/15 blur-[120px] animate-drift"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-7 opacity-0 animate-[fade-up_0.7s_0.05s_ease-out_forwards]">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-display font-medium text-[2.2rem] leading-[1.1] sm:text-5xl lg:text-6xl tracking-tight opacity-0 animate-[fade-up_0.7s_0.12s_ease-out_forwards]">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-xl text-base sm:text-lg text-mute leading-relaxed opacity-0 animate-[fade-up_0.7s_0.22s_ease-out_forwards]">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-9 opacity-0 animate-[fade-up_0.7s_0.32s_ease-out_forwards]">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
