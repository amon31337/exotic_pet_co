import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light"); // "light" | "dark"

  const value = useMemo(() => ({
    mode,
    toggle: () => setMode(m => (m === "light" ? "dark" : "light")),
    colors: {
      light: {
        bg: "#f8f9fb",
        card: "#ffffff",
        text: "#111827",
        accent: "#2563eb",
        subtle: "#6b7280",
        border: "#e5e7eb"
      },
      dark: {
        bg: "#0b1220",
        card: "#111827",
        text: "#e5e7eb",
        accent: "#60a5fa",
        subtle: "#9ca3af",
        border: "#1f2937"
      }
    }
  }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={mode}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
