"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");
  // Honeypot — see Contact.jsx for the full explanation.
  const [website, setWebsite] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={`mt-4 flex items-center gap-2 text-sm text-paper ${compact ? "" : ""}`}>
        <Check size={15} strokeWidth={2} className="text-blue" />
        Subscribed — welcome to the frontier.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
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
      <div className="flex items-stretch gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="min-w-0 flex-1 bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 inline-flex items-center justify-center gap-1.5 cut-sm bg-gradient-to-r from-blue to-violet px-4 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ArrowUpRight size={14} strokeWidth={1.75} />
          )}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
    </form>
  );
}
