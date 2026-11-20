import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SavedVersesView } from "../saved/SavedVerses";
import { SettingsView } from "../Settings";
import { FeatureSuggestionModal } from "../FeatureSuggestionModal";
import { THEMES } from "@/app/constants/themes";
import { FONT_SIZES } from "@/app/constants/fonts";
import { addHighlight } from "@/utils/highlights";

describe("SavedVersesView", () => {
  it("shows an empty state", () => {
    render(<SavedVersesView highlights={{}} t={THEMES.warm} onOpenVerse={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText("Saved Verses (0)")).toBeInTheDocument();
    expect(screen.getByText("No saved verses yet")).toBeInTheDocument();
  });

  it("lists the newest highlight first and opens a verse with its book, chapter and number", () => {
    let map = addHighlight({}, "Genesis", "ኦሪት ዘፍጥረት", 1, 1, 0, "am one", "en one");
    map = addHighlight(map, "Exodus", "ኦሪት ዘጸአት", 2, 5, 1, "am two", "");
    // Force a clear ordering regardless of clock resolution.
    map["genesis-1-1"].timestamp = 1;
    map["exodus-2-5"].timestamp = 2;
    const onOpenVerse = vi.fn();
    render(<SavedVersesView highlights={map} t={THEMES.warm} onOpenVerse={onOpenVerse} onRemove={vi.fn()} />);

    const headings = screen.getAllByText(/ኦሪት/).map((el) => el.textContent);
    expect(headings[0]).toBe("ኦሪት ዘጸአት 2:5");
    fireEvent.click(screen.getByText("ኦሪት ዘጸአት 2:5"));
    expect(onOpenVerse).toHaveBeenCalledWith(expect.objectContaining({ name: "Exodus" }), 2, 5);
  });

  it("removes a saved verse by its id", () => {
    const map = addHighlight({}, "Genesis", "ኦሪት ዘፍጥረት", 1, 1, 0, "a", "e");
    const onRemove = vi.fn();
    render(<SavedVersesView highlights={map} t={THEMES.warm} onOpenVerse={vi.fn()} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).toHaveBeenCalledWith("genesis-1-1");
  });
});

function settingsProps(overrides: Partial<Parameters<typeof SettingsView>[0]> = {}) {
  return {
    theme: "warm" as const,
    setTheme: vi.fn(),
    fontSizeIdx: 1,
    setFontSizeIdx: vi.fn(),
    isOnline: true,
    isCached: false,
    onCacheBibleData: vi.fn(),
    onCheckUpdates: vi.fn(),
    t: THEMES.warm,
    ...overrides,
  };
}

describe("SettingsView", () => {
  it("changes the theme from the theme grid", () => {
    const props = settingsProps();
    render(<SettingsView {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /Ocean$/ }));
    expect(props.setTheme).toHaveBeenCalledWith("ocean");
  });

  it("steps the font size down and up, and stops at the ends", () => {
    const props = settingsProps({ fontSizeIdx: 0 });
    render(<SettingsView {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "−" }));
    expect(props.setFontSizeIdx).toHaveBeenCalledWith(0); // already smallest
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(props.setFontSizeIdx).toHaveBeenLastCalledWith(1);
  });

  it("selects a size directly", () => {
    const props = settingsProps();
    render(<SettingsView {...props} />);
    fireEvent.click(screen.getByRole("button", { name: FONT_SIZES[3].label }));
    expect(props.setFontSizeIdx).toHaveBeenCalledWith(3);
  });

  it("offers caching when nothing is cached, and re-caching when it is", () => {
    const { unmount } = render(<SettingsView {...settingsProps({ isCached: false })} />);
    expect(screen.getByRole("button", { name: "Cache All Bible Data" })).toBeInTheDocument();
    unmount();
    render(<SettingsView {...settingsProps({ isCached: true })} />);
    expect(screen.getByRole("button", { name: "Re-cache Bible Data" })).toBeInTheDocument();
  });

  it("disables caching and update checks while offline", () => {
    render(<SettingsView {...settingsProps({ isOnline: false })} />);
    expect(screen.getByRole("button", { name: "Cache All Bible Data" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Check for Updates" })).toBeDisabled();
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });

  it("shows iOS install steps on iPhone", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)");
    render(<SettingsView {...settingsProps()} />);
    expect(screen.getByText(/Add to Home Screen/)).toBeInTheDocument();
  });

  it("opens the feature suggestion form", () => {
    render(<SettingsView {...settingsProps()} />);
    expect(screen.queryByPlaceholderText("Describe your feature idea...")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Suggest a Feature" }));
    expect(screen.getByPlaceholderText("Describe your feature idea...")).toBeInTheDocument();
  });
});

describe("FeatureSuggestionModal", () => {
  it("does nothing when the message is blank", () => {
    const onClose = vi.fn();
    render(<FeatureSuggestionModal t={THEMES.warm} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Send Suggestion" }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on cancel", () => {
    const onClose = vi.fn();
    render(<FeatureSuggestionModal t={THEMES.warm} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("opens a mail draft with the message in the body and closes", () => {
    const onClose = vi.fn();
    const assign = vi.fn();
    const original = window.location;
    Object.defineProperty(window, "location", { configurable: true, value: { ...original, set href(v: string) { assign(v); } } });
    try {
      render(<FeatureSuggestionModal t={THEMES.warm} onClose={onClose} />);
      fireEvent.change(screen.getByPlaceholderText("Describe your feature idea..."), { target: { value: "  Add notes  " } });
      fireEvent.click(screen.getByRole("button", { name: "Send Suggestion" }));
      expect(assign).toHaveBeenCalledTimes(1);
      const url = assign.mock.calls[0][0] as string;
      expect(url.startsWith("mailto:")).toBe(true);
      expect(decodeURIComponent(url)).toContain("Add notes");
      expect(onClose).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: original });
    }
  });
});
