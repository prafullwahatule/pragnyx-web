"use client";

import { useState } from "react";
import { Star, MessageSquareText } from "lucide-react";
import { MENTORS } from "@/data/site";
import Reveal from "./Reveal";

const ALL_TRACKS = ["All", ...Array.from(new Set(MENTORS.flatMap((m) => m.tracks)))];

export default function MentorGrid({ onRequestMentor }) {
  const [activeTrack, setActiveTrack] = useState("All");

  const visible =
    activeTrack === "All"
      ? MENTORS
      : MENTORS.filter((m) => m.tracks.includes(activeTrack));

  return (
    <section id="mentors" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Mentors
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight max-w-xl">
            Pick a person, not a platform.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {ALL_TRACKS.map((track) => (
              <button
                key={track}
                onClick={() => setActiveTrack(track)}
                className={`cut-sm px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase border transition-colors ${
                  activeTrack === track
                    ? "bg-gradient-to-r from-blue to-violet text-white border-transparent"
                    : "border-line text-mute hover:text-paper hover:border-blue/40"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((mentor, i) => (
            <Reveal key={mentor.id} delay={i * 70}>
              <div className="group h-full gradient-border cut transition-transform duration-300 hover:-translate-y-1.5">
                <div className="cut h-full bg-surface px-7 py-8 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`cut-sm w-12 h-12 flex items-center justify-center border border-line shrink-0 ${
                        mentor.color === "blue" ? "bg-blue/10 text-blue" : "bg-violet/10 text-violet"
                      }`}
                    >
                      <span className="font-display text-base font-medium">
                        {mentor.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-mute">
                      <Star size={12} className="text-blue fill-blue" />
                      {mentor.rating}
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-xs text-mute">{mentor.title}</p>
                  <p className="mt-4 text-sm text-mute leading-relaxed flex-1">
                    {mentor.bio}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {mentor.tracks.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-1 bg-surface-2 border border-line text-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-mute">
                      {mentor.sessions} sessions taught
                    </span>
                    <button
                      onClick={() => onRequestMentor(mentor.id)}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase text-paper hover:text-gradient transition-colors"
                    >
                      <MessageSquareText size={13} strokeWidth={1.75} />
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-mute">
            No mentors match that track yet — try &quot;All&quot; or send us a request anyway.
          </p>
        )}
      </div>
    </section>
  );
}
