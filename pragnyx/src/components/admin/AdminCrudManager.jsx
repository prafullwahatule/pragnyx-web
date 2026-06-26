"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, GripVertical, Eye, EyeOff } from "lucide-react";

/**
 * Generic list+form CRUD manager for simple admin entities.
 *
 * @param {object} props
 * @param {string} props.title - page heading
 * @param {string} props.description - subtext under heading
 * @param {string} props.apiPath - base API path, e.g. "/api/admin/mentors"
 * @param {Array}  props.initialItems - items fetched server-side
 * @param {Array}  props.fields - field config: [{ name, label, type: "text"|"textarea"|"number"|"checkbox"|"select"|"tags", options?, required? }]
 * @param {string} props.titleField - name of the field to show as each row's title (e.g. "name")
 * @param {string} [props.subtitleTemplate] - secondary line template, e.g. "{location} · {type}" — placeholders are replaced with that field's value on each item
 * @param {boolean} [props.hasVisibleToggle] - show an eye icon to toggle `visible`
 * @param {boolean} [props.reorderable] - show drag handles and persist order
 * @param {string}  [props.idField] - name of the id field (default "id")
 * @param {boolean} [props.idIsEditable] - if true, id is a required text field on create (e.g. mentor slug)
 *
 * Note: titleField/subtitleTemplate are plain strings (not functions) on
 * purpose — this component is rendered from Server Component pages, and
 * React can't pass functions as props across the server/client boundary.
 */
