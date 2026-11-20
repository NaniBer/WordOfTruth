import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookPicker } from "../BookPicker";
import { ChapterPickerSheet } from "../ChapterPickerSheet";
import { THEMES } from "@/app/constants/themes";
import { BIBLE_BOOKS } from "@/app/constants/books";

const exodus = BIBLE_BOOKS[1];
const matthew = BIBLE_BOOKS[39];

describe("BookPicker", () => {
  it("opens on the testament of the current book", () => {
    render(<BookPicker t={THEMES.warm} selectedBook={matthew} translationView="english" onSelectBook={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole("button", { name: /^Matthew\b/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Genesis\b/ })).not.toBeInTheDocument();
  });

  it("switches testaments with the tabs", () => {
    render(<BookPicker t={THEMES.warm} selectedBook={exodus} translationView="english" onSelectBook={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole("button", { name: /^Exodus\b/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "New Testament" }));
    expect(screen.getByRole("button", { name: /^Matthew\b/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Exodus\b/ })).not.toBeInTheDocument();
  });

  it("reports the chosen book", () => {
    const onSelectBook = vi.fn();
    render(<BookPicker t={THEMES.warm} selectedBook={exodus} translationView="english" onSelectBook={onSelectBook} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /^Leviticus\b/ }));
    expect(onSelectBook).toHaveBeenCalledWith(expect.objectContaining({ name: "Leviticus" }));
  });

  it("shows Amharic names in the Amharic view", () => {
    render(<BookPicker t={THEMES.warm} selectedBook={exodus} translationView="amharic" onSelectBook={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole("button", { name: /ኦሪት ዘጸአት/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Exodus\b/ })).not.toBeInTheDocument();
  });

  it("closes from the X button", () => {
    const onClose = vi.fn();
    render(<BookPicker t={THEMES.warm} selectedBook={exodus} translationView="english" onSelectBook={vi.fn()} onClose={onClose} />);
    const header = screen.getByText("Select Book").parentElement as HTMLElement;
    fireEvent.click(header.querySelector("button") as HTMLButtonElement);
    expect(onClose).toHaveBeenCalled();
  });
});

describe("ChapterPickerSheet", () => {
  const exodusBook = BIBLE_BOOKS[1]; // 40 chapters

  it("lists every chapter of the book and marks the current one", () => {
    render(<ChapterPickerSheet t={THEMES.warm} book={exodusBook} chapter={7} translationView="english" onSelectChapter={vi.fn()} onBack={vi.fn()} onDone={vi.fn()} />);
    expect(screen.getByRole("button", { name: "40" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "41" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "7" }).className).toContain(THEMES.warm.buttonBg);
  });

  it("reports the chapter that was clicked", () => {
    const onSelectChapter = vi.fn();
    render(<ChapterPickerSheet t={THEMES.warm} book={exodusBook} chapter={1} translationView="english" onSelectChapter={onSelectChapter} onBack={vi.fn()} onDone={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "12" }));
    expect(onSelectChapter).toHaveBeenCalledWith(12);
  });

  it("separates Back (return to books) from Done (close everything)", () => {
    const onBack = vi.fn();
    const onDone = vi.fn();
    render(<ChapterPickerSheet t={THEMES.warm} book={exodusBook} chapter={1} translationView="english" onSelectChapter={vi.fn()} onBack={onBack} onDone={onDone} />);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onDone).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
