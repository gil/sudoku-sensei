import * as React from "react";
import {useEffect, useState} from "react";
import {MoonIcon, SunIcon} from "lucide-react";

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        return JSON.parse(savedMode);
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches;
      setDarkMode(newMode);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newMode));
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newMode));
      }
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="md:h-10 md:w-10 h-8 w-8 flex items-center justify-center rounded-md p-1 transition-colors hover:bg-gray-800"
    >
      <MoonIcon className="block dark:hidden h-5 w-5 text-violet-700" />
      <SunIcon className="hidden dark:block h-5 w-5 text-yellow-500" />
    </button>
  );
};
