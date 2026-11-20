const LAST_LOCATION_KEY = "bible-last-location";

export interface LastLocation {
  bookName: string;
  chapter: number;
}

export const saveLastLocation = (bookName: string, chapter: number): void => {
  if (typeof window === "undefined") return;
  const location: LastLocation = { bookName, chapter };
  localStorage.setItem(LAST_LOCATION_KEY, JSON.stringify(location));
};

/** Returns the stored location only if it has the expected shape. */
export const parseLastLocation = (raw: unknown): LastLocation | null => {
  if (!raw || typeof raw !== "object") return null;
  const { bookName, chapter } = raw as Record<string, unknown>;
  if (typeof bookName !== "string" || !Number.isInteger(chapter) || (chapter as number) < 1) {
    return null;
  }
  return { bookName, chapter: chapter as number };
};

export const loadLastLocation = (): LastLocation | null => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(LAST_LOCATION_KEY);
  if (!saved) return null;
  try {
    return parseLastLocation(JSON.parse(saved));
  } catch {
    return null;
  }
};
