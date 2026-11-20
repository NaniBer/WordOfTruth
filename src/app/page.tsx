"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BIBLE_BOOKS, findBookByName } from "./constants/books";
import { DEFAULT_FONT_SIZE_IDX, FONT_SIZES } from "./constants/fonts";
import { THEMES } from "./constants/themes";
import type { Tab } from "./constants/navigation";
import type {
  AmharicVersion,
  EnglishVersion,
  TranslationView,
} from "./constants/translations";
import type { Book } from "./types/book";
import { BottomNav } from "./components/BottomNav";
import { BookPicker } from "./components/BookPicker";
import { ChapterPickerSheet } from "./components/ChapterPickerSheet";
import { Header } from "./components/Header";
import { LoadingScreen } from "./components/LoadingScreen";
import { ReaderView } from "./components/reader/ReaderView";
import { SavedVersesView } from "./components/saved/SavedVerses";
import { SearchModal } from "./components/SearchModal";
import { SettingsView } from "./components/Settings";
import { SelectionBar } from "./components/SelectionBar";
import { StatusBanner } from "./components/StatusBanner";
import { Toast } from "./components/Toast";
import { useChapterData } from "@/hooks/useChapterData";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { useTheme } from "@/hooks/useTheme";
import { cacheBibleData } from "@/utils/cacheBible";
import { bookDataUrl, openBibleCache } from "@/utils/bibleData";
import {
  copyVerseToClipboard,
  findNextChapter,
  findPreviousChapter,
  formatVerseForCopy,
  formatVersesForCopy,
  getVerseLabel,
} from "@/utils/bibleHelpers";
import {
  addHighlight,
  getHighlightColorIdx,
  getHighlightId,
  loadHighlights,
  removeHighlightById,
  type HighlightsMap,
} from "@/utils/highlights";
import { loadLastLocation, saveLastLocation } from "@/utils/lastLocation";
import { loadViewSettings, saveViewSettings } from "@/utils/viewSettings";

const subscribeToConnectivity = (onChange: () => void) => {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
};
const useOnlineStatus = () =>
  useSyncExternalStore(subscribeToConnectivity, () => navigator.onLine, () => true);

const TOAST_DURATION_MS = 2000;
const REFRESH_DELAY_MS = 500;

/**
 * The reader reads its saved location and preferences from localStorage when it
 * first renders, so it only mounts on the client. Until then the loading screen
 * is shown on both server and client, which avoids a hydration mismatch.
 */
export default function Home() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <LoadingScreen t={THEMES.warm} />;
  return <Reader />;
}

