"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, KeyRound, ShieldCheck } from "lucide-react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/fincore/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      router.push(data.onboardingCompleted ? "/fincore/dashboard" : "/fincore/onboarding");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="e-card e-glass" style={{ padding: 36, maxWidth: 440, margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 44, height: 44, margin: "0 auto", borderRadius: 12,
            background: "linear-gradient(135deg, var(--e-primary), var(--e-primary-light))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <KeyRound size={20} strokeWidth={1.75} color="#fff" />
        </div>
        <h1 style={{ marginTop: 16, fontSize: 22, fontWeight: 600 }}>Set your password</h1>
        <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--e-ink-mute)" }}>
          For security, set a permanent password before continuing to your dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="e-field">
          <label className="e-label" htmlFor="rp-password">New password</label>
          <input
            id="rp-password"
            type="password"
            className="e-input"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="e-field">
          <label className="e-label" htmlFor="rp-confirm">Confirm password</label>
          <input
            id="rp-confirm"
            type="password"
            className="e-input"
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        {error && <span className="e-error">{error}</span>}
        <button type="submit" className="e-btn e-btn-primary e-btn-block" disabled={loading}>
          {loading ? <Loader2 size={16} className="e-spin" /> : "Set password & continue"}
          {!loading && <ArrowRight size={16} strokeWidth={2} />}
        </button>
      </form>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--e-border)", display: "flex", justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--e-ink-faint)" }}>
          <ShieldCheck size={14} strokeWidth={1.75} /> Your temporary password stops working once this is set
        </span>
      </div>

      <style>{`
        .e-spin { animation: e-spin 0.8s linear infinite; }
        @keyframes e-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
