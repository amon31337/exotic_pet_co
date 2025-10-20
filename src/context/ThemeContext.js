import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // const [mode, setMode] = useState("light"); // "light" | "dark"

  // const value = useMemo(() => ({
    // toggle: () => setMode(m => (m === "light" ? "dark" : "light")),
    // colors: {
      // light: {
      // },
      // dark: {
      // }
    // }
  // }), [mode]);

  return (
    <ThemeContext.Provider>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
