"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const current = TESTIMONIALS[index];

  return (
    <section className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              In their words
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Teams and learners who&apos;ve already moved.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 gradient-border cut">
            <div className="cut bg-surface px-7 py-10 sm:px-12 sm:py-14">
              <Quote
                size={32}
                strokeWidth={1.25}
                className="text-blue/60 mb-6"
              />
              <p
                key={current.name}
                className="font-display text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight animate-[fade-up_0.5s_ease-out_forwards]"
              >
                {current.quote}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="font-display text-base font-medium">{current.name}</p>
                  <p className="text-sm text-mute">{current.role}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {TESTIMONIALS.map((t, i) => (
                      <button
                        key={t.name}
                        onClick={() => setIndex(i)}
                        aria-label={`Show testimonial from ${t.name}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index ? "w-6 bg-gradient-to-r from-blue to-violet" : "w-1.5 bg-line"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={prev}
                      aria-label="Previous testimonial"
                      className="cut-sm w-9 h-9 flex items-center justify-center bg-surface-2 border border-line text-mute hover:text-paper hover:border-blue/50 transition-colors"
                    >
                      <ChevronLeft size={16} strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next testimonial"
                      className="cut-sm w-9 h-9 flex items-center justify-center bg-surface-2 border border-line text-mute hover:text-paper hover:border-blue/50 transition-colors"
                    >
                      <ChevronRight size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
