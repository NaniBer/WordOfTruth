"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { Search, X } from "lucide-react";
import { BIBLE_BOOKS } from "../constants/books";
import type { ThemeConfig } from "../constants/themes";
import type {
  AmharicVersion,
  EnglishVersion,
  TranslationView,
} from "../constants/translations";
import type { Book } from "../types/book";
import { type BookFile, bookDataUrl, englishFolder } from "@/utils/bibleData";
import { BottomSheet } from "./BottomSheet";

interface SearchResult {
  book: Book;
  chapter: number;
  verse: number;
  amharicText: string;
  englishText: string;
}

interface SearchModalProps {
  t: ThemeConfig;
  onClose: () => void;
  onSelectResult: (book: Book, chapter: number, verse: number) => void;
  translationView: TranslationView;
  amharicVersion: AmharicVersion;
  englishVersion: EnglishVersion;
}

const MAX_RESULTS = 50;
const SEARCH_DEBOUNCE_MS = 300;

/** One book with each Amharic chapter paired with its English verses. */
interface MergedBook {
  chapters: { chapter: string; verses: string[]; englishVerses: string[] }[];
}

// Merged books, keyed by translation pair and book, so repeat searches don't refetch.
const bookCache = new Map<string, MergedBook | null>();

async function loadBook(
  bookNumber: number,
  amharicVersion: AmharicVersion,
  englishVersion: EnglishVersion,
): Promise<MergedBook | null> {
  const key = `${bookNumber}-${amharicVersion}-${englishVersion}`;
  if (bookCache.has(key)) return bookCache.get(key) ?? null;

  try {
    const [amharicRes, englishRes] = await Promise.all([
      fetch(bookDataUrl(amharicVersion, bookNumber)),
      fetch(bookDataUrl(englishFolder(englishVersion), bookNumber)),
    ]);
    if (!amharicRes.ok) return null;

    const amharic = (await amharicRes.json()) as BookFile;
    const english = englishRes.ok ? ((await englishRes.json()) as BookFile) : null;

    const merged: MergedBook = {
      chapters: amharic.chapters.map((ch) => ({
        chapter: ch.chapter,
        verses: ch.verses || [],
        englishVerses:
          english?.chapters?.find((c) => c.chapter === ch.chapter)?.verses || [],
      })),
    };
    bookCache.set(key, merged);
    return merged;
  } catch {
    return null;
  }
}

/**
 * Scans every book for the query. Returns null if the search was aborted, so a
 * superseded search can't overwrite the results of the one that replaced it.
 */
async function searchBible(
  query: string,
  translationView: TranslationView,
  amharicVersion: AmharicVersion,
  englishVersion: EnglishVersion,
  signal: AbortSignal,
): Promise<SearchResult[] | null> {
  const results: SearchResult[] = [];
  const needle = query.toLowerCase();
  const searchAmharic = translationView !== "english";
  const searchEnglish = translationView !== "amharic";

  for (let i = 0; i < BIBLE_BOOKS.length && results.length < MAX_RESULTS; i++) {
    const book = BIBLE_BOOKS[i];
    const data = await loadBook(i + 1, amharicVersion, englishVersion);
    if (signal.aborted) return null;
    if (!data) continue;

    for (const chapter of data.chapters) {
      const chapterNum = parseInt(chapter.chapter, 10);
      for (let verseIdx = 0; verseIdx < chapter.verses.length; verseIdx++) {
        const amharicText = chapter.verses[verseIdx] || "";
        const englishText = chapter.englishVerses[verseIdx] || "";

        const matches =
          (searchAmharic && amharicText.toLowerCase().includes(needle)) ||
          (searchEnglish && englishText.toLowerCase().includes(needle));

        if (matches) {
          results.push({
            book,
            chapter: chapterNum,
            verse: verseIdx + 1,
            amharicText,
            englishText,
          });
          if (results.length >= MAX_RESULTS) return results;
        }
      }
    }
  }
  return results;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function highlightMatch(text: string, query: string, t: ThemeConfig): ReactNode {
  if (!query.trim()) return text;
  const needle = query.toLowerCase();
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === needle ? (
      <mark key={i} className={`${t.highlightBg[0]} rounded px-0.5`}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/** Mounted while open; closing unmounts it, which also resets the query. */
export function SearchModal({
  t,
  onClose,
  onSelectResult,
  translationView,
  amharicVersion,
  englishVersion,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      const trimmed = query.trim();
      if (!trimmed) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const found = await searchBible(
        trimmed,
        translationView,
        amharicVersion,
        englishVersion,
        controller.signal,
      );
      if (found === null) return;
      setResults(found);
      setIsSearching(false);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, translationView, amharicVersion, englishVersion]);

  const showResultText = (result: SearchResult) => {
    const amharic = highlightMatch(result.amharicText, query.trim(), t);
    const english = highlightMatch(result.englishText, query.trim(), t);
    if (translationView === "both") {
      return (
        <>
          <div className="mb-1">{amharic}</div>
          <div className={t.textSecondary}>{english}</div>
        </>
      );
    }
    return translationView === "amharic" ? amharic : english;
  };

  return (
    <BottomSheet
      onClose={onClose}
      t={t}
      maxHeight="max-h-[85vh]"
      header={
        <>
          <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
            <h2 className={`${t.text} text-lg font-bold`}>Search</h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full ${t.surface} flex items-center justify-center ${t.textSecondary}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="px-4 py-3">
            <div className={`relative ${t.surface} rounded-xl border ${t.border}`}>
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${t.textTertiary}`}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search verses..."
                className={`w-full bg-transparent ${t.text} text-sm py-3 pl-10 pr-4 outline-none`}
              />
            </div>
          </div>
        </>
      }
    >
      <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: "calc(85vh - 160px)" }}>
        {isSearching ? (
          <div className={`${t.textSecondary} text-center py-8`}>
            <div
              className={`w-6 h-6 border-2 ${t.border} border-t-transparent rounded-full animate-spin mx-auto mb-2`}
            />
            <p className="text-sm">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-2">
            <p className={`${t.textTertiary} text-xs px-1`}>
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            {results.map((result, index) => (
              <button
                key={`${result.book.name}-${result.chapter}-${result.verse}-${index}`}
                onClick={() => {
                  onSelectResult(result.book, result.chapter, result.verse);
                  onClose();
                }}
                className={`w-full text-left ${t.surface} hover:${t.surfaceActive} border ${t.border} rounded-xl p-3 transition-all`}
              >
                <div className={`${t.textSecondary} text-xs font-medium mb-1`}>
                  {result.book.name} {result.chapter}:{result.verse}
                </div>
                <div className={`${t.text} text-sm leading-relaxed line-clamp-3`}>
                  {showResultText(result)}
                </div>
              </button>
            ))}
          </div>
        ) : query.trim() ? (
          <div className={`${t.textTertiary} text-center py-8`}>
            <p className="text-sm">No results found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className={`${t.textTertiary} text-center py-8`}>
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Type to search</p>
            <p className="text-xs mt-1">Search across all books and chapters</p>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
