"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { amharicBooks } from "./constants/books";
import { THEMES, Theme } from "./constants/themes";
import { FONT_SIZES } from "./constants/fonts";
import { BottomNav } from "./components/BottomNav";
import { Header } from "./components/Header";
import { LoadingScreen } from "./components/LoadingScreen";
import { SavedVersesView } from "./components/saved/SavedVerses";
import { SettingsView } from "./components/Settings";
import { ReaderView } from "./components/reader/ReaderView";
import { ChapterNavigation } from "./components/ChapterNavigation";
import { ChapterPickerSheet } from "./components/ChapterPickerSheet";
import { Toast } from "./components/Toast";
import { StatusBanner } from "./components/StatusBanner";
import { cacheBibleData } from "@/utils/cacheBible";
import {
  HIGHLIGHT_LABELS,
  loadHighlights,
  saveHighlightsToStorage,
  getHighlightId,
  createHighlightData,
  getHighlightColorIdx,
  removeHighlightById,
  type HighlightData,
  type HighlightsMap,
} from "@/utils/highlights";
import {
  saveLastLocation,
  loadLastLocation,
} from "@/utils/lastLocation";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(() => {
    const lastLocation = loadLastLocation();
    if (lastLocation) {
      const book = amharicBooks.find((b) => b.name === lastLocation.bookName);
      if (book) return book;
    }
    return (
      amharicBooks[0] || {
        name: "Genesis",
        amharic: "ኦሪት ዘፍጥረት",
        abbr: "ዘፍ",
        chapters: 50,
      }
    );
  });
  const [chapter, setChapter] = useState(() => {
    const lastLocation = loadLastLocation();
    return lastLocation?.chapter ?? 1;
  });
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  const [testament, setTestament] = useState<"old" | "new">("old");
  const [activeTab, setActiveTab] = useState("bible");
  const [englishVersion, setEnglishVersion] = useState<"niv" | "nlt" | "csb">(
    "niv",
  );
  const [englishVerses, setEnglishVerses] = useState<string[]>([]);
  const [amharicVersion, setAmharicVersion] = useState<
    "amharic_bible" | "amharic_nasb"
  >("amharic_bible");
  const [translationView, setTranslationView] = useState<
    "amharic" | "english" | "both"
  >("amharic");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bible-theme") as Theme | null;
    if (saved && THEMES[saved]) {
      setTheme(saved);
    }
    setMounted(true);
  }, []);
  const [fontSizeIdx, setFontSizeIdx] = useState(1);

  const [highlights, setHighlights] = useState<HighlightsMap>(loadHighlights);
  const amharicScrollRef = useRef<HTMLDivElement>(null);
  const englishScrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 2000);
  };

  const contentRef = useRef<HTMLElement>(null);

  const [isOnline, setIsOnline] = useState(true);
  const [cachingStatus, setCachingStatus] = useState<string | null>(null);

  const t = THEMES[theme];

  useEffect(() => {
    localStorage.setItem("bible-theme", theme);
  }, [theme]);

  // Save last location whenever book or chapter changes
  useEffect(() => {
    saveLastLocation(selectedBook.name, chapter);
  }, [selectedBook.name, chapter]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const highlightColors = t.highlightColors;

  const goToNextChapter = () => {
    if (chapter < selectedBook.chapters) {
      setChapter(chapter + 1);
      setSelectedVerse(null);
    } else {
      const idx = amharicBooks.findIndex((b) => b.name === selectedBook.name);
      if (idx < amharicBooks.length - 1) {
        setSelectedBook(amharicBooks[idx + 1]);
        setChapter(1);
        setSelectedVerse(null);
      }
    }
  };

  const goToPreviousChapter = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
      setSelectedVerse(null);
    } else {
      const idx = amharicBooks.findIndex((b) => b.name === selectedBook.name);
      if (idx > 0) {
        setSelectedBook(amharicBooks[idx - 1]);
        setChapter(amharicBooks[idx - 1].chapters);
        setSelectedVerse(null);
      }
    }
  };

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: goToNextChapter,
    onSwipeRight: goToPreviousChapter,
  });

  const cacheAllBibleData = () => {
    cacheBibleData({
      setStatus: setCachingStatus,
    });
  };

  const saveHighlight = (colorIdx: number | null) => {
    if (selectedVerse === null) return;
    const id = getHighlightId(selectedBook.name, chapter, selectedVerse);
    if (colorIdx === null) {
      const updated = removeHighlightById(highlights, id);
      setHighlights(updated);
    } else {
      const data = createHighlightData(
        colorIdx,
        selectedBook.name,
        selectedBook.amharic,
        chapter,
        selectedVerse,
        verses[selectedVerse - 1] || "",
        englishVerses[selectedVerse - 1] || "",
      );
      const updated = { ...highlights, [id]: data };
      setHighlights(updated);
      saveHighlightsToStorage(updated);
    }
  };

  const getHighlightIdx = (verseNum: number): number | null => {
    return getHighlightColorIdx(
      highlights,
      selectedBook.name,
      chapter,
      verseNum,
    );
  };

  const removeHighlight = (id: string) => {
    const updated = removeHighlightById(highlights, id);
    setHighlights(updated);
  };

  const copyVerse = async (verseNum: number) => {
    const amharicText = verses[verseNum - 1] || "";
    const englishText = englishVerses[verseNum - 1] || "";
    const verseLabel = getVerseLabel(verses, verseNum - 1);
    const textToCopy = `${selectedBook.amharic} ${chapter}:${verseLabel}\n${selectedBook.name} ${chapter}:${verseLabel}\n\n${amharicText}\n\n${englishText}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        showToast("Copied to clipboard");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) {
          showToast("Copied to clipboard");
        } else {
          showToast("Failed to copy");
        }
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      showToast("Failed to copy");
    }
  };

  const shouldShowVerse = (verses: string[], index: number): boolean => {
    const verse = verses[index];
    if (verse !== "" && verse !== "-") return true;
    return false;
  };

  const getVerseLabel = (verses: string[], index: number): string => {
    const current = index + 1;
    let endVerse = current;
    for (let i = index + 1; i < verses.length; i++) {
      if (verses[i] === "" || verses[i] === "-") {
        endVerse = i + 1;
      } else {
        break;
      }
    }
    if (endVerse > current) {
      return `${current}-${endVerse}`;
    }
    return current.toString();
  };

  const otBooks = amharicBooks.slice(0, 39);
  const ntBooks = amharicBooks.slice(39);
  const filteredBooks = testament === "old" ? otBooks : ntBooks;

  useEffect(() => {
    async function loadChapter() {
      setLoading(true);
      try {
        const bookIndex = amharicBooks.findIndex(
          (b) => b.name === selectedBook.name,
        );
        const amharicResponse = await fetch(
          `/data/${amharicVersion}/${bookIndex + 1}.json`,
        );
        const amharicData = await amharicResponse.json();
        const amharicChapter = amharicData.chapters.find(
          (c: any) => c.chapter === chapter.toString(),
        );
        setVerses(amharicChapter?.verses || []);
        const englishResponse = await fetch(
          `/data/english/${englishVersion}/${bookIndex + 1}.json`,
        );
        if (englishResponse.ok) {
          const englishData = await englishResponse.json();
          const englishChapter = englishData.chapters.find(
            (c: any) => c.chapter === chapter.toString(),
          );
          setEnglishVerses(englishChapter?.verses || []);
        } else {
          setEnglishVerses([]);
        }
      } catch (error) {
        console.error("Error loading chapter:", error);
        setVerses([]);
        setEnglishVerses([]);
      }
      setLoading(false);
    }
    loadChapter();
  }, [selectedBook, chapter, englishVersion, amharicVersion]);

  useEffect(() => {
    if (translationView !== "both") return;
    const amharicEl = amharicScrollRef.current;
    const englishEl = englishScrollRef.current;
    if (!amharicEl || !englishEl) return;
    const handleAmharicScroll = () => {
      if (isScrolling.current) return;
      const amharicMaxScroll = amharicEl.scrollHeight - amharicEl.clientHeight;
      const englishMaxScroll = englishEl.scrollHeight - englishEl.clientHeight;
      if (amharicMaxScroll <= 0 || englishMaxScroll <= 0) return;
      isScrolling.current = true;
      const scrollRatio = amharicEl.scrollTop / amharicMaxScroll;
      englishEl.scrollTop = scrollRatio * englishMaxScroll;
      setTimeout(() => {
        isScrolling.current = false;
      }, 50);
    };
    const handleEnglishScroll = () => {
      if (isScrolling.current) return;
      const amharicMaxScroll = amharicEl.scrollHeight - amharicEl.clientHeight;
      const englishMaxScroll = englishEl.scrollHeight - englishEl.clientHeight;
      if (amharicMaxScroll <= 0 || englishMaxScroll <= 0) return;
      isScrolling.current = true;
      const scrollRatio = englishEl.scrollTop / englishMaxScroll;
      amharicEl.scrollTop = scrollRatio * amharicMaxScroll;
      setTimeout(() => {
        isScrolling.current = false;
      }, 50);
    };
    amharicEl.addEventListener("scroll", handleAmharicScroll);
    englishEl.addEventListener("scroll", handleEnglishScroll);
    return () => {
      amharicEl.removeEventListener("scroll", handleAmharicScroll);
      englishEl.removeEventListener("scroll", handleEnglishScroll);
    };
  }, [translationView, verses, englishVerses]);

  const handlePrevChapter = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else if (testament === "new") {
      setTestament("old");
      setSelectedBook(otBooks[otBooks.length - 1]);
      setChapter(otBooks[otBooks.length - 1].chapters);
    }
  };

  const handleNextChapter = () => {
    if (chapter < selectedBook.chapters) {
      setChapter(chapter + 1);
    } else if (testament === "old") {
      setTestament("new");
      setSelectedBook(ntBooks[0]);
      setChapter(1);
    }
  };

  // Scroll to selected verse after navigation from Saved verses
  useEffect(() => {
    if (selectedVerse === null || activeTab !== "bible" || loading) return;

    // Small delay to ensure verses are rendered
    const timeoutId = setTimeout(() => {
      const verseElement = document.querySelector(`[data-verse-num="${selectedVerse}"]`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
        // Keep it selected but clear the scroll trigger after scrolling
        // (don't clear selectedVerse as user might want to see it highlighted)
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedVerse, activeTab, loading]);

  const VerseActions = ({ verseNum }: { verseNum: number }) => {
    const currentHighlightIdx = getHighlightIdx(verseNum);
    return (
      <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {highlightColors.map((color, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                saveHighlight(i);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                currentHighlightIdx === i
                  ? "ring-2 ring-offset-1 text-white shadow-md ring-offset-transparent"
                  : `${t.surfaceActive} ${t.textSecondary}`
              }`}
              style={
                currentHighlightIdx === i
                  ? {
                      backgroundColor: color,
                      boxShadow: `0 0 0 2px ${color}, 0 0 0 4px transparent`,
                    }
                  : {}
              }
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{
                  backgroundColor: currentHighlightIdx === i ? "white" : color,
                }}
              />
              {HIGHLIGHT_LABELS[i]}
            </button>
          ))}
          {currentHighlightIdx !== null && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                saveHighlight(null);
              }}
              className={`px-3 py-2 rounded-xl ${t.surfaceActive} ${t.textTertiary} text-xs font-semibold transition-all`}
            >
              Clear
            </button>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyVerse(verseNum);
          }}
          className={`w-full py-2.5 rounded-xl ${t.surfaceActive} ${t.primary} text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
    );
  };

  const VerseItem = ({
    verse,
    index,
    versesArray,
    isEnglish,
  }: {
    verse: string;
    index: number;
    versesArray: string[];
    isEnglish?: boolean;
  }) => {
    const verseNum = index + 1;
    const highlightIdx = getHighlightIdx(verseNum);
    const isSelected = selectedVerse === verseNum;
    const label = isEnglish
      ? verseNum.toString()
      : getVerseLabel(versesArray, index);

    return (
      <div
        key={verseNum}
        data-verse-num={verseNum}
        onClick={() =>
          setSelectedVerse(selectedVerse === verseNum ? null : verseNum)
        }
        className={`group py-3 px-3 rounded-2xl transition-all duration-200 cursor-pointer ${
          isSelected ? t.verseSelected : "hover:bg-white/[0.03]"
        } ${highlightIdx !== null ? t.highlightBg[highlightIdx] : ""}`}
      >
        <div className="flex gap-3">
          <span
            className={`verse-number w-8 mt-1 text-sm font-semibold ${isSelected ? t.primary : highlightIdx !== null ? "" : t.textTertiary}`}
            style={
              highlightIdx !== null
                ? { color: highlightColors[highlightIdx] }
                : undefined
            }
          >
            {label}
          </span>
          <div className="flex-1">
            <p
              className={`verse-text ${FONT_SIZES[fontSizeIdx].size} ${t.verseText} rounded px-0.5`}
            >
              {verse}
            </p>
          </div>
        </div>
        {isSelected && <VerseActions verseNum={verseNum} />}
      </div>
    );
  };

  const renderScreen = () => {
    if (loading) return <LoadingScreen t={t} />;

    switch (activeTab) {
      case "saved":
        return (
          <SavedVersesView
            highlights={highlights}
            highlightColors={highlightColors}
            amharicBooks={amharicBooks}
            setSelectedBook={setSelectedBook}
            setChapter={setChapter}
            setSelectedVerse={setSelectedVerse}
            setActiveTab={setActiveTab}
            removeHighlight={removeHighlight}
            t={t}
          />
        );

      case "settings":
        return (
          <SettingsView
            theme={theme}
            setTheme={setTheme}
            fontSizeIdx={fontSizeIdx}
            setFontSizeIdx={setFontSizeIdx}
            FONT_SIZES={FONT_SIZES}
            THEMES={THEMES}
            isOnline={isOnline}
            cacheAllBibleData={cacheAllBibleData}
            t={t}
          />
        );

      default:
        return (
          <ReaderView
            translationView={translationView}
            verses={verses}
            englishVerses={englishVerses}
            shouldShowVerse={shouldShowVerse}
            englishVersion={englishVersion}
            t={t}
            amharicScrollRef={amharicScrollRef}
            englishScrollRef={englishScrollRef}
            VerseItem={VerseItem}
          />
        );
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gradient-to-b ${t.bg} transition-colors duration-500`}
    >
      {/* Header */}
      <Header
        t={t}
        selectedBook={selectedBook}
        chapter={chapter}
        translationView={translationView}
        setTranslationView={setTranslationView}
        setShowBookPicker={setShowBookPicker}
        englishVersion={englishVersion}
        setEnglishVersion={setEnglishVersion}
        amharicVersion={amharicVersion}
        setAmharicVersion={setAmharicVersion}
      />

      <StatusBanner type="offline" isOnline={isOnline} />

      <StatusBanner type="caching" message={cachingStatus ?? undefined} />

      {/* Chapter Navigation */}
      <ChapterNavigation
        chapter={chapter}
        totalChapters={selectedBook.chapters}
        onPrev={handlePrevChapter}
        onNext={handleNextChapter}
        t={t}
      />

      {/* Bible Content */}
      <main
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-2"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchMove={swipeHandlers.onTouchMove}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} t={t} />

      {/* Book Picker */}
      {showBookPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBookPicker(false)}
          />
          <div
            ref={sheetRef}
            className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl max-h-[85vh] overflow-hidden animate-slide-up border-t ${t.borderLight}`}
            onTouchStart={(e) => {
              touchStartY.current = e.touches[0].clientY;
            }}
            onTouchMove={(e) => {
              touchCurrentY.current = e.touches[0].clientY;
              const deltaY = touchCurrentY.current - touchStartY.current;
              if (deltaY > 0 && sheetRef.current) {
                sheetRef.current.style.transform = `translateY(${deltaY}px)`;
              }
            }}
            onTouchEnd={() => {
              const deltaY = touchCurrentY.current - touchStartY.current;
              if (deltaY > 100) {
                setShowBookPicker(false);
              } else if (sheetRef.current) {
                sheetRef.current.style.transform = "";
              }
            }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div
                className={`w-10 h-1 rounded-full ${theme === "light" ? "bg-gray-300" : "bg-white/20"}`}
              />
            </div>
            <div
              className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}
            >
              <h2 className={`${t.text} text-lg font-bold`}>Select Book</h2>
              <button
                onClick={() => setShowBookPicker(false)}
                className={`w-8 h-8 rounded-full ${t.surface} flex items-center justify-center ${t.textSecondary}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex px-4 py-2.5 gap-2">
              {(["old", "new"] as const).map((t2) => (
                <button
                  key={t2}
                  onClick={() => setTestament(t2)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    testament === t2
                      ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg`
                      : `${t.surface} ${t.textSecondary}`
                  }`}
                >
                  {t2 === "old" ? "Old Testament" : "New Testament"}
                </button>
              ))}
            </div>
            <div className="px-4 pb-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-2">
                {filteredBooks.map((book) => (
                  <button
                    key={book.name}
                    onClick={() => {
                      setSelectedBook(book);
                      setShowChapterPicker(true);
                    }}
                    className={`p-3.5 rounded-xl text-left transition-all duration-200 ${
                      selectedBook.name === book.name
                        ? `bg-gradient-to-r ${t.bookGradient} text-white shadow-lg`
                        : `${t.surface} ${t.text} hover:${t.surfaceActive}`
                    }`}
                  >
                    <div className="text-sm font-semibold">
                      {translationView === "amharic" ? book.amharic : book.name}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${selectedBook.name === book.name ? "text-white/70" : theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {book.chapters}{" "}
                      {translationView === "amharic" ? "ክፍሎች" : "chapters"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Picker */}
      <ChapterPickerSheet
        open={showChapterPicker}
        selectedBook={selectedBook}
        chapter={chapter}
        setChapter={setChapter}
        setShowChapterPicker={setShowChapterPicker}
        setShowBookPicker={setShowBookPicker}
        translationView={translationView}
        theme={theme}
        t={t}
      />

      {/* Toast */}
      <Toast visible={toast.visible} message={toast.message} t={t} />
    </div>
  );
}
