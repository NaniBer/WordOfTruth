export const HIGHLIGHT_STORAGE_KEY = "bible-highlights-v3";
export const HIGHLIGHT_V2_STORAGE_KEY = "bible-highlights-v2";
export const THEME_STORAGE_KEY = "bible-theme";

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

// Generate unique ID for a verse highlight
export const getHighlightId = (
  bookName: string,
  chapter: number,
  verseNum: number,
): string => {
  return `${bookName.toLowerCase()}-${chapter}-${verseNum}`;
};

// Load highlights from localStorage
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
  
  // Migrate from v2 format
  return migrateFromV2();
};

// Save highlights to localStorage
export const saveHighlightsToStorage = (highlights: HighlightsMap): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(HIGHLIGHT_STORAGE_KEY, JSON.stringify(highlights));
};

// Migrate from v2 format (stored color hex) to v3 (color index)
const migrateFromV2 = (): HighlightsMap => {
  const v2Saved = localStorage.getItem(HIGHLIGHT_V2_STORAGE_KEY);
  if (!v2Saved) return {};
  
  try {
    const v2Data: Record<
      string,
      {
        color: string;
        bookName: string;
        bookAmharic: string;
        chapter: number;
        verse: number;
        amharic: string;
        english: string;
        timestamp: number;
      }
    > = JSON.parse(v2Saved);
    
    const migrated: HighlightsMap = {};
    
    Object.entries(v2Data).forEach(([id, data]) => {
      const colorIdx = mapColorToIndex(data.color);
      migrated[id] = {
        colorIdx,
        bookName: data.bookName,
        bookAmharic: data.bookAmharic,
        chapter: data.chapter,
        verse: data.verse,
        amharic: data.amharic,
        english: data.english,
        timestamp: data.timestamp,
      };
    });
    
    // Save migrated data
    localStorage.setItem(HIGHLIGHT_STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return {};
  }
};

// Map old color hex codes to indices
const mapColorToIndex = (color: string): number => {
  const colorToIdx: Record<string, number> = {
    // Faith (index 0) - blues/purples
    "#6366f1": 0,
    "#b8860b": 0,
    "#a78bfa": 0,
    "#818cf8": 0,
    "#22d3ee": 0,
    "#2dd4bf": 0,
    // Hope (index 1) - oranges/amber
    "#f59e0b": 1,
    "#c05621": 1,
    "#fbbf24": 1,
    "#fb923c": 1,
    // Love (index 2) - greens
    "#10b981": 2,
    "#2d6a4f": 2,
    "#34d399": 2,
    "#6ee7b7": 2,
  };
  
  return colorToIdx[color] ?? 0;
};

// Create new highlight data
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

// Get highlight index for a verse
export const getHighlightColorIdx = (
  highlights: HighlightsMap,
  bookName: string,
  chapter: number,
  verseNum: number,
): number | null => {
  const id = getHighlightId(bookName, chapter, verseNum);
  return highlights[id]?.colorIdx ?? null;
};

// Check if a verse is highlighted
export const isVerseHighlighted = (
  highlights: HighlightsMap,
  bookName: string,
  chapter: number,
  verseNum: number,
): boolean => {
  const id = getHighlightId(bookName, chapter, verseNum);
  return id in highlights;
};

// Add or update a highlight
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
  const data = createHighlightData(
    colorIdx,
    bookName,
    bookAmharic,
    chapter,
    verse,
    amharic,
    english,
  );
  const updated = { ...highlights, [id]: data };
  saveHighlightsToStorage(updated);
  return updated;
};

// Remove a highlight
export const removeHighlightById = (
  highlights: HighlightsMap,
  id: string,
): HighlightsMap => {
  const { [id]: removed, ...rest } = highlights;
  saveHighlightsToStorage(rest);
  return rest;
};

// Get highlights grouped by color index
export const getHighlightsByColor = (
  highlights: HighlightsMap,
): [HighlightData[], HighlightData[], HighlightData[]] => {
  const faith: HighlightData[] = [];
  const hope: HighlightData[] = [];
  const love: HighlightData[] = [];
  
  Object.values(highlights).forEach((h) => {
    if (h.colorIdx === 0) faith.push(h);
    else if (h.colorIdx === 1) hope.push(h);
    else if (h.colorIdx === 2) love.push(h);
  });
  
  // Sort by timestamp descending
  const sortByTime = (a: HighlightData, b: HighlightData) =>
    b.timestamp - a.timestamp;
  
  return [
    faith.sort(sortByTime),
    hope.sort(sortByTime),
    love.sort(sortByTime),
  ];
};

// Count total highlights
export const getHighlightCount = (highlights: HighlightsMap): number => {
  return Object.keys(highlights).length;
};

// Count highlights by color index
export const getHighlightCountByColor = (
  highlights: HighlightsMap,
  colorIdx: number,
): number => {
  return Object.values(highlights).filter((h) => h.colorIdx === colorIdx)
    .length;
};

// Clear all highlights
export const clearAllHighlights = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HIGHLIGHT_STORAGE_KEY);
};