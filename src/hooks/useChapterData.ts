"use client";

import { useEffect, useState } from "react";
import { BIBLE_BOOKS } from "@/app/constants/books";
import type { AmharicVersion, EnglishVersion } from "@/app/constants/translations";
import type { Book } from "@/app/types/book";
import {
  type BookFile,
  bookDataUrl,
  englishFolder,
  findChapterVerses,
  openBibleCache,
} from "@/utils/bibleData";

interface ChapterDataOptions {
  book: Book;
  chapter: number;
  amharicVersion: AmharicVersion;
  englishVersion: EnglishVersion;
}

interface ChapterData {
  verses: string[];
  englishVerses: string[];
  loading: boolean;
}

/**
 * Loads one chapter in both translations.
 *
 * If both book files are in the offline cache, the chapter renders from the
 * cache straight away and the files are refreshed from the network in the
 * background. Otherwise the chapter is fetched and shown once it arrives.
 * Results from a superseded request (the reader moved on) are ignored.
 */
export function useChapterData({
  book,
  chapter,
  amharicVersion,
  englishVersion,
}: ChapterDataOptions): ChapterData {
  const [verses, setVerses] = useState<string[]>([]);
  const [englishVerses, setEnglishVerses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookNumber = BIBLE_BOOKS.findIndex((b) => b.name === book.name) + 1;
    if (bookNumber === 0) return;

    let cancelled = false;
    const amharicUrl = bookDataUrl(amharicVersion, bookNumber);
    const englishUrl = bookDataUrl(englishFolder(englishVersion), bookNumber);

    const show = (amharic: BookFile | null, english: BookFile | null) => {
      if (cancelled) return;
      setVerses(findChapterVerses(amharic, chapter));
      setEnglishVerses(findChapterVerses(english, chapter));
    };

    async function loadFromCache(): Promise<boolean> {
      const cache = await openBibleCache();
      const [cachedAmharic, cachedEnglish] = await Promise.all([
        cache.match(amharicUrl),
        cache.match(englishUrl),
      ]);
      if (!cachedAmharic || !cachedEnglish) return false;

      const [amharic, english] = await Promise.all([
        cachedAmharic.json() as Promise<BookFile>,
        cachedEnglish.json() as Promise<BookFile>,
      ]);
      show(amharic, english);
      if (!cancelled) setLoading(false);

      void refreshInBackground(cache);
      return true;
    }

    // Fetch a book file, store it in the cache, and return its parsed contents.
    async function fetchAndStore(cache: Cache, url: string): Promise<BookFile | null> {
      const response = await fetch(url);
      if (!response.ok) return null;
      // Clone before reading: a consumed body can't be written to the cache.
      const forCache = response.clone();
      const data = (await response.json()) as BookFile;
      await cache.put(url, forCache);
      return data;
    }

    async function refreshInBackground(cache: Cache) {
      try {
        const [amharic, english] = await Promise.all([
          fetchAndStore(cache, amharicUrl),
          fetchAndStore(cache, englishUrl),
        ]);
        if (amharic || english) {
          // Only the fields that came back are updated; the other keeps its cached text.
          if (!cancelled && amharic) {
            setVerses(findChapterVerses(amharic, chapter));
          }
          if (!cancelled && english) {
            setEnglishVerses(findChapterVerses(english, chapter));
          }
        }
      } catch {
        // Offline or a failed refresh: keep showing the cached chapter.
      }
    }

    async function loadFromNetwork() {
      if (cancelled) return;
      setLoading(true);
      try {
        const [amharicRes, englishRes] = await Promise.all([
          fetch(amharicUrl),
          fetch(englishUrl),
        ]);
        const [amharic, english] = await Promise.all([
          amharicRes.ok ? (amharicRes.json() as Promise<BookFile>) : null,
          englishRes.ok ? (englishRes.json() as Promise<BookFile>) : null,
        ]);
        show(amharic, english);
      } catch {
        show(null, null);
      }
      if (!cancelled) setLoading(false);
    }

    (async () => {
      let hit = false;
      try {
        hit = await loadFromCache();
      } catch {
        hit = false;
      }
      if (!hit) await loadFromNetwork();
    })();

    return () => {
      cancelled = true;
    };
  }, [book, chapter, amharicVersion, englishVersion]);

  return { verses, englishVerses, loading };
}
