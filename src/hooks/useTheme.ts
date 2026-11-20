"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { THEMES, THEME_STORAGE_KEY, type Theme } from "@/app/constants/themes";

const DEFAULT_THEME: Theme = "warm";

// The saved theme is read through useSyncExternalStore, so server and client
// markup agree on the first render and the saved value applies right after hydration.
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener); // keep other open tabs in sync
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSavedTheme(): Theme {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved && saved in THEMES ? (saved as Theme) : DEFAULT_THEME;
}

/**
 * The active reading theme. Changing it persists the choice and updates the
 * CSS variables and theme-color meta tag.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSavedTheme, () => DEFAULT_THEME);

  useEffect(() => {
    const { bg, text } = THEMES[theme].cssVars;
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", bg);
    root.style.setProperty("--theme-text", text);
    document.getElementById("theme-color-meta")?.setAttribute("content", bg);
  }, [theme]);

  const changeTheme = useCallback((next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    notify();
  }, []);

  return { theme, changeTheme };
}
