import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchModal } from "../SearchModal";
import { THEMES } from "@/app/constants/themes";

// Genesis (book 1) is the only book with data in this test: its Amharic verses mention the word we search for.
function bookFile(verses: string[]) {
  return { ok: true, json: async () => ({ chapters: [{ chapter: "1", verses }] }) };
}

const props = (over: Partial<Parameters<typeof SearchModal>[0]> = {}) => ({
  t: THEMES.warm,
  onClose: vi.fn(),
  onSelectResult: vi.fn(),
  translationView: "amharic" as const,
  amharicVersion: "amharic_bible" as const,
  englishVersion: "niv" as const,
  ...over,
});

describe("SearchModal", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url === "/data/amharic_bible/1.json") {
          return bookFile(["በመጀመሪያ እግዚአብሔር", "ምድርም ነበረች", "እግዚአብሔርም አለ"]);
        }
        if (url === "/data/english/niv/1.json") {
          return { ok: true, json: async () => ({ chapters: [{ chapter: "1", verses: ["In the beginning God", "earth", "God said"] }] }) };
        }
        return { ok: false, json: async () => ({}) };
      }),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it("focuses the search field when it opens", () => {
    render(<SearchModal {...props()} />);
    expect(screen.getByPlaceholderText("Search verses...")).toHaveFocus();
  });

  it("shows the idle hint before anything is typed", () => {
    render(<SearchModal {...props()} />);
    expect(screen.getByText("Type to search")).toBeInTheDocument();
  });

  it("finds matching verses after the debounce and reports the count", async () => {
    render(<SearchModal {...props()} />);
    fireEvent.change(screen.getByPlaceholderText("Search verses..."), { target: { value: "እግዚአብሔር" } });
    await waitFor(() => expect(screen.getByText("2 results")).toBeInTheDocument());
    expect(screen.getByText("Genesis 1:1")).toBeInTheDocument();
    expect(screen.getByText("Genesis 1:3")).toBeInTheDocument();
  });

  it("uses the English text when the view is English", async () => {
    render(<SearchModal {...props({ translationView: "english" })} />);
    fireEvent.change(screen.getByPlaceholderText("Search verses..."), { target: { value: "god" } });
    await waitFor(() => expect(screen.getByText("2 results")).toBeInTheDocument());
  });

  it("says so when nothing matches", async () => {
    render(<SearchModal {...props()} />);
    fireEvent.change(screen.getByPlaceholderText("Search verses..."), { target: { value: "zzzz" } });
    await waitFor(() => expect(screen.getByText("No results found")).toBeInTheDocument());
  });

  it("is case-insensitive for English text", async () => {
    render(<SearchModal {...props({ translationView: "english" })} />);
    fireEvent.change(screen.getByPlaceholderText("Search verses..."), { target: { value: "EARTH" } });
    await waitFor(() => expect(screen.getByText("1 result")).toBeInTheDocument());
  });

  it("jumps to a result and closes", async () => {
    const p = props();
    render(<SearchModal {...p} />);
    fireEvent.change(screen.getByPlaceholderText("Search verses..."), { target: { value: "ምድርም" } });
    await waitFor(() => expect(screen.getByText("Genesis 1:2")).toBeInTheDocument());
    fireEvent.click(screen.getByText("Genesis 1:2"));
    expect(p.onSelectResult).toHaveBeenCalledWith(expect.objectContaining({ name: "Genesis" }), 1, 2);
    expect(p.onClose).toHaveBeenCalled();
  });

  it("does not treat regex characters in the query as patterns", async () => {
    render(<SearchModal {...props({ translationView: "english" })} />);
    fireEvent.change(screen.getByPlaceholderText("Search verses..."), { target: { value: "g.d" } });
    await waitFor(() => expect(screen.getByText("No results found")).toBeInTheDocument());
  });

  it("clears results when the query is emptied", async () => {
    render(<SearchModal {...props()} />);
    const input = screen.getByPlaceholderText("Search verses...");
    fireEvent.change(input, { target: { value: "እግዚአብሔር" } });
    await waitFor(() => expect(screen.getByText("2 results")).toBeInTheDocument());
    fireEvent.change(input, { target: { value: "   " } });
    await waitFor(() => expect(screen.getByText("Type to search")).toBeInTheDocument());
  });

  it("closes from the X button", () => {
    const p = props();
    render(<SearchModal {...p} />);
    const header = screen.getByText("Search").parentElement as HTMLElement;
    fireEvent.click(header.querySelector("button") as HTMLButtonElement);
    expect(p.onClose).toHaveBeenCalled();
  });
});
