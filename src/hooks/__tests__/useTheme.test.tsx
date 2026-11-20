import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    document.getElementById("theme-color-meta")?.remove();
    const meta = document.createElement("meta");
    meta.id = "theme-color-meta";
    meta.setAttribute("content", "#ffffff");
    document.head.appendChild(meta);
  });

  it("defaults to the warm theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("warm");
    expect(document.documentElement.style.getPropertyValue("--theme-bg")).toBe("#faf6f0");
  });

  it("restores the saved theme", () => {
    localStorage.setItem("bible-theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(document.getElementById("theme-color-meta")?.getAttribute("content")).toBe("#1a1a2e");
  });

  it("ignores a saved value that is not a theme", () => {
    localStorage.setItem("bible-theme", "light");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("warm");
  });

  it("persists a change and updates the CSS variables", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.changeTheme("ocean"));
    expect(result.current.theme).toBe("ocean");
    expect(localStorage.getItem("bible-theme")).toBe("ocean");
    expect(document.documentElement.style.getPropertyValue("--theme-text")).toBe("#f0f9ff");
  });

  it("follows a change made in another tab", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      localStorage.setItem("bible-theme", "amoled");
      window.dispatchEvent(new StorageEvent("storage", { key: "bible-theme" }));
    });
    expect(result.current.theme).toBe("amoled");
  });
});
