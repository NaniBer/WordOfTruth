import { describe, it, expect, beforeEach } from "vitest";
import { loadLastLocation, parseLastLocation, saveLastLocation } from "../lastLocation";
import { loadViewSettings, sanitizeViewSettings, saveViewSettings } from "../viewSettings";

describe("last location", () => {
  beforeEach(() => localStorage.clear());

  it("round-trips a saved location", () => {
    saveLastLocation("Psalms", 23);
    expect(loadLastLocation()).toEqual({ bookName: "Psalms", chapter: 23 });
  });

  it("returns null when nothing is stored or the JSON is broken", () => {
    expect(loadLastLocation()).toBeNull();
    localStorage.setItem("bible-last-location", "{oops");
    expect(loadLastLocation()).toBeNull();
  });

  it("rejects values with the wrong shape", () => {
    expect(parseLastLocation(null)).toBeNull();
    expect(parseLastLocation("Genesis")).toBeNull();
    expect(parseLastLocation({ bookName: 1, chapter: 1 })).toBeNull();
    expect(parseLastLocation({ bookName: "Genesis", chapter: "2" })).toBeNull();
    expect(parseLastLocation({ bookName: "Genesis", chapter: 0 })).toBeNull();
    expect(parseLastLocation({ bookName: "Genesis", chapter: 2.5 })).toBeNull();
    expect(parseLastLocation({ bookName: "Genesis", chapter: 2, extra: true })).toEqual({ bookName: "Genesis", chapter: 2 });
  });
});

describe("view settings", () => {
  beforeEach(() => localStorage.clear());

  it("uses defaults when nothing is stored", () => {
    expect(loadViewSettings()).toEqual({
      translationView: "amharic",
      englishVersion: "niv",
      amharicVersion: "amharic_bible",
      fontSizeIdx: 1,
    });
  });

  it("merges a partial save over the defaults", () => {
    saveViewSettings({ translationView: "both" });
    saveViewSettings({ fontSizeIdx: 3 });
    expect(loadViewSettings()).toMatchObject({ translationView: "both", fontSizeIdx: 3, englishVersion: "niv" });
  });

  it("replaces unknown option values with the default", () => {
    expect(
      sanitizeViewSettings({ translationView: "klingon", englishVersion: "kjv", amharicVersion: "x", fontSizeIdx: 1 }),
    ).toEqual({ translationView: "amharic", englishVersion: "niv", amharicVersion: "amharic_bible", fontSizeIdx: 1 });
  });

  it("clamps the font size into range and rejects non-integers", () => {
    expect(sanitizeViewSettings({ fontSizeIdx: 99 }).fontSizeIdx).toBe(3);
    expect(sanitizeViewSettings({ fontSizeIdx: -4 }).fontSizeIdx).toBe(0);
    expect(sanitizeViewSettings({ fontSizeIdx: "2" }).fontSizeIdx).toBe(1);
  });

  it("falls back to defaults for corrupt storage or non-object JSON", () => {
    localStorage.setItem("bible-view-settings", "{bad");
    expect(loadViewSettings().translationView).toBe("amharic");
    localStorage.setItem("bible-view-settings", "42");
    expect(loadViewSettings().translationView).toBe("amharic");
  });
});
