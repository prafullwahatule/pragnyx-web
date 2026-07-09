"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, ShieldCheck, KeyRound } from "lucide-react";

export default function LoginForm({ initialWorkspace = "" }) {
  const router = useRouter();
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!workspace.trim()) {
      setError("Enter your workspace URL or company code.");
      return;
    }
    setLoading(true);
    setError("");

    // Demo-mode login: looks up the provisioned workspace record so the
    // flow is real end-to-end, but there is no session/auth layer wired
    // up yet — that's the natural next step once a real DB/auth provider
    // (e.g. NextAuth + Postgres) replaces the in-memory store.
    try {
      const id = workspace.trim().includes(".") ? workspace.trim() : `${workspace.trim()}.pragnyx.in`;
      const res = await fetch(`/api/fincore/workspace/${encodeURIComponent(id)}`);
      if (!res.ok) {
        setError("We couldn't find that workspace. Check your company code and try again.");
        setLoading(false);
        return;
      }
      router.push(`/fincore/dashboard?workspace=${encodeURIComponent(id)}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="e-card e-glass" style={{ padding: 36, maxWidth: 420, margin: "0 auto" }}>
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
        <h1 style={{ marginTop: 16, fontSize: 22, fontWeight: 600 }}>Log in to FinCore</h1>
        <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--e-ink-mute)" }}>Enter your workspace URL or company code</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="e-field">
          <label className="e-label" htmlFor="l-workspace">Workspace URL or company code</label>
          <input
            id="l-workspace"
            className="e-input"
            placeholder="acmetraders or acmetraders.pragnyx.in"
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
          />
        </div>
        <div className="e-field">
          <label className="e-label" htmlFor="l-password">Password</label>
          <input id="l-password" type="password" className="e-input" placeholder="Temporary or reset password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <span className="e-error">{error}</span>}
        <button type="submit" className="e-btn e-btn-primary e-btn-block" disabled={loading}>
          {loading ? <Loader2 size={16} className="e-spin" /> : "Log in"}
          {!loading && <ArrowRight size={16} strokeWidth={2} />}
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
          <Link href="/contact" style={{ color: "var(--e-ink-faint)" }}>Forgot password?</Link>
          <Link href="/fincore/signup" style={{ color: "var(--e-primary)" }}>New business? Sign up</Link>
        </div>
      </form>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--e-border)", display: "flex", gap: 16, justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--e-ink-faint)" }}>
          <ShieldCheck size={14} strokeWidth={1.75} /> SSO ready
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--e-ink-faint)" }}>
          <ShieldCheck size={14} strokeWidth={1.75} /> 2FA ready
        </span>
      </div>

      <style>{`
        .e-spin { animation: e-spin 0.8s linear infinite; }
        @keyframes e-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
