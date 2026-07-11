"use client";

import { useState } from "react";
import { MapPin, Briefcase, ArrowUpRight, Check, Loader2, X } from "lucide-react";
import { JOBS } from "@/data/site";
import Reveal from "./Reveal";

function ApplyForm({ job, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  // Honeypot — see Contact.jsx for the full explanation.
  const [website, setWebsite] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          name: form.name,
          email: form.email,
          note: form.note,
          website,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(Object.values(data.errors || {})[0] || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 flex items-center gap-3 cut-sm bg-surface-2 border border-line px-5 py-4">
        <Check size={16} strokeWidth={2} className="text-blue shrink-0" />
        <p className="text-sm text-paper/90">
          Application sent for <span className="font-medium">{job.title}</span>.
          We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
        />
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          className="w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
        />
      </div>
      <textarea
        name="note"
        rows={3}
        value={form.note}
        onChange={handleChange}
        placeholder="Link to portfolio / resume / GitHub, or anything else worth knowing"
        className="w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors resize-none"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-6 py-3 font-mono text-[11px] tracking-[0.12em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
        >
          {status === "loading" ? "Sending…" : "Submit application"}
          {status === "loading" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ArrowUpRight size={14} strokeWidth={1.75} />
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-mute hover:text-paper transition-colors"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </form>
  );
}

export default function JobListings({ jobs = JOBS }) {
  const [openJobId, setOpenJobId] = useState(null);

  return (
    <section id="roles" className="relative bg-void py-28 lg:py-36 border-t border-line">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
              Open roles
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl leading-[1.15] tracking-tight">
            {jobs.length} positions open right now.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {jobs.map((job, i) => {
            const isOpen = openJobId === job.id;
            return (
              <Reveal key={job.id} delay={i * 70}>
                <div className="gradient-border cut">
                  <div className="cut bg-surface px-7 py-7 sm:px-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-medium tracking-tight">
                          {job.title}
                        </h3>
                        <p className="mt-2 text-sm text-mute leading-relaxed max-w-md">
                          {job.summary}
                        </p>
                        <div className="mt-4 flex items-center gap-5 font-mono text-[10px] tracking-[0.1em] uppercase text-mute">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={12} /> {job.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setOpenJobId(isOpen ? null : job.id)}
                        className="shrink-0 inline-flex items-center gap-2 cut-sm border border-line bg-surface-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-paper hover:border-blue/50 transition-colors"
                      >
                        {isOpen ? "Close" : "Apply"}
                        {isOpen ? (
                          <X size={13} strokeWidth={1.75} />
                        ) : (
                          <ArrowUpRight size={13} strokeWidth={1.75} />
                        )}
                      </button>
                    </div>

                    {isOpen && (
                      <ApplyForm job={job} onClose={() => setOpenJobId(null)} />
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
