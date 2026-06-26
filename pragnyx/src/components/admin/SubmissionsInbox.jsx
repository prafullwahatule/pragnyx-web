"use client";

import { useState } from "react";
import { Trash2, Mail, Check } from "lucide-react";

/**
 * Generic submissions inbox table.
 *
 * Per-type row rendering lives here (inside the Client Component) rather
 * than being passed in as a `columns` prop with render functions — React
 * Server Components can't pass functions as props to Client Components,
 * since functions aren't serializable across the server/client boundary.
 *
 * @param {string} title
 * @param {string} description
 * @param {string} apiPath - e.g. "/api/admin/submissions/contact"
 * @param {Array}  initialItems
 * @param {"contact"|"newsletter"|"learning-requests"|"job-applications"} type
 * @param {boolean} hasStatus - whether items have a status field with "new"/"read" states
 */
export default function SubmissionsInbox({ title, description, apiPath, initialItems, type, hasStatus = true }) {
  const [items, setItems] = useState(initialItems);

  async function markRead(item) {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "read" } : i)));
    await fetch(`${apiPath}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "read" }),
    });
  }

  async function handleDelete(item) {
    if (!confirm("Delete this entry? This can't be undone.")) return;
    await fetch(`${apiPath}/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  const newCount = hasStatus ? items.filter((i) => i.status === "new").length : 0;

  function renderFields(item) {
    switch (type) {
      case "contact":
        return (
          <>
            <div className="text-sm text-paper font-medium">
              {item.name} <span className="text-mute font-normal">· {item.email}</span>
            </div>
            <div className="text-sm text-mute">{item.message}</div>
          </>
        );
      case "newsletter":
        return <div className="text-sm text-paper font-medium">{item.email}</div>;
      case "learning-requests":
        return (
          <>
            <div className="text-sm text-paper font-medium">
              {item.name} <span className="text-mute font-normal">· {item.email}</span>
            </div>
            <div className="text-xs text-blue">
              {item.track}
              {item.mentor_id ? ` · mentor: ${item.mentor_id}` : ""}
            </div>
            <div className="text-sm text-mute">{item.goal}</div>
          </>
        );
      case "job-applications":
        return (
          <>
            <div className="text-sm text-paper font-medium">
              {item.name} <span className="text-mute font-normal">· {item.email}</span>
            </div>
            <div className="text-xs text-blue">{item.job_title}</div>
            {item.note && <div className="text-sm text-mute">{item.note}</div>}
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">{title}</h1>
          {description && <p className="mt-1.5 text-sm text-mute max-w-lg">{description}</p>}
        </div>
        <div className="flex items-center gap-3 text-xs text-mute">
          <span>{items.length} total</span>
          {hasStatus && newCount > 0 && (
            <span className="cut-sm bg-gradient-to-r from-blue to-violet px-2.5 py-1 font-mono text-[10px] text-white">
              {newCount} new
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="cut border border-line bg-surface px-8 py-14 text-center">
          <p className="text-sm text-mute">No submissions yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              className={`cut-sm border bg-surface px-5 py-4 transition-colors ${
                hasStatus && item.status === "new" ? "border-blue/40" : "border-line"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 grid gap-1">
                  {renderFields(item)}
                  <p className="text-xs text-mute mt-1">
                    {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {hasStatus && item.status === "new" && (
                    <button
                      onClick={() => markRead(item)}
                      title="Mark as read"
                      className="p-2 text-mute hover:text-blue transition-colors"
                    >
                      <Check size={15} />
                    </button>
                  )}
                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      title="Reply by email"
                      className="p-2 text-mute hover:text-blue transition-colors"
                    >
                      <Mail size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(item)}
                    title="Delete"
                    className="p-2 text-mute hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
