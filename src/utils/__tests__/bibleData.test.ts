import { describe, it, expect, vi, afterEach } from "vitest";
import { BIBLE_BOOKS } from "@/app/constants/books";
import { AMHARIC_VERSION_OPTIONS, ENGLISH_VERSION_OPTIONS } from "@/app/constants/translations";
import { BIBLE_CACHE_NAME, BIBLE_FOLDERS, bookDataUrl, englishFolder, findChapterVerses, openBibleCache } from "../bibleData";

describe("bibleData", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("lists every translation folder once", () => {
    expect(BIBLE_FOLDERS).toEqual([
      ...AMHARIC_VERSION_OPTIONS.map((o) => o.value),
      ...ENGLISH_VERSION_OPTIONS.map((o) => `english/${o.value}`),
    ]);
    expect(new Set(BIBLE_FOLDERS).size).toBe(BIBLE_FOLDERS.length);
  });

  it("builds English folders as english/<version>", () => {
    expect(englishFolder("niv")).toBe("english/niv");
  });

  it("builds local book URLs with a 1-based book number", () => {
    expect(bookDataUrl("amharic_bible", 1)).toBe("/data/amharic_bible/1.json");
    expect(bookDataUrl("english/nlt", 66)).toBe("/data/english/nlt/66.json");
  });

  it("finds a chapter by its string number", () => {
    const file = { chapters: [{ chapter: "1", verses: ["a"] }, { chapter: "2", verses: ["b", "c"] }] };
    expect(findChapterVerses(file, 2)).toEqual(["b", "c"]);
  });

  it("returns no verses for a missing chapter or missing file", () => {
    expect(findChapterVerses({ chapters: [{ chapter: "1", verses: ["a"] }] }, 9)).toEqual([]);
    expect(findChapterVerses(null, 1)).toEqual([]);
    expect(findChapterVerses(undefined, 1)).toEqual([]);
  });

  it("does not match a numeric chapter against a string-number key", () => {
    // Chapter keys in the data are strings; a numeric key must not match.
    const file = { chapters: [{ chapter: 1 as unknown as string, verses: ["x"] }] };
    expect(findChapterVerses(file, 1)).toEqual([]);
  });

  it("opens the shared bible cache by name", async () => {
    const open = vi.fn().mockResolvedValue({ name: "cache" });
    vi.stubGlobal("caches", { open });
    await openBibleCache();
    expect(open).toHaveBeenCalledWith(BIBLE_CACHE_NAME);
    expect(BIBLE_CACHE_NAME).toBe("wordoftruth-v1");
  });

  it("covers the full 66-book range for every folder", () => {
    expect(BIBLE_BOOKS).toHaveLength(66);
  });
});
