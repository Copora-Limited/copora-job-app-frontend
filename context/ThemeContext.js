// context/ThemeContext.js
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const ThemeContext = createContext | undefined;

export const ThemeProvider = () => {
  const [darkMode, setDarkMode] =
    useState <
    boolean >
    (() => {
      // Get the dark mode preference from localStorage
      if (typeof window !== "undefined") {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode === "true";
      }
      return false;
    });

  useEffect(() => {
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
