"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";
import { LEARNING_TRACKS, MENTORS } from "@/data/site";
import Reveal from "./Reveal";

export default function LearningRequestForm({ selectedMentorId, onClearMentor }) {
  const [form, setForm] = useState({ name: "", email: "", track: "", goal: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error
  const [errors, setErrors] = useState({});
  const [resultMessage, setResultMessage] = useState("");

  const selectedMentor = MENTORS.find((m) => m.id === selectedMentorId);

  useEffect(() => {
    if (selectedMentorId) {
      const el = document.getElementById("learning-request-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedMentorId]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/learning-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mentorId: selectedMentorId || "" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || {});
        setStatus("error");
        return;
      }

      setResultMessage(data.message);
      setStatus("sent");
    } catch {
      setErrors({ form: "Network error — please try again." });
      setStatus("error");
    }
  }

  return (
    <section
      id="learning-request-form"
      className="relative bg-surface py-28 lg:py-36 border-t border-line scroll-mt-24"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Get started
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight">
            Request your first session.
          </h2>
          <p className="mt-4 text-mute leading-relaxed max-w-md">
            Free intro call, no commitment. We&apos;ll follow up by email within
            one business day.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="mt-12 gradient-border cut">
            <div className="cut bg-void px-8 py-9 sm:px-10 sm:py-10">
              {selectedMentor && status !== "sent" && (
                <div className="mb-7 flex items-center justify-between gap-4 cut-sm bg-surface-2 border border-line px-5 py-3.5">
                  <span className="text-sm text-paper/90">
                    Requesting{" "}
                    <span className="font-medium text-gradient">
                      {selectedMentor.name}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={onClearMentor}
                    aria-label="Clear mentor selection"
                    className="text-mute hover:text-paper transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}

              {status === "sent" ? (
                <div className="flex flex-col items-start gap-3 py-6">
                  <div className="cut-sm w-12 h-12 flex items-center justify-center bg-blue/15 text-blue">
                    <Check size={20} strokeWidth={2} />
                  </div>
                  <p className="font-display text-lg font-medium tracking-tight">
                    {resultMessage}
                  </p>
                  <p className="text-sm text-mute">
                    Keep an eye on your inbox — that&apos;s where we&apos;ll reach you.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors ${
                          errors.name ? "border-rose-500/60" : "border-line"
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors ${
                          errors.email ? "border-rose-500/60" : "border-line"
                        }`}
                        placeholder="you@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="track"
                      className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                    >
                      What do you want to learn?
                    </label>
                    <select
                      id="track"
                      name="track"
                      required
                      value={form.track}
                      onChange={handleChange}
                      className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors ${
                        errors.track ? "border-rose-500/60" : "border-line"
                      }`}
                    >
                      <option value="" disabled>
                        Select a track
                      </option>
                      {LEARNING_TRACKS.map((track) => (
                        <option key={track} value={track}>
                          {track}
                        </option>
                      ))}
                    </select>
                    {errors.track && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.track}</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="goal"
                      className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute"
                    >
                      What&apos;s your goal?
                    </label>
                    <textarea
                      id="goal"
                      name="goal"
                      required
                      rows={4}
                      value={form.goal}
                      onChange={handleChange}
                      className={`mt-2 w-full bg-surface-2 border cut-sm px-4 py-3 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors resize-none ${
                        errors.goal ? "border-rose-500/60" : "border-line"
                      }`}
                      placeholder="e.g. Prepping for system design interviews in 6 weeks…"
                    />
                    {errors.goal && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.goal}</p>
                    )}
                  </div>

                  <div className="mt-7 flex items-center gap-5">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-7 py-3.5 font-mono text-xs tracking-[0.14em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {status === "loading" ? "Sending…" : "Request session"}
                      {status === "loading" ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.75}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                    </button>
                    {errors.form && (
                      <span className="text-xs text-rose-400">{errors.form}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
