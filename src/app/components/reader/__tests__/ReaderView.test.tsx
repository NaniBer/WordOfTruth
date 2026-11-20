import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReaderView } from "../ReaderView";
import { THEMES } from "@/app/constants/themes";
import { BIBLE_BOOKS } from "@/app/constants/books";

const base = {
  t: THEMES.warm,
  book: BIBLE_BOOKS[0],
  englishVersion: "niv" as const,
  setEnglishVersion: vi.fn(),
  fontSize: "text-[17px]",
  selectedVerse: null,
  selectionMode: false,
  checkedVerses: [] as number[],
  onTapVerse: vi.fn(),
  getHighlightIdx: () => null,
  onHighlight: vi.fn(),
  onCopy: vi.fn(),
};

const rowOf = (n: number) => document.querySelector(`[data-verse-num="${n}"]`) as HTMLElement;

describe("ReaderView", () => {
  it("renders one row per non-empty verse and skips placeholders", () => {
    render(
      <ReaderView {...base} translationView="amharic" verses={["one", "", "-", "four"]} englishVerses={[]} />,
    );
    expect(rowOf(1)).not.toBeNull();
    expect(rowOf(2)).toBeNull();
    expect(rowOf(3)).toBeNull();
    expect(rowOf(4)).not.toBeNull();
  });

  it("labels Amharic verses with ranges when placeholders follow (1-3)", () => {
    render(<ReaderView {...base} translationView="amharic" verses={["a", "", "", "d"]} englishVerses={[]} />);
    expect(rowOf(1).querySelector(".verse-number")?.textContent).toBe("1-3");
    expect(rowOf(4).querySelector(".verse-number")?.textContent).toBe("4");
  });

  it("labels English verses with their plain number even after placeholders", () => {
    render(<ReaderView {...base} translationView="english" verses={[]} englishVerses={["a", "", "", "d"]} />);
    expect(rowOf(1).querySelector(".verse-number")?.textContent).toBe("1");
    expect(rowOf(4).querySelector(".verse-number")?.textContent).toBe("4");
  });

  it("shows the English column with its version picker in side-by-side view", () => {
    render(<ReaderView {...base} translationView="both" verses={["am"]} englishVerses={["en"]} />);
    expect(screen.getByText("Gen")).toBeInTheDocument();
    expect(screen.getByText("NIV")).toBeInTheDocument();
    expect(screen.getByText("am")).toBeInTheDocument();
    expect(screen.getByText("en")).toBeInTheDocument();
  });

  it("sends a tap on a verse to onTapVerse with its number", () => {
    const onTapVerse = vi.fn();
    render(<ReaderView {...base} onTapVerse={onTapVerse} translationView="amharic" verses={["a", "b"]} englishVerses={[]} />);
    fireEvent.click(rowOf(2));
    expect(onTapVerse).toHaveBeenCalledWith(2);
  });

  it("opens the action panel only for the single selected verse, outside selection mode", () => {
    render(<ReaderView {...base} selectedVerse={2} translationView="amharic" verses={["a", "b"]} englishVerses={[]} />);
    expect(screen.getAllByRole("button", { name: "Copy" })).toHaveLength(1);
    expect(rowOf(2).textContent).toContain("Copy");
    expect(rowOf(1).textContent).not.toContain("Copy");
  });

  it("shows checkboxes and no action panel while several verses are selected", () => {
    render(
      <ReaderView
        {...base}
        selectedVerse={null}
        selectionMode
        checkedVerses={[2]}
        translationView="amharic"
        verses={["a", "b"]}
        englishVerses={[]}
      />,
    );
    expect(screen.queryByRole("button", { name: "Copy" })).not.toBeInTheDocument();
    expect(rowOf(2).querySelector("svg")).not.toBeNull(); // checked mark
    expect(rowOf(1).querySelector("svg")).toBeNull();
  });
});
