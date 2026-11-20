export const HIGHLIGHT_STORAGE_KEY = "bible-highlights-v3";
const HIGHLIGHT_V2_STORAGE_KEY = "bible-highlights-v2";

export type HighlightData = {
  colorIdx: number;
  bookName: string;
  bookAmharic: string;
  chapter: number;
  verse: number;
  amharic: string;
  english: string;
  timestamp: number;
};

export type HighlightsMap = Record<string, HighlightData>;

/** Stable id for a verse, e.g. "genesis-1-1". */
export const getHighlightId = (bookName: string, chapter: number, verseNum: number): string =>
  `${bookName.toLowerCase()}-${chapter}-${verseNum}`;

export const saveHighlightsToStorage = (highlights: HighlightsMap): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(HIGHLIGHT_STORAGE_KEY, JSON.stringify(highlights));
};

export const loadHighlights = (): HighlightsMap => {
  if (typeof window === "undefined") return {};

  const saved = localStorage.getItem(HIGHLIGHT_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }

  return migrateFromV2();
};

// v2 stored the color as a hex string; v3 stores an index into the theme's highlight colors.
const LEGACY_COLOR_TO_INDEX: Record<string, number> = {
  // Faith (0): blues / purples / teals
  "#6366f1": 0, "#b8860b": 0, "#a78bfa": 0, "#818cf8": 0, "#22d3ee": 0, "#2dd4bf": 0,
  // Hope (1): oranges / amber
  "#f59e0b": 1, "#c05621": 1, "#fbbf24": 1, "#fb923c": 1,
  // Love (2): greens
  "#10b981": 2, "#2d6a4f": 2, "#34d399": 2, "#6ee7b7": 2,
};

const migrateFromV2 = (): HighlightsMap => {
  const v2Saved = localStorage.getItem(HIGHLIGHT_V2_STORAGE_KEY);
  if (!v2Saved) return {};

  try {
    const v2Data: Record<string, Omit<HighlightData, "colorIdx"> & { color: string }> =
      JSON.parse(v2Saved);

    const migrated: HighlightsMap = {};
    for (const [id, { color, ...rest }] of Object.entries(v2Data)) {
      migrated[id] = { ...rest, colorIdx: LEGACY_COLOR_TO_INDEX[color] ?? 0 };
    }

    localStorage.setItem(HIGHLIGHT_STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return {};
  }
};

export const createHighlightData = (
  colorIdx: number,
  bookName: string,
  bookAmharic: string,
  chapter: number,
  verse: number,
  amharic: string,
  english: string,
): HighlightData => ({
  colorIdx,
  bookName,
  bookAmharic,
  chapter,
  verse,
  amharic,
  english,
  timestamp: Date.now(),
});

/** Color index for a verse, or null when it is not highlighted. */
export const getHighlightColorIdx = (
  highlights: HighlightsMap,
  bookName: string,
  chapter: number,
  verseNum: number,
): number | null => highlights[getHighlightId(bookName, chapter, verseNum)]?.colorIdx ?? null;

/** Adds or replaces a verse highlight, persists the result, and returns the new map. */
export const addHighlight = (
  highlights: HighlightsMap,
  bookName: string,
  bookAmharic: string,
  chapter: number,
  verse: number,
  colorIdx: number,
  amharic: string,
  english: string,
): HighlightsMap => {
  const id = getHighlightId(bookName, chapter, verse);
  const updated = {
    ...highlights,
    [id]: createHighlightData(colorIdx, bookName, bookAmharic, chapter, verse, amharic, english),
  };
  saveHighlightsToStorage(updated);
  return updated;
};

/** Removes a highlight by id, persists the result, and returns the new map. */
export const removeHighlightById = (highlights: HighlightsMap, id: string): HighlightsMap => {
  const rest = { ...highlights };
  delete rest[id];
  saveHighlightsToStorage(rest);
  return rest;
};

/** Highlights, newest first. */
export const getAllHighlights = (highlights: HighlightsMap): HighlightData[] =>
  Object.values(highlights).sort((a, b) => b.timestamp - a.timestamp);
