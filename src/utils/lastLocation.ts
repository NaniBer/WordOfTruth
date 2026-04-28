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

export const loadLastLocation = (): LastLocation | null => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(LAST_LOCATION_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as LastLocation;
  } catch {
    return null;
  }
};

export const clearLastLocation = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LAST_LOCATION_KEY);
};