import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";
import { THEMES } from "@/app/constants/themes";
import { BIBLE_BOOKS } from "@/app/constants/books";

const genesis = BIBLE_BOOKS[0];

function setup(overrides: Partial<Parameters<typeof Header>[0]> = {}) {
  const props = {
    t: THEMES.warm,
    selectedBook: genesis,
    chapter: 3,
    translationView: "amharic" as const,
    setTranslationView: vi.fn(),
    setShowBookPicker: vi.fn(),
    englishVersion: "niv" as const,
    setEnglishVersion: vi.fn(),
    amharicVersion: "amharic_bible" as const,
    setAmharicVersion: vi.fn(),
    onSearchClick: vi.fn(),
    onPrevChapter: vi.fn(),
    onNextChapter: vi.fn(),
    hasPrevChapter: true,
    hasNextChapter: true,
    ...overrides,
  };
  render(<Header {...props} />);
  return props;
}

describe("Header", () => {
  it("shows the book abbreviation and chapter", () => {
    setup();
    expect(screen.getByText("ዘፍ")).toBeInTheDocument();
    expect(screen.getByText("Ch. 3 / 50")).toBeInTheDocument();
  });

  it("uses the English abbreviation in English view", () => {
    setup({ translationView: "english" });
    expect(screen.getByText("Gen")).toBeInTheDocument();
  });

  it("calls the chapter handlers", () => {
    const props = setup();
    fireEvent.click(screen.getByRole("button", { name: "Prev" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(props.onPrevChapter).toHaveBeenCalledTimes(1);
    expect(props.onNextChapter).toHaveBeenCalledTimes(1);
  });

  it("disables Prev and Next at the ends of the Bible", () => {
    setup({ hasPrevChapter: false, hasNextChapter: false });
    expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("opens the book picker from the book label", () => {
    const props = setup();
    fireEvent.click(screen.getByText("ዘፍ"));
    expect(props.setShowBookPicker).toHaveBeenCalledWith(true);
  });

  it("calls onSearchClick from the search button", () => {
    const props = setup();
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(props.onSearchClick).toHaveBeenCalled();
  });

  it("switches the language view", () => {
    const props = setup();
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(props.setTranslationView).toHaveBeenCalledWith("english");
  });

  it("shows the English version picker only for English and both views", () => {
    setup({ translationView: "amharic" });
    expect(screen.queryByText("NIV")).not.toBeInTheDocument();
    expect(screen.getByText("Amh 1954")).toBeInTheDocument();
  });

  it("shows both version pickers in the combined view", () => {
    setup({ translationView: "both" });
    expect(screen.getByText("NIV")).toBeInTheDocument();
    expect(screen.getByText("Amh 1954")).toBeInTheDocument();
  });
});
