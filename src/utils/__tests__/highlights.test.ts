import { describe, it, expect, beforeEach } from "vitest";
import {
  HIGHLIGHT_STORAGE_KEY,
  addHighlight,
  createHighlightData,
  getAllHighlights,
  getHighlightColorIdx,
  getHighlightId,
  loadHighlights,
  removeHighlightById,
  type HighlightsMap,
} from "../highlights";

const stored = () => JSON.parse(localStorage.getItem(HIGHLIGHT_STORAGE_KEY) || "{}") as HighlightsMap;

describe("getHighlightId", () => {
  it("lowercases the book and joins chapter and verse", () => {
    expect(getHighlightId("Genesis", 1, 5)).toBe("genesis-1-5");
    expect(getHighlightId("1 Samuel", 10, 15)).toBe("1 samuel-10-15");
  });
});

describe("addHighlight / removeHighlightById", () => {
  it("adds a highlight, persists it, and returns the new map", () => {
    const map = addHighlight({}, "Genesis", "ኦሪት ዘፍጥረት", 1, 1, 2, "amh", "eng");
    expect(map["genesis-1-1"]).toMatchObject({ colorIdx: 2, chapter: 1, verse: 1, amharic: "amh", english: "eng" });
    expect(stored()["genesis-1-1"].colorIdx).toBe(2);
  });

  it("replaces an existing highlight on the same verse instead of duplicating it", () => {
    let map = addHighlight({}, "Genesis", "x", 1, 1, 0, "a", "e");
    map = addHighlight(map, "Genesis", "x", 1, 1, 1, "a", "e");
    expect(Object.keys(map)).toHaveLength(1);
    expect(map["genesis-1-1"].colorIdx).toBe(1);
  });

  it("removes a highlight by id and persists the removal", () => {
    let map = addHighlight({}, "Genesis", "x", 1, 1, 0, "a", "e");
    map = addHighlight(map, "Genesis", "x", 1, 2, 0, "a", "e");
    map = removeHighlightById(map, "genesis-1-1");
    expect(Object.keys(map)).toEqual(["genesis-1-2"]);
    expect(Object.keys(stored())).toEqual(["genesis-1-2"]);
  });

  it("does not mutate the map it was given", () => {
    const original = addHighlight({}, "Genesis", "x", 1, 1, 0, "a", "e");
    const copy = { ...original };
    removeHighlightById(original, "genesis-1-1");
    expect(original).toEqual(copy);
  });
});

describe("getHighlightColorIdx", () => {
  it("returns the color index, or null when the verse is not highlighted", () => {
    const map = addHighlight({}, "Exodus", "x", 2, 3, 1, "a", "e");
    expect(getHighlightColorIdx(map, "Exodus", 2, 3)).toBe(1);
    expect(getHighlightColorIdx(map, "Exodus", 2, 4)).toBeNull();
  });
});

describe("getAllHighlights", () => {
  it("sorts newest first", () => {
    const older = { ...createHighlightData(0, "G", "g", 1, 1, "a", "e"), timestamp: 100 };
    const newer = { ...createHighlightData(0, "G", "g", 1, 2, "a", "e"), timestamp: 300 };
    const middle = { ...createHighlightData(0, "G", "g", 1, 3, "a", "e"), timestamp: 200 };
    const list = getAllHighlights({ a: older, b: newer, c: middle });
    expect(list.map((h) => h.timestamp)).toEqual([300, 200, 100]);
  });
});

describe("loadHighlights", () => {
  beforeEach(() => localStorage.clear());

  it("returns an empty map when nothing is stored", () => {
    expect(loadHighlights()).toEqual({});
  });

  it("returns an empty map for corrupt JSON instead of throwing", () => {
    localStorage.setItem(HIGHLIGHT_STORAGE_KEY, "{not json");
    expect(loadHighlights()).toEqual({});
  });

  it("migrates v2 highlights (hex colors) to v3 color indexes", () => {
    const v2 = {
      "genesis-1-1": { color: "#6366f1", bookName: "Genesis", bookAmharic: "x", chapter: 1, verse: 1, amharic: "a", english: "e", timestamp: 1 },
      "genesis-1-2": { color: "#f59e0b", bookName: "Genesis", bookAmharic: "x", chapter: 1, verse: 2, amharic: "a", english: "e", timestamp: 2 },
      "genesis-1-3": { color: "#2d6a4f", bookName: "Genesis", bookAmharic: "x", chapter: 1, verse: 3, amharic: "a", english: "e", timestamp: 3 },
      "genesis-1-4": { color: "#ff00ff", bookName: "Genesis", bookAmharic: "x", chapter: 1, verse: 4, amharic: "a", english: "e", timestamp: 4 },
    };
    localStorage.setItem("bible-highlights-v2", JSON.stringify(v2));
    const map = loadHighlights();
    expect(map["genesis-1-1"].colorIdx).toBe(0); // blue -> Faith
    expect(map["genesis-1-2"].colorIdx).toBe(1); // amber -> Hope
    expect(map["genesis-1-3"].colorIdx).toBe(2); // green -> Love
    expect(map["genesis-1-4"].colorIdx).toBe(0); // unknown color falls back to 0
    expect(map["genesis-1-1"]).not.toHaveProperty("color");
    // and the migrated data is written under the v3 key
    expect(Object.keys(stored())).toHaveLength(4);
  });
});
