"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      className="p-2 border rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      onClick={() => setIsDark(!isDark)}
    >
      Toggle {isDark ? "Light" : "Dark"} Mode
    </button>
  );
}