"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function FounderEditor({ initialFounder }) {
  const [form, setForm] = useState(initialFounder);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleChange(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/founder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        setSaving(false);
        return;
      }
      setSaved(true);
      setSaving(false);
    } catch {
      setError("Network error — try again.");
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-medium tracking-tight">Founder</h1>
      <p className="mt-1.5 text-sm text-mute max-w-lg">
        Shown in the &quot;Founder&quot; section on the /about page.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl flex flex-col gap-5">
        <div>
          <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">Bio</label>
          <textarea
            rows={4}
            required
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors resize-none"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">Quote</label>
          <textarea
            rows={3}
            required
            value={form.quote}
            onChange={(e) => handleChange("quote", e.target.value)}
            className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-xs text-rose-400">{error}</p>}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-6 py-3 font-mono text-xs tracking-[0.12em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save changes"}
            {saving && <Loader2 size={14} className="animate-spin" />}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-xs text-blue">
              <Check size={14} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
