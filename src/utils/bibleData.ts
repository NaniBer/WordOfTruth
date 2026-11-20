import { getDataUrl } from "./dataUrl";
import {
  AMHARIC_VERSION_OPTIONS,
  ENGLISH_VERSION_OPTIONS,
  type EnglishVersion,
} from "@/app/constants/translations";

/** Name of the Cache Storage bucket holding downloaded Bible files. */
export const BIBLE_CACHE_NAME = "wordoftruth-v1";

/** Shape of one `data/<folder>/<book>.json` file. Chapter numbers are strings in the source data. */
export interface BookFile {
  chapters: { chapter: string; verses: string[] }[];
}

/** Folder that holds an English translation, e.g. `english/niv`. */
export const englishFolder = (version: EnglishVersion): string => `english/${version}`;

/** Every folder that holds a full translation, used when caching everything for offline use. */
export const BIBLE_FOLDERS: string[] = [
  ...AMHARIC_VERSION_OPTIONS.map((o) => o.value),
  ...ENGLISH_VERSION_OPTIONS.map((o) => englishFolder(o.value)),
];

/** URL of a book file. `bookNumber` is 1-based (Genesis = 1). */
export const bookDataUrl = (folder: string, bookNumber: number): string =>
  getDataUrl(`data/${folder}/${bookNumber}.json`);

/** Verses for one chapter from a parsed book file. Returns [] when the chapter is missing. */
export const findChapterVerses = (
  file: BookFile | null | undefined,
  chapter: number,
): string[] =>
  file?.chapters?.find((c) => c.chapter === String(chapter))?.verses ?? [];

export const openBibleCache = (): Promise<Cache> => caches.open(BIBLE_CACHE_NAME);
