import { describe, it, expect } from "vitest";
import {
  BIBLE_BOOKS,
  OLD_TESTAMENT_BOOK_COUNT,
  booksForTestament,
  findBookByName,
  getTestament,
} from "../books";

describe("BIBLE_BOOKS", () => {
  it("has the 66 canonical books in order", () => {
    expect(BIBLE_BOOKS).toHaveLength(66);
    expect(BIBLE_BOOKS[0].name).toBe("Genesis");
    expect(BIBLE_BOOKS[38].name).toBe("Malachi");
    expect(BIBLE_BOOKS[39].name).toBe("Matthew");
    expect(BIBLE_BOOKS[65].name).toBe("Revelation");
  });

  it("has the well-known total of 1189 chapters", () => {
    const total = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);
    expect(total).toBe(1189);
  });

  it("has unique names and every field filled in", () => {
    const names = new Set(BIBLE_BOOKS.map((b) => b.name));
    expect(names.size).toBe(66);
    for (const b of BIBLE_BOOKS) {
      expect(b.amharic).toBeTruthy();
      expect(b.abbr).toBeTruthy();
      expect(b.abbrEnglish).toBeTruthy();
      expect(b.chapters).toBeGreaterThan(0);
    }
  });
});

describe("testaments", () => {
  it("splits at the Old Testament boundary", () => {
    expect(OLD_TESTAMENT_BOOK_COUNT).toBe(39);
    expect(getTestament({ name: "Genesis" })).toBe("old");
    expect(getTestament({ name: "Malachi" })).toBe("old");
    expect(getTestament({ name: "Matthew" })).toBe("new");
    expect(getTestament({ name: "Revelation" })).toBe("new");
  });

  it("returns the right slices", () => {
    expect(booksForTestament("old")).toHaveLength(39);
    expect(booksForTestament("new")).toHaveLength(27);
    expect(booksForTestament("new")[0].name).toBe("Matthew");
  });
});

describe("findBookByName", () => {
  it("finds a book by its English name", () => {
    expect(findBookByName("Exodus")?.chapters).toBe(40);
  });
  it("returns undefined for unknown or missing names", () => {
    expect(findBookByName("Nope")).toBeUndefined();
    expect(findBookByName(undefined)).toBeUndefined();
  });
});
