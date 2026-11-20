import { BIBLE_BOOKS } from "@/app/constants/books";
import { BIBLE_FOLDERS, bookDataUrl, openBibleCache } from "./bibleData";

export interface CacheBibleOptions {
  setStatus?: (msg: string | null) => void;
}

export interface CacheBibleResult {
  cached: number;
  total: number;
}

const STATUS_CLEAR_DELAY_MS = 3000;

/** Downloads every book in every translation into the offline cache. */
export const cacheBibleData = async ({
  setStatus,
}: CacheBibleOptions = {}): Promise<CacheBibleResult> => {
  const clearStatusLater = () =>
    setTimeout(() => setStatus?.(null), STATUS_CLEAR_DELAY_MS);

  if (!navigator.onLine) {
    setStatus?.("Cannot cache while offline");
    clearStatusLater();
    return { cached: 0, total: 0 };
  }

  setStatus?.("Caching Bible data...");

  const total = BIBLE_FOLDERS.length * BIBLE_BOOKS.length;
  let cached = 0;

  try {
    const cache = await openBibleCache();

    for (const folder of BIBLE_FOLDERS) {
      for (let bookNumber = 1; bookNumber <= BIBLE_BOOKS.length; bookNumber++) {
        const url = bookDataUrl(folder, bookNumber);
        try {
          const response = await fetch(url);
          if (!response.ok) continue;

          await cache.put(url, response.clone());
          cached++;
          if (cached % 10 === 0) {
            setStatus?.(`Cached ${cached}/${total} files...`);
          }
        } catch {
          console.error(`Failed to cache ${folder}/${bookNumber}.json`);
        }
      }
    }

    setStatus?.(`Cached ${cached} files for offline use`);
    clearStatusLater();
  } catch (error) {
    console.error("Cache error:", error);
    setStatus?.("Failed to cache data");
    clearStatusLater();
  }

  return { cached, total };
};