function Reader() {
  // Read once on mount; these seed the initial state below.
  const [initial] = useState(() => ({
    location: loadLastLocation(),
    settings: loadViewSettings(),
  }));

  const { theme, changeTheme } = useTheme();
  const t = THEMES[theme];

  // A stored location is only restored if the book exists and the chapter is in range.
  const initialBook = findBookByName(initial.location?.bookName) ?? BIBLE_BOOKS[0];
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const [chapter, setChapter] = useState(() => {
    const stored = initial.location?.chapter ?? 1;
    return stored <= initialBook.chapters ? stored : 1;
  });
  // Verses the user has tapped. One selected verse opens its action panel; several can be copied together.
  const [checkedVerses, setCheckedVerses] = useState<number[]>([]);
  const selectedVerse = checkedVerses.length === 1 ? checkedVerses[0] : null;
  // Set only when opening a verse from Saved or Search, so the reader scrolls to it once.
  const [scrollTarget, setScrollTarget] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("bible");

  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  // A book chosen in the picker. It only becomes the current book once a chapter is picked.
  const [pendingBook, setPendingBook] = useState<Book | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const [translationView, setTranslationView] = useState<TranslationView>(
    initial.settings.translationView,
  );
  const [englishVersion, setEnglishVersion] = useState<EnglishVersion>(
    initial.settings.englishVersion,
  );
  const [amharicVersion, setAmharicVersion] = useState<AmharicVersion>(
    initial.settings.amharicVersion,
  );
  const [fontSizeIdx, setFontSizeIdx] = useState(initial.settings.fontSizeIdx);
  const fontSize = (FONT_SIZES[fontSizeIdx] ?? FONT_SIZES[DEFAULT_FONT_SIZE_IDX]).size;

  const [highlights, setHighlights] = useState<HighlightsMap>(loadHighlights);

  const isOnline = useOnlineStatus();
  const [isDataCached, setIsDataCached] = useState(false);
  const [cachingStatus, setCachingStatus] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { verses, englishVerses, loading } = useChapterData({
    book: selectedBook,
    chapter,
    amharicVersion,
    englishVersion,
  });

  // Persist reading position and view preferences.
  useEffect(() => {
    saveLastLocation(selectedBook.name, chapter);
  }, [selectedBook.name, chapter]);

  useEffect(() => {
    saveViewSettings({ translationView, englishVersion, amharicVersion, fontSizeIdx });
  }, [translationView, englishVersion, amharicVersion, fontSizeIdx]);

  // Genesis 1 standing in for "the Bible is cached": it is the first file the reader needs.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const cache = await openBibleCache();
        const hit = await cache.match(bookDataUrl("amharic_bible", 1));
        if (active) setIsDataCached(!!hit);
      } catch {
        if (active) setIsDataCached(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Scroll to the verse opened from Saved or Search, once the chapter has rendered.
  useEffect(() => {
    if (scrollTarget === null || activeTab !== "bible" || loading) return;
    const timeoutId = setTimeout(() => {
      document
        .querySelector(`[data-verse-num="${scrollTarget}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [scrollTarget, activeTab, loading]);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), TOAST_DURATION_MS);
  };

  const clearSelection = () => setCheckedVerses([]);

  // Tapping a verse adds it to the selection, or removes it if it is already selected.
  const tapVerse = (verseNum: number) => {
    setCheckedVerses((prev) =>
      prev.includes(verseNum)
        ? prev.filter((v) => v !== verseNum)
        : [...prev, verseNum].sort((a, b) => a - b),
    );
  };

  const copyCheckedVerses = async () => {
    const text = formatVersesForCopy(
      selectedBook,
      chapter,
      checkedVerses,
      verses,
      englishVerses,
      getVerseLabel,
    );
    if (!text) {
      showToast("Nothing to copy");
      return;
    }
    const ok = await copyVerseToClipboard(text);
    const count = checkedVerses.length;
    showToast(ok ? `Copied ${count} ${count === 1 ? "verse" : "verses"}` : "Failed to copy");
  };

  const navigateTo = (book: Book, chapterNum: number) => {
    clearSelection();
    setSelectedBook(book);
    setChapter(chapterNum);
    setScrollTarget(null);
  };

  const openVerse = (book: Book, chapterNum: number, verse: number) => {
    navigateTo(book, chapterNum);
    setScrollTarget(verse);
    setCheckedVerses([verse]);
    setActiveTab("bible");
  };

  const goToAdjacent = (target: { book: Book; chapter: number } | null) => {
    if (target) navigateTo(target.book, target.chapter);
  };
  const goNext = () => goToAdjacent(findNextChapter(selectedBook, chapter, BIBLE_BOOKS));
  const goPrev = () => goToAdjacent(findPreviousChapter(selectedBook, chapter, BIBLE_BOOKS));
  const hasNextChapter = findNextChapter(selectedBook, chapter, BIBLE_BOOKS) !== null;
  const hasPrevChapter = findPreviousChapter(selectedBook, chapter, BIBLE_BOOKS) !== null;
  const swipeHandlers = useSwipeNavigation({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  // Choosing a book only opens its chapters; the reader stays where it is until a chapter is picked.
  const pickBook = (book: Book) => {
    setPendingBook(book);
    setShowChapterPicker(true);
  };

  const pickChapter = (chapterNum: number) => {
    if (pendingBook) navigateTo(pendingBook, chapterNum);
    closePickers();
  };

  const closePickers = () => {
    setPendingBook(null);
    setShowChapterPicker(false);
    setShowBookPicker(false);
  };

  // Backing out of the chapter list returns to the book list and keeps the current reading position.
  const backToBookList = () => {
    setPendingBook(null);
    setShowChapterPicker(false);
  };

  const getHighlightIdx = (verseNum: number) =>
    getHighlightColorIdx(highlights, selectedBook.name, chapter, verseNum);

  const setVerseHighlight = (verseNum: number, colorIdx: number | null) => {
    if (colorIdx === null) {
      const id = getHighlightId(selectedBook.name, chapter, verseNum);
      setHighlights(removeHighlightById(highlights, id));
      return;
    }
    setHighlights(
      addHighlight(
        highlights,
        selectedBook.name,
        selectedBook.amharic,
        chapter,
        verseNum,
        colorIdx,
        verses[verseNum - 1] || "",
        englishVerses[verseNum - 1] || "",
      ),
    );
  };

  const removeSavedHighlight = (id: string) => {
    setHighlights(removeHighlightById(highlights, id));
  };

  const copyVerse = async (verseNum: number) => {
    const text = formatVerseForCopy(
      selectedBook,
      chapter,
      verseNum,
      verses,
      englishVerses,
      getVerseLabel,
    );
    const ok = await copyVerseToClipboard(text);
    showToast(ok ? "Copied to clipboard" : "Failed to copy");
  };

  const cacheAllBibleData = async () => {
    const { cached } = await cacheBibleData({ setStatus: setCachingStatus });
    if (cached > 0) setIsDataCached(true);
  };

  const handleRefresh = () => {
    showToast("Refreshing app...");
    setTimeout(() => window.location.reload(), REFRESH_DELAY_MS);
  };

  const renderScreen = () => {
    if (loading && activeTab === "bible") return <LoadingScreen t={t} />;

    switch (activeTab) {
      case "saved":
        return (
          <SavedVersesView
            highlights={highlights}
            t={t}
            onOpenVerse={openVerse}
            onRemove={removeSavedHighlight}
          />
        );
      case "settings":
        return (
          <SettingsView
            theme={theme}
            setTheme={changeTheme}
            fontSizeIdx={fontSizeIdx}
            setFontSizeIdx={setFontSizeIdx}
            isOnline={isOnline}
            isCached={isDataCached}
            onCacheBibleData={cacheAllBibleData}
            onCheckUpdates={handleRefresh}
            t={t}
          />
        );
      default:
        return (
          <ReaderView
            t={t}
            book={selectedBook}
            translationView={translationView}
            verses={verses}
            englishVerses={englishVerses}
            englishVersion={englishVersion}
            setEnglishVersion={setEnglishVersion}
            fontSize={fontSize}
            selectedVerse={selectedVerse}
            selectionMode={checkedVerses.length > 0}
            checkedVerses={checkedVerses}
            onTapVerse={tapVerse}
            getHighlightIdx={getHighlightIdx}
            onHighlight={setVerseHighlight}
            onCopy={copyVerse}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col h-screen ${t.bg} transition-colors duration-500`}>
      {activeTab === "bible" && (
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
          onSearchClick={() => setShowSearch(true)}
          onPrevChapter={goPrev}
          onNextChapter={goNext}
          hasPrevChapter={hasPrevChapter}
          hasNextChapter={hasNextChapter}
        />
      )}

      {/* Pushed below the fixed top bar when the Bible header is not shown */}
      <div className={activeTab !== "bible" ? "pt-14" : ""}>
        <StatusBanner type="offline" isOnline={isOnline} />
        <StatusBanner type="caching" message={cachingStatus ?? undefined} />
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-2" {...swipeHandlers}>
        {renderScreen()}
      </main>

      {checkedVerses.length > 0 && (
        <SelectionBar
          t={t}
          count={checkedVerses.length}
          onCopy={copyCheckedVerses}
          onCancel={clearSelection}
        />
      )}

      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          clearSelection();
          setActiveTab(tab);
        }}
        t={t}
      />

      {showBookPicker && (
        <BookPicker
          t={t}
          selectedBook={selectedBook}
          translationView={translationView}
          onSelectBook={pickBook}
          onClose={closePickers}
        />
      )}

      {showChapterPicker && pendingBook && (
        <ChapterPickerSheet
          t={t}
          book={pendingBook}
          // No chapter is highlighted while browsing a book that isn't the current one.
          chapter={pendingBook.name === selectedBook.name ? chapter : 0}
          translationView={translationView}
          onSelectChapter={pickChapter}
          onBack={backToBookList}
          onDone={closePickers}
        />
      )}

      {showSearch && (
        <SearchModal
          t={t}
          onClose={() => setShowSearch(false)}
          onSelectResult={openVerse}
          translationView={translationView}
          amharicVersion={amharicVersion}
          englishVersion={englishVersion}
        />
      )}

      <Toast visible={toastMessage !== ""} message={toastMessage} t={t} />
    </div>
  );
}
