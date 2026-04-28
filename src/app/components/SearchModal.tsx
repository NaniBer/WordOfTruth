"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Search } from "lucide-react";
import { ThemeConfig } from "../constants/themes";
import { Book } from "../types/book";

interface SearchResult {
  book: Book;
  chapter: number;
  verse: number;
  amharicText: string;
  englishText: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: ThemeConfig;
  books: Book[];
  onSelectResult: (book: Book, chapter: number, verse: number) => void;
  translationView: "amharic" | "english" | "both";
  amharicVersion: "amharic_bible" | "amharic_nasb";
  englishVersion: "niv" | "nlt" | "csb";
}

// Cache for loaded bible data
const bibleDataCache: Record<string, { chapters: { chapter: string; verses: string[] }[] }> = {};

async function loadBookData(bookIndex: number, amharicVersion: string, englishVersion: string) {
  const cacheKey = `${bookIndex}-${amharicVersion}-${englishVersion}`;
  if (bibleDataCache[cacheKey]) {
    return bibleDataCache[cacheKey];
  }

  try {
    const [amharicRes, englishRes] = await Promise.all([
      fetch(`/data/${amharicVersion}/${bookIndex + 1}.json`),
      fetch(`/data/english/${englishVersion}/${bookIndex + 1}.json`),
    ]);

    if (!amharicRes.ok) return null;

    const amharicData = await amharicRes.json();
    const englishData = englishRes.ok ? await englishRes.json() : { chapters: [] };

    // Merge data - create array of chapters with both amharic and english verses
    const chapters = amharicData.chapters.map((ch: any) => {
      const englishChapter = englishData.chapters?.find(
        (c: any) => c.chapter === ch.chapter
      );
      return {
        chapter: ch.chapter,
        verses: ch.verses || [],
        englishVerses: englishChapter?.verses || [],
      };
    });

    const data = { chapters };
    bibleDataCache[cacheKey] = data;
    return data;
  } catch {
    return null;
  }
}

export function SearchModal({
  isOpen,
  onClose,
  t,
  books,
  onSelectResult,
  translationView,
  amharicVersion,
  englishVersion,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const searchResults: SearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    // Search through all books
    for (let bookIdx = 0; bookIdx < books.length; bookIdx++) {
      if (abortControllerRef.current.signal.aborted) break;
      
      const book = books[bookIdx];
      const data = await loadBookData(bookIdx, amharicVersion, englishVersion);
      if (!data) continue;

      // Search through all chapters in this book
      for (const chapter of data.chapters) {
        if (abortControllerRef.current.signal.aborted) break;

        const chapterNum = parseInt(chapter.chapter, 10);

        for (let verseIdx = 0; verseIdx < chapter.verses.length; verseIdx++) {
          const amharicVerse = chapter.verses[verseIdx] || "";
          const englishVerse = chapter.englishVerses[verseIdx] || "";

          const matchAmharic = translationView !== "english" && amharicVerse.toLowerCase().includes(lowerQuery);
          const matchEnglish = translationView !== "amharic" && englishVerse.toLowerCase().includes(lowerQuery);

          if (matchAmharic || matchEnglish) {
            searchResults.push({
              book,
              chapter: chapterNum,
              verse: verseIdx + 1,
              amharicText: amharicVerse,
              englishText: englishVerse,
            });

            // Limit results
            if (searchResults.length >= 50) break;
          }
        }

        if (searchResults.length >= 50) break;
      }

      if (searchResults.length >= 50) break;
    }

    setResults(searchResults);
    setIsSearching(false);
  }, [books, translationView, amharicVersion, englishVersion]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  if (!isOpen) return null;

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className={`${t.highlightBg[0]} rounded px-0.5`}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl max-h-[85vh] overflow-hidden animate-slide-up border-t ${t.borderLight}`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className={`w-10 h-1 rounded-full ${
              t.text === "text-gray-900" ? "bg-gray-300" : "bg-white/20"
            }`}
          />
        </div>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
          <h2 className={`${t.text} text-lg font-bold`}>Search</h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full ${t.surface} flex items-center justify-center ${t.textSecondary}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-4 py-3">
          <div className={`relative ${t.surface} rounded-xl border ${t.border}`}>
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${t.textTertiary}`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search verses..."
              className={`w-full bg-transparent ${t.text} placeholder:${t.textTertiary} text-sm py-3 pl-10 pr-4 outline-none`}
            />
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: "calc(85vh - 160px)" }}>
          {isSearching ? (
            <div className={`${t.textSecondary} text-center py-8`}>
              <div className={`w-6 h-6 border-2 ${t.border} border-t-transparent rounded-full animate-spin mx-auto mb-2`} />
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
                    {translationView === "both" ? (
                      <>
                        <div className="mb-1">{highlightMatch(result.amharicText, query)}</div>
                        <div className={`${t.textSecondary}`}>{highlightMatch(result.englishText, query)}</div>
                      </>
                    ) : translationView === "amharic" ? (
                      highlightMatch(result.amharicText, query)
                    ) : (
                      highlightMatch(result.englishText, query)
                    )}
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
      </div>
    </div>
  );
}
