"use client";

import { Moon, Sun } from "lucide-react";
import { useFinCoreTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useFinCoreTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="e-btn e-btn-ghost e-btn-sm"
      style={{ padding: "9px", borderRadius: "999px" }}
    >
      {theme === "light" ? <Moon size={16} strokeWidth={1.75} /> : <Sun size={16} strokeWidth={1.75} />}
    </button>
  );
}
