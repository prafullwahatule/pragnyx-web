import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function ContactTeaser() {
  return (
    <section className="relative bg-surface py-28 lg:py-36 border-t border-line overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] opacity-[0.05] animate-spin-slow">
        <Image src="/logo/pragnyx-badge.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <Reveal>
          <h2 className="font-display font-medium text-3xl sm:text-5xl leading-[1.15] tracking-tight">
            Let&apos;s build what&apos;s{" "}
            <span className="text-gradient">next.</span>
          </h2>
          <p className="mt-6 max-w-md mx-auto text-mute leading-relaxed">
            Have an idea, a problem worth solving, or a frontier worth
            exploring? We&apos;d like to hear about it.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-8 py-4 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
