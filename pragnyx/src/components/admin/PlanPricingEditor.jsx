"use client";

import { useState } from "react";
import { Check, Loader2, IndianRupee } from "lucide-react";

export default function PlanPricingEditor({
  title,
  description,
  apiPath,
  initialPlans,
  addonApiPath,
  initialAddOns = [],
}) {
  const [plans, setPlans] = useState(initialPlans);
  const [drafts, setDrafts] = useState(
    Object.fromEntries(initialPlans.filter((p) => p.selfServe).map((p) => [p.id, String(p.price ?? "")]))
  );
  const [saving, setSaving] = useState(null); // planId currently saving
  const [savedFlash, setSavedFlash] = useState(null); // planId that just saved
  const [error, setError] = useState("");

  const [addOns, setAddOns] = useState(initialAddOns);
  const [addonDrafts, setAddonDrafts] = useState(
    Object.fromEntries(initialAddOns.map((a) => [a.id, String(a.price ?? "")]))
  );
  const [addonSaving, setAddonSaving] = useState(null);
  const [addonSavedFlash, setAddonSavedFlash] = useState(null);

  const editablePlans = plans.filter((p) => p.selfServe);
  const fixedPlans = plans.filter((p) => !p.selfServe);

  async function savePrice(planId) {
    const value = drafts[planId];
    const numericPrice = Number(value);
    if (!value || !Number.isFinite(numericPrice) || numericPrice < 0) {
      setError("Enter a valid, non-negative price first.");
      return;
    }
    setError("");
    setSaving(planId);
    try {
      const res = await fetch(apiPath, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, price: numericPrice }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save price.");
        return;
      }
      setPlans(data.plans);
      setSavedFlash(planId);
      setTimeout(() => setSavedFlash((v) => (v === planId ? null : v)), 1800);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSaving(null);
    }
  }

  async function saveAddonPrice(addonId) {
    if (!addonApiPath) return;
    const value = addonDrafts[addonId];
    const numericPrice = Number(value);
    if (!value || !Number.isFinite(numericPrice) || numericPrice < 0) {
      setError("Enter a valid, non-negative price first.");
      return;
    }
    setError("");
    setAddonSaving(addonId);
    try {
      const res = await fetch(addonApiPath, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addonId, price: numericPrice }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save price.");
        return;
      }
      setAddOns(data.addOns);
      setAddonSavedFlash(addonId);
      setTimeout(() => setAddonSavedFlash((v) => (v === addonId ? null : v)), 1800);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setAddonSaving(null);
    }
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display text-2xl font-medium tracking-tight">{title}</h1>
        <p className="mt-1.5 text-sm text-mute max-w-lg">{description}</p>
      </div>

      {error && (
        <div className="mb-5 cut-sm border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {editablePlans.map((plan) => (
          <div key={plan.id} className="cut-sm border border-line bg-surface px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm text-paper font-medium">{plan.name}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wide text-mute border border-line px-2 py-0.5 rounded-full">
                    /{plan.billingPeriod}
                  </span>
                </div>
                <p className="mt-1 text-xs text-mute max-w-sm">{plan.tagline}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 cut-sm border border-line bg-surface-2 px-3 py-2">
                  <IndianRupee size={13} className="text-mute" />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={drafts[plan.id] ?? ""}
                    onChange={(e) => setDrafts((v) => ({ ...v, [plan.id]: e.target.value }))}
                    className="w-28 bg-transparent text-sm text-paper outline-none"
                  />
                </div>
                <button
                  onClick={() => savePrice(plan.id)}
                  disabled={saving === plan.id}
                  className="cut-sm border border-line bg-surface-2 px-4 py-2 text-xs font-medium text-paper transition-colors hover:border-blue/40 disabled:opacity-60 inline-flex items-center gap-1.5"
                >
                  {saving === plan.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : savedFlash === plan.id ? (
                    <Check size={13} className="text-blue" />
                  ) : null}
                  {savedFlash === plan.id ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fixedPlans.length > 0 && (
        <div className="mt-8">
          <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-3">
            Sales-assisted (not priced here)
          </h2>
          <div className="flex flex-col gap-3">
            {fixedPlans.map((plan) => (
              <div key={plan.id} className="cut-sm border border-line bg-surface px-5 py-4 flex items-center justify-between">
                <div>
                  <span className="text-sm text-paper font-medium">{plan.name}</span>
                  <p className="mt-1 text-xs text-mute">{plan.tagline}</p>
                </div>
                <span className="text-xs text-mute">Contact Sales / Book a Demo</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {addonApiPath && addOns.length > 0 && (
        <div className="mt-10">
          <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-3">
            Add-on pricing
          </h2>
          <p className="mb-3 text-xs text-mute max-w-lg">
            Monthly price for each add-on customers can attach to a self-serve plan from their dashboard's Modules tab.
          </p>
          <div className="flex flex-col gap-3">
            {addOns.map((addon) => (
              <div key={addon.id} className="cut-sm border border-line bg-surface px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-paper font-medium">{addon.name}</span>
                    <p className="mt-1 text-xs text-mute max-w-sm">{addon.description}</p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 cut-sm border border-line bg-surface-2 px-3 py-2">
                      <IndianRupee size={13} className="text-mute" />
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={addonDrafts[addon.id] ?? ""}
                        onChange={(e) => setAddonDrafts((v) => ({ ...v, [addon.id]: e.target.value }))}
                        className="w-28 bg-transparent text-sm text-paper outline-none"
                      />
                    </div>
                    <button
                      onClick={() => saveAddonPrice(addon.id)}
                      disabled={addonSaving === addon.id}
                      className="cut-sm border border-line bg-surface-2 px-4 py-2 text-xs font-medium text-paper transition-colors hover:border-blue/40 disabled:opacity-60 inline-flex items-center gap-1.5"
                    >
                      {addonSaving === addon.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : addonSavedFlash === addon.id ? (
                        <Check size={13} className="text-blue" />
                      ) : null}
                      {addonSavedFlash === addon.id ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
