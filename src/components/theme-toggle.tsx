"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "canary-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial: Theme = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const onToggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle color mode"
      onClick={onToggle}
      className="inline-flex h-7 w-14 items-center rounded-full border border-slate-300 bg-slate-100 px-1 transition dark:border-slate-600 dark:bg-slate-800"
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-amber-500 shadow transition ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
}
