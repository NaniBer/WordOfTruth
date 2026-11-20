import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import Home from "../page";
import { BIBLE_CACHE_NAME } from "@/utils/bibleData";
import { HIGHLIGHT_STORAGE_KEY } from "@/utils/highlights";

/**
 * Integration tests for the reader. The network serves a small set of book files
 * and the (empty) offline cache forces every chapter through the network path.
 */

const bookFiles: Record<string, Record<string, string[]>> = {
  "/data/amharic_bible/1.json": { "1": ["am G1:1", "am G1:2", "", "am G1:4"], "50": ["am G50:1"] },
  "/data/english/niv/1.json": { "1": ["en G1:1", "en G1:2", "", "en G1:4"], "50": ["en G50:1"] },
  "/data/amharic_bible/2.json": { "1": ["am E1:1"] },
  "/data/english/niv/2.json": { "1": ["en E1:1"] },
};

function bookResponse(url: string) {
  const chapters = bookFiles[url];
  if (!chapters) return { ok: false, json: async () => ({}) };
  return {
    ok: true,
    json: async () => ({
      chapters: Object.entries(chapters).map(([chapter, verses]) => ({ chapter, verses })),
    }),
    clone() {
      return this;
    },
  };
}

function setLocation(bookName: string, chapter: number) {
  localStorage.setItem("bible-last-location", JSON.stringify({ bookName, chapter }));
}

const verseNum = (n: number) => document.querySelector(`[data-verse-num="${n}"]`) as HTMLElement | null;
const chapterLabel = () => screen.getByText(/^Ch\. \d+ \/ \d+$/).textContent;

describe("reader (page)", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => bookResponse(url)));
    vi.stubGlobal("caches", {
      open: vi.fn(async (name: string) => (name === BIBLE_CACHE_NAME ? { match: async () => undefined, put: async () => {} } : undefined)),
    });
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens at the saved location and renders its verses, skipping empty ones", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)).not.toBeNull());
    expect(verseNum(1)?.textContent).toContain("am G1:1");
    expect(verseNum(3)).toBeNull(); // empty verse is not shown
    expect(verseNum(4)?.textContent).toContain("am G1:4");
    expect(chapterLabel()).toBe("Ch. 1 / 50");
  });

  it("falls back to Genesis 1 when the saved location is out of range", async () => {
    setLocation("Genesis", 99);
    render(<Home />);
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 1 / 50"));
  });

  it("moves from the last chapter of a book into the next book (Genesis 50 -> Exodus 1)", async () => {
    setLocation("Genesis", 50);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)?.textContent).toContain("am G50:1"));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(verseNum(1)?.textContent).toContain("am E1:1"));
    expect(chapterLabel()).toBe("Ch. 1 / 40");
    expect(screen.getByText("ዘጸ")).toBeInTheDocument();
  });

  it("goes back from Exodus 1 to the last chapter of Genesis", async () => {
    setLocation("Exodus", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)?.textContent).toContain("am E1:1"));
    fireEvent.click(screen.getByRole("button", { name: "Prev" }));
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 50 / 50"));
  });

  it("backing out of a book keeps the current chapter (regression: picking a book moved the reader)", async () => {
    setLocation("Genesis", 50);
    render(<Home />);
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 50 / 50"));
    fireEvent.click(screen.getByText("ዘፍ"));
    fireEvent.click(screen.getByRole("button", { name: /ዘጸአት/ })); // Exodus has 40 chapters
    expect(screen.getByText("Back", { exact: true })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(chapterLabel()).toBe("Ch. 50 / 50");
    expect(screen.getByText("ዘፍ")).toBeInTheDocument();
  });

  it("picking a chapter in another book moves there", async () => {
    setLocation("Genesis", 50);
    render(<Home />);
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 50 / 50"));
    fireEvent.click(screen.getByText("ዘፍ"));
    fireEvent.click(screen.getByRole("button", { name: /ዘጸአት/ }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 2 / 40"));
    expect(screen.getByText("ዘጸ")).toBeInTheDocument();
  });

  it("disables Prev at Genesis 1", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 1 / 50"));
    expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
  });

  it("saves a highlight, shows it on the verse and in Saved, and clears it from the saved list", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)).not.toBeNull());

    fireEvent.click(verseNum(1)!);
    const colorButtons = verseNum(1)!.querySelectorAll("button");
    fireEvent.click(colorButtons[1]); // second color (Hope)

    const stored = JSON.parse(localStorage.getItem(HIGHLIGHT_STORAGE_KEY)!);
    expect(stored["genesis-1-1"]).toMatchObject({ colorIdx: 1, amharic: "am G1:1", english: "en G1:1" });

    fireEvent.click(screen.getByRole("button", { name: "Saved" }));
    expect(screen.getByText("Saved Verses (1)")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.getByText("Saved Verses (0)")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(HIGHLIGHT_STORAGE_KEY)!)).toEqual({});
  });

  it("copies several selected verses in chapter order, with a count toast", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)).not.toBeNull());

    fireEvent.click(verseNum(4)!);
    fireEvent.click(verseNum(1)!);
    expect(screen.getByText("2 selected")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const text = writeText.mock.calls[0][0] as string;
    expect(text.indexOf("Genesis 1:1")).toBeLessThan(text.indexOf("Genesis 1:4"));
    expect(text).toContain("en G1:4");
    expect(text).not.toContain("Genesis 1:2");
    expect(await screen.findByText("Copied 2 verses")).toBeInTheDocument();
  });

  it("copies a single verse from the action panel", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(2)).not.toBeNull());
    fireEvent.click(verseNum(2)!);
    fireEvent.click(within(verseNum(2)!).getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0][0]).toContain("Genesis 1:2");
  });

  it("clears the selection when the chapter changes", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)).not.toBeNull());
    fireEvent.click(verseNum(1)!);
    expect(screen.getByText("1 selected")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(chapterLabel()).toBe("Ch. 2 / 50"));
    expect(screen.queryByText(/selected$/)).not.toBeInTheDocument();
  });

  it("tapping a selected verse again removes it from the selection", async () => {
    setLocation("Genesis", 1);
    render(<Home />);
    await waitFor(() => expect(verseNum(1)).not.toBeNull());
    fireEvent.click(verseNum(1)!);
    fireEvent.click(verseNum(2)!);
    expect(screen.getByText("2 selected")).toBeInTheDocument();
    fireEvent.click(verseNum(2)!);
    expect(screen.queryByText("2 selected")).not.toBeInTheDocument();
    expect(screen.getByText("1 selected")).toBeInTheDocument();
  });

  it("persists the chosen theme across a fresh render", async () => {
    setLocation("Genesis", 1);
    const { unmount } = render(<Home />);
    await waitFor(() => expect(verseNum(1)).not.toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("button", { name: /Midnight$/ }));
    expect(localStorage.getItem("bible-theme")).toBe("midnight");
    unmount();
    render(<Home />);
    await waitFor(() => expect(document.documentElement.style.getPropertyValue("--theme-bg")).toBe("#030712"));
  });
});
