import { describe, it, expect } from "vitest";
import { THEMES, THEME_STORAGE_KEY, type Theme } from "../themes";

const keys = Object.keys(THEMES) as Theme[];

describe("themes", () => {
  it("defines the five reading themes", () => {
    expect(keys.sort()).toEqual(["amoled", "dark", "midnight", "ocean", "warm"]);
  });

  it("gives every theme three highlight colors and backgrounds", () => {
    for (const k of keys) {
      expect(THEMES[k].highlightColors).toHaveLength(3);
      expect(THEMES[k].highlightBg).toHaveLength(3);
    }
  });

  it("uses a gray drag handle on the light warm theme only", () => {
    expect(THEMES.warm.handle).toBe("bg-gray-300");
    for (const k of keys.filter((k) => k !== "warm")) {
      expect(THEMES[k].handle).toBe("bg-white/20");
    }
  });

  it("has a stored key that the early layout script also reads", () => {
    expect(THEME_STORAGE_KEY).toBe("bible-theme");
  });
});
