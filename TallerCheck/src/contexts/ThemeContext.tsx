import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeColors = {
  background: string;
  card: string;
  text: string;
  subtitle: string;
  border: string;
  inputBackground: string;
  primary: string;
  primaryText: string;
  secondary: string;
  secondaryText: string;
  mutedText: string;
  tabBar: string;
  tabActive: string;
  tabInactive: string;
};

type ThemeContextType = {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  background: "#eaeaea",
  card: "#ffffff",
  text: "#000000",
  subtitle: "#333333",
  border: "#cccccc",
  inputBackground: "#ffffff",
  primary: "#1150af",
  primaryText: "#ffffff",
  secondary: "#6baea9",
  secondaryText: "#000000",
  mutedText: "#555555",
  tabBar: "#ffffff",
  tabActive: "#1150af",
  tabInactive: "#777777",
};

const darkColors: ThemeColors = {
  background: "#121212",
  card: "#1f1f1f",
  text: "#ffffff",
  subtitle: "#cccccc",
  border: "#444444",
  inputBackground: "#2a2a2a",
  primary: "#4f8cff",
  primaryText: "#ffffff",
  secondary: "#76c7c0",
  secondaryText: "#000000",
  mutedText: "#aaaaaa",
  tabBar: "#1f1f1f",
  tabActive: "#4f8cff",
  tabInactive: "#aaaaaa",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const colors = theme === "light" ? lightColors : darkColors;

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }

  return context;
}