export default function AdminCrudManager({
  title,
  description,
  apiPath,
  initialItems,
  fields,
  titleField,
  subtitleTemplate,
  hasVisibleToggle = true,
  reorderable = true,
  idField = "id",
  idIsEditable = false,
}) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(null); // null | "new" | item
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [draggedId, setDraggedId] = useState(null);

  function getTitle(item) {
    return item[titleField] ?? "";
  }

  function getSubtitle(item) {
    if (!subtitleTemplate) return null;
    return subtitleTemplate.replace(/\{(\w+)\}/g, (_, key) => item[key] ?? "");
  }

  function emptyForm() {
    const f = {};
    for (const field of fields) {
      f[field.name] = field.type === "tags" ? [] : field.type === "checkbox" ? false : "";
    }
    if (idIsEditable) f[idField] = "";
    return f;
  }

  const [form, setForm] = useState(emptyForm());

  function openNew() {
    setForm(emptyForm());
    setError("");
    setEditing("new");
  }

  function openEdit(item) {
    const f = {};
    for (const field of fields) f[field.name] = item[field.name] ?? (field.type === "tags" ? [] : "");
    if (idIsEditable) f[idField] = item[idField];
    setForm(f);
    setError("");
    setEditing(item);
  }

  function closeForm() {
    setEditing(null);
    setError("");
  }

  function handleFieldChange(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const isNew = editing === "new";
    const url = isNew ? apiPath : `${apiPath}/${editing[idField]}`;
    const method = isNew ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSaving(false);
        return;
      }

      if (isNew) {
        setItems((prev) => [...prev, data.item]);
      } else {
        setItems((prev) => prev.map((i) => (i[idField] === editing[idField] ? data.item : i)));
      }
      setSaving(false);
      closeForm();
    } catch {
      setError("Network error — try again.");
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete "${getTitle(item)}"? This can't be undone.`)) return;
    try {
      await fetch(`${apiPath}/${item[idField]}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i[idField] !== item[idField]));
    } catch {
      alert("Failed to delete. Try again.");
    }
  }

  async function handleToggleVisible(item) {
    const newVisible = !item.visible;
    setItems((prev) =>
      prev.map((i) => (i[idField] === item[idField] ? { ...i, visible: newVisible } : i))
    );
    await fetch(`${apiPath}/${item[idField]}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, visible: newVisible }),
    });
  }

  function handleDragStart(id) {
    setDraggedId(id);
  }

  function handleDragOver(e, overId) {
    e.preventDefault();
    if (draggedId === null || draggedId === overId) return;
    setItems((prev) => {
      const next = [...prev];
      const fromIndex = next.findIndex((i) => i[idField] === draggedId);
      const toIndex = next.findIndex((i) => i[idField] === overId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }

  async function handleDragEnd() {
    setDraggedId(null);
    const orderedIds = items.map((i) => i[idField]);
    await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reorder: orderedIds }),
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">{title}</h1>
          {description && <p className="mt-1.5 text-sm text-mute max-w-lg">{description}</p>}
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 cut bg-gradient-to-r from-blue to-violet px-5 py-2.5 font-mono text-xs tracking-[0.12em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5 shrink-0"
        >
          <Plus size={15} strokeWidth={2} />
          Add new
        </button>
      </div>

      {items.length === 0 ? (
        <div className="cut border border-line bg-surface px-8 py-14 text-center">
          <p className="text-sm text-mute">Nothing here yet. Add your first one.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div
              key={item[idField]}
              draggable={reorderable}
              onDragStart={() => handleDragStart(item[idField])}
              onDragOver={(e) => handleDragOver(e, item[idField])}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 cut-sm border border-line bg-surface px-4 py-3.5 transition-opacity ${
                draggedId === item[idField] ? "opacity-40" : ""
              } ${item.visible === false ? "opacity-60" : ""}`}
            >
              {reorderable && (
                <span className="text-mute/50 cursor-grab active:cursor-grabbing shrink-0">
                  <GripVertical size={16} />
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-paper truncate">{getTitle(item)}</p>
                {subtitleTemplate && (
                  <p className="text-xs text-mute truncate mt-0.5">{getSubtitle(item)}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {hasVisibleToggle && (
                  <button
                    onClick={() => handleToggleVisible(item)}
                    title={item.visible === false ? "Hidden — click to show" : "Visible — click to hide"}
                    className="p-2 text-mute hover:text-paper transition-colors"
                  >
                    {item.visible === false ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 text-mute hover:text-blue transition-colors"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-2 text-mute hover:text-rose-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-4 bg-void/70 backdrop-blur-sm" onClick={closeForm}>
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-surface border-l sm:border border-line overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface border-b border-line px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-display text-base font-medium tracking-tight">
                {editing === "new" ? "Add new" : "Edit"}
              </h2>
              <button type="button" onClick={closeForm} className="text-mute hover:text-paper transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6 flex flex-col gap-5">
              {idIsEditable && (
                <FieldInput
                  field={{
                    name: idField,
                    label: "ID (used in URLs — letters, numbers, hyphens only)",
                    type: "text",
                    required: true,
                  }}
                  value={form[idField]}
                  onChange={(v) => handleFieldChange(idField, v)}
                  disabled={editing !== "new"}
                />
              )}
              {fields.map((field) => (
                <FieldInput
                  key={field.name}
                  field={field}
                  value={form[field.name]}
                  onChange={(v) => handleFieldChange(field.name, v)}
                />
              ))}

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
                <button
                  type="button"
                  onClick={closeForm}
                  className="text-xs text-mute hover:text-paper transition-colors"
                >
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

function FieldInput({ field, value, onChange, disabled = false }) {
  const baseInputClass =
    "mt-2 w-full bg-surface-2 border border-line cut-sm px-4 py-2.5 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors disabled:opacity-50";

  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
        {field.label}
        {field.required && <span className="text-blue ml-1">*</span>}
      </label>

      {field.type === "textarea" && (
        <textarea
          rows={field.rows || 4}
          required={field.required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInputClass} resize-none`}
        />
      )}

      {field.type === "text" && (
        <input
          type="text"
          required={field.required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClass}
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          step={field.step || "any"}
          required={field.required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className={baseInputClass}
        />
      )}

      {field.type === "date" && (
        <input
          type="date"
          required={field.required}
          disabled={disabled}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClass}
        />
      )}

      {field.type === "select" && (
        <select
          required={field.required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClass}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "checkbox" && (
        <div className="mt-2.5">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange(!value)}
            className={`inline-flex items-center gap-2 cut-sm px-4 py-2 text-xs border transition-colors ${
              value
                ? "bg-blue/15 border-blue/40 text-blue"
                : "bg-surface-2 border-line text-mute"
            }`}
          >
            {value ? "Yes" : "No"}
          </button>
        </div>
      )}

      {field.type === "tags" && (
        <TagsInput value={value || []} onChange={onChange} disabled={disabled} />
      )}
    </div>
  );
}

function TagsInput({ value, onChange, disabled }) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft("");
  }

  function removeTag(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1.5 cut-sm bg-surface-2 border border-line px-2.5 py-1 text-xs text-paper/90"
          >
            {tag}
            {!disabled && (
              <button type="button" onClick={() => removeTag(i)} className="text-mute hover:text-rose-400">
                <X size={11} />
              </button>
            )}
          </span>
        ))}
      </div>
      {!disabled && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Type and press Enter"
            className="flex-1 bg-surface-2 border border-line cut-sm px-4 py-2 text-sm text-paper placeholder:text-mute/60 focus:outline-none focus:border-blue/60 transition-colors"
          />
          <button
            type="button"
            onClick={addTag}
            className="cut-sm border border-line px-3 py-2 text-xs text-mute hover:text-paper transition-colors"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
