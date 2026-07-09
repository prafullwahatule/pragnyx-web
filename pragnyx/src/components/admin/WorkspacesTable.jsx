"use client";

import { useState } from "react";
import { Trash2, PauseCircle, PlayCircle, ExternalLink } from "lucide-react";

const STATUS_STYLES = {
  active: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  suspended: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  cancelled: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export default function WorkspacesTable({
  initialItems,
  title = "EduOS workspaces",
  description = "Institutions provisioned through the EduOS self-serve checkout flow.",
  apiBasePath = "/api/admin/eduos/workspaces",
  idKey = "institutionId",
  profileKey = "institution",
}) {
  const [items, setItems] = useState(initialItems);

  async function toggleStatus(item) {
    const nextStatus = item.subscriptionStatus === "active" ? "suspended" : "active";
    setItems((prev) =>
      prev.map((w) => (w[idKey] === item[idKey] ? { ...w, subscriptionStatus: nextStatus } : w))
    );
    await fetch(`${apiBasePath}/${encodeURIComponent(item[idKey])}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
  }

  async function handleDelete(item) {
    if (!confirm(`Delete workspace "${item[idKey]}"? This can't be undone.`)) return;
    await fetch(`${apiBasePath}/${encodeURIComponent(item[idKey])}`, { method: "DELETE" });
    setItems((prev) => prev.filter((w) => w[idKey] !== item[idKey]));
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-mute max-w-lg">
            {description}
          </p>
        </div>
        <span className="text-xs text-mute">{items.length} total</span>
      </div>

      {items.length === 0 ? (
        <div className="cut border border-line bg-surface px-8 py-14 text-center">
          <p className="text-sm text-mute">No workspaces yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div key={item[idKey]} className="cut-sm border border-line bg-surface px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0 grid gap-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm text-paper font-medium">{item[profileKey]?.name}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wide ${
                        STATUS_STYLES[item.subscriptionStatus] || "text-mute border-line"
                      }`}
                    >
                      {item.subscriptionStatus}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wide text-mute border border-line px-2 py-0.5 rounded-full">
                      {item.planName}
                    </span>
                  </div>
                  <div className="text-xs text-blue flex items-center gap-1.5">
                    <a href={item.workspaceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      {item[idKey]} <ExternalLink size={11} />
                    </a>
                  </div>
                  <div className="text-xs text-mute">
                    {item[profileKey]?.contactPerson ? `${item[profileKey].contactPerson} · ` : ""}{item[profileKey]?.email} · {item[profileKey]?.phone}
                  </div>
                  <div className="text-xs text-mute">
                    Tenant: {item.tenantId} · License: {item.licenseId} · Renews{" "}
                    {item.renewalDate ? new Date(item.renewalDate).toLocaleDateString() : "—"}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleStatus(item)}
                    title={item.subscriptionStatus === "active" ? "Suspend" : "Reactivate"}
                    className="p-2 text-mute hover:text-blue transition-colors"
                  >
                    {item.subscriptionStatus === "active" ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    title="Delete workspace"
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
