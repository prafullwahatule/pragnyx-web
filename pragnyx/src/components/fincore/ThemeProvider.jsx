"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function useFinCoreTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("fincore-theme");
    if (stored === "light" || stored === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage on mount
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
       
      setTheme("dark");
    }
     
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      window.localStorage.setItem("fincore-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="fincore" data-theme={mounted ? theme : "light"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
