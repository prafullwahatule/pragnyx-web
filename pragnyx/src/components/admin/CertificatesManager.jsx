"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, ExternalLink, Info } from "lucide-react";

export default function CertificatesManager({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(null); // null | "new" | item
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function emptyForm() {
    return {
      id: "",
      recipientName: "",
      courseTitle: "",
      courseLevel: "Beginner",
      courseSummary: "",
      courseModules: [],
      trainerName: "",
      trainerTitle: "Trainer, PragnyX Learning",
      durationLabel: "",
      durationMinutes: 0,
      trainingType: "Live Online 1-to-1 Training",
      sessionsCount: 0,
      learnersCount: 0,
      skills: [],
      issuedOn: "",
      completionDate: "",
      certifyingOrg: "PragnyX Learning",
      status: "verified",
      pdfUrl: "",
      imageUrl: "",
    };
  }

  const [form, setForm] = useState(emptyForm());

  function openNew() {
    setForm(emptyForm());
    setError("");
    setEditing("new");
  }

  function openEdit(item) {
    setForm({
      id: item.id,
      recipientName: item.recipientName,
      courseTitle: item.course?.title || "",
      courseLevel: item.course?.level || "Beginner",
      courseSummary: item.course?.summary || "",
      courseModules: item.course?.modules || [],
      trainerName: item.trainer?.name || "",
      trainerTitle: item.trainer?.title || "",
      durationLabel: item.durationLabel || "",
      durationMinutes: item.durationMinutes || 0,
      trainingType: item.trainingType || "",
      sessionsCount: item.sessionsCount || 0,
      learnersCount: item.learnersCount || 0,
      skills: item.skills || [],
      issuedOn: item.issuedOn || "",
      completionDate: item.completionDate || "",
      certifyingOrg: item.certifyingOrg || "PragnyX Learning",
      status: item.status || "verified",
      pdfUrl: item.pdfUrl || "",
      imageUrl: item.imageUrl || "",
    });
    setError("");
    setEditing(item);
  }

  function closeForm() {
    setEditing(null);
    setError("");
  }

  function set(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function toPayload(f) {
    return {
      id: f.id.trim().toUpperCase(),
      recipientName: f.recipientName,
      course: { title: f.courseTitle, level: f.courseLevel, summary: f.courseSummary, modules: f.courseModules },
      trainer: { name: f.trainerName, title: f.trainerTitle },
      durationLabel: f.durationLabel,
      durationMinutes: Number(f.durationMinutes) || 0,
      trainingType: f.trainingType,
      sessionsCount: Number(f.sessionsCount) || 0,
      learnersCount: Number(f.learnersCount) || 0,
      skills: f.skills,
      issuedOn: f.issuedOn || null,
      completionDate: f.completionDate || null,
      certifyingOrg: f.certifyingOrg,
      status: f.status,
      pdfUrl: f.pdfUrl,
      imageUrl: f.imageUrl,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const isNew = editing === "new";
    const url = isNew ? "/api/admin/certificates" : `/api/admin/certificates/${editing.id}`;
    const method = isNew ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(form)),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSaving(false);
        return;
      }
      if (isNew) {
        setItems((prev) => [data.item, ...prev]);
      } else {
        setItems((prev) => prev.map((i) => (i.id === editing.id ? data.item : i)));
      }
      setSaving(false);
      closeForm();
    } catch {
      setError("Network error — try again.");
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete certificate "${item.id}"? This can't be undone.`)) return;
    await fetch(`/api/admin/certificates/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Certificates</h1>
          <p className="mt-1.5 text-sm text-mute max-w-lg">
            PragnyX Learning certificates. Each one becomes verifiable at{" "}
            <code className="text-paper/80">/learning/certificate/&lt;id&gt;</code>.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-5 py-2.5 font-mono text-xs tracking-[0.12em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 shrink-0"
        >
          <Plus size={15} strokeWidth={2} />
          Issue certificate
        </button>
      </div>

      <div className="flex items-start gap-3 cut-sm border border-blue/30 bg-blue/10 px-5 py-4 mb-7">
        <Info size={16} className="text-blue shrink-0 mt-0.5" />
        <p className="text-xs text-blue-100/90 leading-relaxed">
          Issuing a certificate here makes it instantly verifiable on the live site. The printable
          PDF (with QR code) is a separate offline step — run{" "}
          <code className="text-paper/90">node scripts/certificates/render-certificate.js &lt;id&gt;</code>{" "}
          locally after issuing, per <code className="text-paper/90">scripts/certificates/README.md</code>.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="cut border border-line bg-surface px-8 py-14 text-center">
          <p className="text-sm text-mute">No certificates issued yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 cut-sm border border-line bg-surface px-4 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-paper truncate">{item.recipientName}</p>
                <p className="text-xs text-mute truncate mt-0.5">
                  {item.id} · {item.course?.title}
                </p>
              </div>
              <a
                href={`/learning/certificate/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-mute hover:text-blue transition-colors"
                title="View verification page"
              >
                <ExternalLink size={15} />
              </a>
              <button onClick={() => openEdit(item)} className="p-2 text-mute hover:text-blue transition-colors" title="Edit">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(item)} className="p-2 text-mute hover:text-rose-400 transition-colors" title="Delete">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-void/70 backdrop-blur-sm" onClick={closeForm}>
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-xl h-full overflow-y-auto bg-surface border-l border-line"
          >
            <div className="sticky top-0 bg-surface border-b border-line px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-display text-base font-medium tracking-tight">
                {editing === "new" ? "Issue certificate" : `Edit ${editing.id}`}
              </h2>
              <button type="button" onClick={closeForm} className="text-mute hover:text-paper transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6 flex flex-col gap-5">
              <TextField label="Certificate ID (e.g. PXL-PBI-2026-001)" value={form.id} onChange={(v) => set("id", v)} disabled={editing !== "new"} required />
              <TextField label="Recipient name" value={form.recipientName} onChange={(v) => set("recipientName", v)} required />

              <Divider label="Course" />
              <TextField label="Course title" value={form.courseTitle} onChange={(v) => set("courseTitle", v)} required />
              <SelectField
                label="Level"
                value={form.courseLevel}
                onChange={(v) => set("courseLevel", v)}
                options={["Beginner", "Intermediate", "Advanced"]}
              />
              <TextAreaField label="Course summary" value={form.courseSummary} onChange={(v) => set("courseSummary", v)} />
              <TagsField label="Modules" value={form.courseModules} onChange={(v) => set("courseModules", v)} />
              <TagsField label="Skills" value={form.skills} onChange={(v) => set("skills", v)} />

              <Divider label="Trainer" />
              <TextField label="Trainer name" value={form.trainerName} onChange={(v) => set("trainerName", v)} required />
              <TextField label="Trainer title" value={form.trainerTitle} onChange={(v) => set("trainerTitle", v)} />

              <Divider label="Program details" />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Duration label (e.g. 1 Month)" value={form.durationLabel} onChange={(v) => set("durationLabel", v)} />
                <NumberField label="Duration (minutes)" value={form.durationMinutes} onChange={(v) => set("durationMinutes", v)} />
              </div>
              <TextField label="Training type" value={form.trainingType} onChange={(v) => set("trainingType", v)} />
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Sessions count" value={form.sessionsCount} onChange={(v) => set("sessionsCount", v)} />
                <NumberField label="Learners count" value={form.learnersCount} onChange={(v) => set("learnersCount", v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <DateField label="Completion date" value={form.completionDate} onChange={(v) => set("completionDate", v)} />
                <DateField label="Issued on" value={form.issuedOn} onChange={(v) => set("issuedOn", v)} />
              </div>
              <SelectField
                label="Status"
                value={form.status}
                onChange={(v) => set("status", v)}
                options={["verified", "revoked"]}
              />

              {error && <p className="text-xs text-rose-400">{error}</p>}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-6 py-3 font-mono text-xs tracking-[0.12em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {saving ? "Saving…" : "Save"}
                  {saving && <Loader2 size={14} className="animate-spin" />}
                </button>
                <button type="button" onClick={closeForm} className="text-xs text-mute hover:text-paper transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-blue">{label}</span>
      <span className="flex-1 h-px bg-line" />
    </div>
  );
}

function TextField({ label, value, onChange, required, disabled }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
        {label} {required && <span className="text-blue">*</span>}
      </label>
      <input
        type="text"
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors disabled:opacity-50"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors resize-none"
      />
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors"
      />
    </div>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">{label}</label>
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-blue/60 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TagsField({ label, value, onChange }) {
  const [draft, setDraft] = useState("");
  function add() {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft("");
  }
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">{label}</label>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {value.map((tag, i) => (
          <span key={`${tag}-${i}`} className="inline-flex items-center gap-1.5 cut-sm bg-surface-2 border border-line px-2.5 py-1 text-xs text-paper/90">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((_, idx) => idx !== i))} className="text-mute hover:text-rose-400">
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Type and press Enter"
          className="flex-1 bg-surface-2 border border-line cut-sm px-4 py-2 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
        />
        <button type="button" onClick={add} className="cut-sm border border-line px-3 py-2 text-xs text-mute hover:text-paper transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}
