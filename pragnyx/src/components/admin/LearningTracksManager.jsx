"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";

export default function LearningTracksManager({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [newLabel, setNewLabel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    const label = newLabel.trim();
    if (!label) return;
    setError("");
    try {
      const res = await fetch("/api/admin/learning-tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setItems((prev) => [...prev, data.item]);
      setNewLabel("");
    } catch {
      setError("Network error — try again.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this track?")) return;
    await fetch(`/api/admin/learning-tracks/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditValue(item.label);
  }

  async function saveEdit(id) {
    const label = editValue.trim();
    if (!label) return;
    const res = await fetch(`/api/admin/learning-tracks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems((prev) => prev.map((i) => (i.id === id ? data.item : i)));
    }
    setEditingId(null);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-medium tracking-tight">Learning tracks</h1>
      <p className="mt-1.5 text-sm text-mute max-w-lg">
        The options learners can pick from in the &quot;What do you want to learn?&quot; dropdown
        on the learning request form.
      </p>

      <form onSubmit={handleAdd} className="mt-7 flex gap-3">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="e.g. Cloud Infrastructure"
          className="flex-1 bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-5 py-2.5 font-mono text-xs tracking-[0.12em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 shrink-0"
        >
          <Plus size={15} strokeWidth={2} />
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}

      <div className="mt-6 flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 cut-sm border border-line bg-surface px-4 py-3"
          >
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                  className="flex-1 bg-surface-2 border border-blue/50 cut-sm px-3 py-1.5 text-sm text-paper focus:outline-none"
                />
                <button onClick={() => saveEdit(item.id)} className="p-2 text-blue hover:text-paper transition-colors">
                  <Check size={15} />
                </button>
                <button onClick={() => setEditingId(null)} className="p-2 text-mute hover:text-paper transition-colors">
                  <X size={15} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-paper">{item.label}</span>
                <button onClick={() => startEdit(item)} className="p-2 text-mute hover:text-blue transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-mute hover:text-rose-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
