"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  Bookmark,
  Highlighter,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  Languages,
  X,
} from "lucide-react";

// Book data with proper Amharic and English names
const BOOKS_DATA = [
  { amharic: "ኦሪት ዘፍጥረት", english: "Genesis", abbr: "ዘፍ", chapters: 50 },
  { amharic: "ኦሪት ዘጸአት", english: "Exodus", abbr: "ዘጸ", chapters: 40 },
  { amharic: "ኦሪት ዘሌዋውያን", english: "Leviticus", abbr: "ዘሌ", chapters: 27 },
  { amharic: "ኦሪት ዘኍልቍ", english: "Numbers", abbr: "ዘኍ", chapters: 36 },
  { amharic: "ኦሪት ዘዳግም", english: "Deuteronomy", abbr: "ዘዳ", chapters: 34 },
  { amharic: "መጽሐፈ ኢያሱ ወልደ ነዌ", english: "Joshua", abbr: "ኢያ", chapters: 24 },
  { amharic: "መጽሐፈ መሣፍንት", english: "Judges", abbr: "መሳ", chapters: 21 },
  { amharic: "መጽሐፈ ሩት", english: "Ruth", abbr: "ሩት", chapters: 4 },
  { amharic: "መጽሐፈ ሳሙኤል ቀዳማዊ", english: "1 Samuel", abbr: "1 ሳሙ", chapters: 31 },
  { amharic: "መጽሐፈ ሳሙኤል ካል", english: "2 Samuel", abbr: "2 ሳሙ", chapters: 24 },
  { amharic: "መጽሐፈ ነገሥት ቀዳማዊ", english: "1 Kings", abbr: "1 ነገ", chapters: 22 },
  { amharic: "መጽሐፈ ነገሥት ካልዕ", english: "2 Kings", abbr: "2 ነገ", chapters: 25 },
  { amharic: "መጽሐፈ ዜና መዋዕል ቀዳማዊ", english: "1 Chronicles", abbr: "1 ዜና", chapters: 29 },
  { amharic: "መጽሐፈ ዜና መዋዕል ካልዕ", english: "2 Chronicles", abbr: "2 ዜና", chapters: 36 },
  { amharic: "መጽሐፈ ዕዝራ", english: "Ezra", abbr: "ዕዝ", chapters: 10 },
  { amharic: "መጽሐፈ ነህምያ", english: "Nehemiah", abbr: "ነህ", chapters: 13 },
  { amharic: "መጽሐፈ አስቴር", english: "Esther", abbr: "አስ", chapters: 10 },
  { amharic: "መጽሐፈ ኢዮብ", english: "Job", abbr: "ኢዮ", chapters: 42 },
  { amharic: "መዝሙረ ዳዊት", english: "Psalms", abbr: "መዝ", chapters: 150 },
  { amharic: "መጽሐፈ ምሳሌ", english: "Proverbs", abbr: "ምሳ", chapters: 31 },
  { amharic: "መጽሐፈ መክብብ", english: "Ecclesiastes", abbr: "መክ", chapters: 12 },
  { amharic: "መኃልየ መኃልይ ዘሰሎሞን", english: "Song of Songs", abbr: "መሃ", chapters: 8 },
  { amharic: "ትንቢተ ኢሳይያስ", english: "Isaiah", abbr: "ኢሳ", chapters: 66 },
  { amharic: "ትንቢተ ኤርምያስ", english: "Jeremiah", abbr: "ኤር", chapters: 52 },
  { amharic: "ሰቆቃው ኤርምያስ", english: "Lamentations", abbr: "ሰቆ", chapters: 5 },
  { amharic: "ትንቢተ ሕዝቅኤል", english: "Ezekiel", abbr: "ሕዝ", chapters: 48 },
  { amharic: "ትንቢተ ዳንኤል", english: "Daniel", abbr: "ዳን", chapters: 12 },
  { amharic: "ትንቢተ ሆሴዕ", english: "Hosea", abbr: "ሆሴ", chapters: 14 },
  { amharic: "ትንቢተ ኢዮኤል", english: "Joel", abbr: "ኢዮኤ", chapters: 3 },
  { amharic: "ትንቢተ አሞጽ", english: "Amos", abbr: "አሞ", chapters: 9 },
  { amharic: "ትንቢተ አብድዩ", english: "Obadiah", abbr: "አብ", chapters: 1 },
  { amharic: "ትንቢተ ዮናስ", english: "Jonah", abbr: "ዮና", chapters: 4 },
  { amharic: "ትንቢተ ሚክያስ", english: "Micah", abbr: "ሚክ", chapters: 7 },
  { amharic: "ትንቢተ ናሆም", english: "Nahum", abbr: "ናሆ", chapters: 3 },
  { amharic: "ትንቢተ ዕንባቆም", english: "Habakkuk", abbr: "ዕብ", chapters: 3 },
  { amharic: "ትንቢተ ሶፎንያስ", english: "Zephaniah", abbr: "ሶፎ", chapters: 3 },
  { amharic: "ትንቢተ ሐጌ", english: "Haggai", abbr: "ሐጌ", chapters: 2 },
  { amharic: "ትንቢተ ዘካርያስ", english: "Zechariah", abbr: "ዘካ", chapters: 14 },
  { amharic: "ትንቢተ ሚልክያ", english: "Malachi", abbr: "ሚል", chapters: 4 },
  { amharic: "የማቴዎስ ወንጌል", english: "Matthew", abbr: "ማቴ", chapters: 28 },
  { amharic: "የማርቆስ ወንጌል", english: "Mark", abbr: "ማር", chapters: 16 },
  { amharic: "የሉቃስ ወንጌል", english: "Luke", abbr: "ሉቃ", chapters: 24 },
  { amharic: "የዮሐንስ ወንጌል", english: "John", abbr: "ዮሐ", chapters: 21 },
  { amharic: "የሐዋርያት ሥራ", english: "Acts", abbr: "ሐዋ", chapters: 28 },
  { amharic: "ወደ ሮሜ ሰዎች", english: "Romans", abbr: "ሮሜ", chapters: 16 },
  { amharic: "1ኛ ወደ ቆሮንቶስ ሰዎች", english: "1 Corinthians", abbr: "1 ቆሮ", chapters: 16 },
  { amharic: "2ኛ ወደ ቆሮንቶስ ሰዎች", english: "2 Corinthians", abbr: "2 ቆሮ", chapters: 13 },
  { amharic: "ወደ ገላትያ ሰዎች", english: "Galatians", abbr: "ገላ", chapters: 6 },
  { amharic: "ወደ ኤፌሶን ሰዎች", english: "Ephesians", abbr: "ኤፌ", chapters: 6 },
  { amharic: "ወደ ፊልጵስዩስ ሰዎች", english: "Philippians", abbr: "ፊል", chapters: 4 },
  { amharic: "ወደ ቆላስይስ ሰዎች", english: "Colossians", abbr: "ቆላ", chapters: 4 },
  { amharic: "1ኛ ወደ ተሰሎንቄ ሰዎች", english: "1 Thessalonians", abbr: "1 ተሰ", chapters: 5 },
  { amharic: "2ኛ ወደ ተሰሎንቄ ሰዎች", english: "2 Thessalonians", abbr: "2 ተሰ", chapters: 3 },
  { amharic: "1ኛ ወደ ጢሞቴዎስ", english: "1 Timothy", abbr: "1 ጢሞ", chapters: 6 },
  { amharic: "2ኛ ወደ ጢሞቴዎስ", english: "2 Timothy", abbr: "2 ጢሞ", chapters: 4 },
  { amharic: "ወደ ቲቶ", english: "Titus", abbr: "ቲቶ", chapters: 3 },
  { amharic: "ወደ ፊልሞና", english: "Philemon", abbr: "ፊልሞ", chapters: 1 },
  { amharic: "ወደ ዕብራውያን", english: "Hebrews", abbr: "ዕብ", chapters: 13 },
  { amharic: "የያዕቆብ መልእክት", english: "James", abbr: "ያዕ", chapters: 5 },
  { amharic: "1ኛ የጴጥሮስ መልእክት", english: "1 Peter", abbr: "1 ጴጥ", chapters: 5 },
  { amharic: "2ኛ የጴጥሮስ መልእክት", english: "2 Peter", abbr: "2 ጴጥ", chapters: 3 },
  { amharic: "1ኛ የዮሐንስ መልእክት", english: "1 John", abbr: "1 ዮሐ", chapters: 5 },
  { amharic: "2ኛ የዮሐንስ መልእክት", english: "2 John", abbr: "2 ዮሐ", chapters: 1 },
  { amharic: "3ኛ የዮሐንስ መልእክት", english: "3 John", abbr: "3 ዮሐ", chapters: 1 },
  { amharic: "የይሁዳ መልእክት", english: "Jude", abbr: "ይሁ", chapters: 1 },
  { amharic: "የዮሐንስ ራእይ", english: "Revelation", abbr: "ራእ", chapters: 22 },
];

// Create amharicBooks array from BOOKS_DATA
const amharicBooks = BOOKS_DATA.map((book) => ({
  name: book.english,
  amharic: book.amharic,
  abbr: book.abbr,
  chapters: book.chapters,
}));

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(
    amharicBooks[0] || { name: "Genesis", amharic: "ኦሪት ዘፍጥረት", chapters: 50 },
  );
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  const [testament, setTestament] = useState<"old" | "new">("old");
  const [activeTab, setActiveTab] = useState("bible");
  const [showCompare, setShowCompare] = useState(false);
  const [englishVersion, setEnglishVersion] = useState<"niv" | "nlt" | "csb">("niv");
  const [englishVerses, setEnglishVerses] = useState<string[]>([]);
  const [showEnglish, setShowEnglish] = useState(false);
  const [amharicVersion, setAmharicVersion] = useState<"amharic_bible" | "amharic_nasb">("amharic_bible");
  const [translationView, setTranslationView] = useState<
    "amharic" | "english" | "both"
  >("amharic");
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("bible-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [highlights, setHighlights] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("bible-highlights");
    return saved ? JSON.parse(saved) : {};
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const amharicScrollRef = useRef<HTMLDivElement>(null);
  const englishScrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  const highlightColors = [
    "#ffeb3b",
    "#4caf50",
    "#2196f3",
    "#e91e63",
    "#9c27b0",
  ];

  const saveBookmark = () => {
    if (selectedVerse === null) return;
    const id = `${selectedBook.name.toLowerCase()}-${chapter}-${selectedVerse}`;
    if (isBookmarked(selectedVerse)) {
      removeBookmark(id);
    } else {
      const bookmark = {
        id,
        bookName: selectedBook.name,
        bookAmharic: selectedBook.amharic,
        chapter,
        verse: selectedVerse,
        amharic: verses[selectedVerse - 1] || "",
        english: englishVerses[selectedVerse - 1] || "",
        timestamp: Date.now(),
      };
      const updated = [...bookmarks, bookmark];
      setBookmarks(updated);
      localStorage.setItem("bible-bookmarks", JSON.stringify(updated));
    }
  };

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bible-bookmarks", JSON.stringify(updated));
  };

  const isBookmarked = (verseNum: number) => {
    const id = `${selectedBook.name.toLowerCase()}-${chapter}-${verseNum}`;
    return bookmarks.some((b) => b.id === id);
  };

  const saveHighlight = (color: string | null) => {
    if (selectedVerse === null) return;
    const id = `${selectedBook.name.toLowerCase()}-${chapter}-${selectedVerse}`;
    if (color === null) {
      const { [id]: removed, ...rest } = highlights;
      setHighlights(rest);
      localStorage.setItem("bible-highlights", JSON.stringify(rest));
      removeBookmark(id);
    } else {
      const updated = { ...highlights, [id]: color };
      setHighlights(updated);
      localStorage.setItem("bible-highlights", JSON.stringify(updated));
      const bookmark = {
        id,
        bookName: selectedBook.name,
        bookAmharic: selectedBook.amharic,
        chapter,
        verse: selectedVerse,
        amharic: verses[selectedVerse - 1] || "",
        english: englishVerses[selectedVerse - 1] || "",
        timestamp: Date.now(),
      };
      const updatedBookmarks = [
        ...bookmarks.filter((b) => b.id !== id),
        bookmark,
      ];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bible-bookmarks", JSON.stringify(updatedBookmarks));
    }
    setShowColorPicker(false);
  };

  const getHighlight = (verseNum: number) => {
    const id = `${selectedBook.name.toLowerCase()}-${chapter}-${verseNum}`;
    return highlights[id] || null;
  };

  const otBooks = amharicBooks.slice(0, 39);
  const ntBooks = amharicBooks.slice(39);
  const filteredBooks = testament === "old" ? otBooks : ntBooks;

  // Load Amharic and English chapters when book or chapter changes
  useEffect(() => {
    async function loadChapter() {
      setLoading(true);
      try {
        const bookIndex = amharicBooks.findIndex(
          (b) => b.name === selectedBook.name,
        );

        // Load Amharic
        const amharicResponse = await fetch(
          `/data/${amharicVersion}/${bookIndex + 1}.json`,
        );
        const amharicData = await amharicResponse.json();
        const amharicChapter = amharicData.chapters.find(
          (c: any) => c.chapter === chapter.toString(),
        );
        setVerses(amharicChapter?.verses || []);

        // Load English
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

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 bg-[#1c1c1e] border-b border-white/5"
        style={{ paddingTop: 44 }}
      >
        <button
          onClick={() => setShowBookPicker(true)}
          className="flex items-center gap-1"
        >
          <span className="text-white text-[14px] font-semibold">
            {translationView === "amharic"
              ? (selectedBook.abbr || selectedBook.amharic.slice(0, 4))
              : translationView === "english"
                ? selectedBook.name
                : `${selectedBook.abbr || selectedBook.amharic.slice(0, 4)} / ${selectedBook.name}`}
          </span>
          <span className="text-white/60 text-[15px]">{chapter}</span>
          <ChevronDown className="w-4 h-4 text-white/60" />
        </button>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-[#2c2c2e] rounded-lg p-1">
            <button
              onClick={() => setTranslationView("amharic")}
              className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium ${translationView === "amharic" ? "bg-[#0a84ff] text-white" : "text-white/70"}`}
            >
              አማ
            </button>
            <button
              onClick={() => setTranslationView("both")}
              className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium ${translationView === "both" ? "bg-[#0a84ff] text-white" : "text-white/70"}`}
            >
              አማ+ENG
            </button>
            <button
              onClick={() => {
                setTranslationView("english");
                setShowEnglish(true);
              }}
              className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium ${translationView === "english" ? "bg-[#0a84ff] text-white" : "text-white/70"}`}
            >
              ENG
            </button>
          </div>
          {(translationView === "english" || translationView === "both") && (
            <select
              value={englishVersion}
              onChange={(e) => setEnglishVersion(e.target.value as "niv" | "nlt" | "csb")}
              className="bg-[#2c2c2e] text-white text-[12px] rounded-lg px-2 py-1.5 border-none outline-none"
            >
              <option value="niv">NIV</option>
              <option value="nlt">NLT</option>
              <option value="csb">CSB</option>
            </select>
          )}
          {(translationView === "amharic" || translationView === "both") && (
            <select
              value={amharicVersion}
              onChange={(e) => setAmharicVersion(e.target.value as "amharic_bible" | "amharic_nasb")}
              className="bg-[#2c2c2e] text-white text-[12px] rounded-lg px-2 py-1.5 border-none outline-none"
            >
              <option value="amharic_bible">Haile Selassie</option>
              <option value="amharic_nasb">NASB</option>
            </select>
          )}
          <button className="p-2">
            <Search className="w-[22px] h-[22px] text-white/80" />
          </button>
        </div>
      </header>

      {/* Chapter Navigation */}
      <div className="flex items-center justify-between px-6 py-2 bg-[#1c1c1e] border-b border-white/5">
        <button
          onClick={handlePrevChapter}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 active:bg-white/20"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
          <span className="text-white/80 text-[14px]">Prev</span>
        </button>
        <span className="text-white/50 text-[13px]">
          Chapter {chapter} of {selectedBook.chapters}
        </span>
        <button
          onClick={handleNextChapter}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 active:bg-white/20"
        >
          <span className="text-white/80 text-[14px]">Next</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Bible Content - Amharic Only */}
      <main className="flex-1 overflow-y-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-white/50">Loading...</span>
          </div>
        ) : activeTab === "saved" ? (
          <div className="py-2">
            <div className="text-white/60 text-[15px] font-medium px-2 py-3">
              Saved Verses ({bookmarks.length})
            </div>
            {bookmarks.length === 0 ? (
              <div className="text-white/50 text-center py-8">
                No saved verses yet. Tap a verse and bookmark it!
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarks
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((bookmark) => (
                    <button
                      key={bookmark.id}
                      onClick={() => {
                        const book = amharicBooks.find(
                          (b) => b.name === bookmark.bookName,
                        );
                        if (book) {
                          setSelectedBook(book);
                          setChapter(bookmark.chapter);
                          setActiveTab("bible");
                        }
                      }}
                      className="w-full text-left p-3 rounded-lg bg-[#2c2c2e] active:bg-[#3a3a3c]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#0a84ff] text-[14px] font-medium">
                          {bookmark.bookAmharic} {bookmark.chapter}:
                          {bookmark.verse}
                        </span>
                      </div>
                      <p className="text-white/80 text-[15px] leading-[1.4] line-clamp-2">
                        {bookmark.amharic}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-white/50 text-[13px]">
                          {bookmark.english}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBookmark(bookmark.id);
                          }}
                          className="text-[#ff453a] text-[13px] px-2 py-1 rounded bg-white/10"
                        >
                          Remove
                        </button>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {translationView === "amharic" ? (
              <div className="space-y-1">
                {verses.map((verse, index) => (
                  <div
                    key={index + 1}
                    onClick={() =>
                      setSelectedVerse(
                        selectedVerse === index + 1 ? null : index + 1,
                      )
                    }
                    className={`py-3 px-2 rounded-[10px] transition-all ${selectedVerse === index + 1 ? "bg-[#2c2c2e]" : "active:bg-[#2c2c2e]/50"}`}
                  >
                    <div className="flex gap-3">
                      <span className="text-[#0a84ff] font-medium text-[14px] w-8 mt-0.5">
                        {(verse === "" || verse === "-") &&
                        index < verses.length - 1 &&
                        verses[index + 1] !== "" && verses[index + 1] !== "-"
                          ? `${index + 1}-${index + 2}`
                          : index + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <p
                          className="text-[#f5f5f7] text-[18px] leading-[1.6] rounded px-1"
                          style={{
                            backgroundColor:
                              getHighlight(index + 1) || undefined,
                          }}
                        >
                          {(verse === "" || verse === "-") && index < verses.length - 1
                            ? verses[index + 1]
                            : verse === "-" ? "" : verse}
                        </p>
                      </div>
                    </div>
                    {selectedVerse === index + 1 && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowColorPicker(!showColorPicker);
                          }}
                          className={`flex-1 py-2.5 bg-[#3a3a3c] text-[#ff9f0a] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2 ${getHighlight(index + 1) ? "border-2 border-[#ffeb3b]" : ""}`}
                        >
                          <Highlighter className="w-4 h-4" />
                          {getHighlight(index + 1)
                            ? "Highlighted"
                            : "Highlight"}
                        </button>
                        {showColorPicker && selectedVerse === index + 1 && (
                          <div className="flex gap-2 mt-2 pb-2">
                            {highlightColors.map((color) => (
                              <button
                                key={color}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveHighlight(color);
                                }}
                                className="w-8 h-8 rounded-full border-2 border-white/30"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : translationView === "both" ? (
              <div className="flex flex-col h-full">
                <div
                  ref={amharicScrollRef}
                  className="flex-1 overflow-y-auto border-b border-white/10"
                >
                  <div className="text-[#8e8e93] text-[12px] font-medium uppercase tracking-wide px-2 py-2 sticky top-0 bg-[#000] z-10">
                    አማርኛ
                  </div>
                  <div className="space-y-1">
                    {verses.map((verse, index) => (
                      <div
                        key={index + 1}
                        onClick={() =>
                          setSelectedVerse(
                            selectedVerse === index + 1 ? null : index + 1,
                          )
                        }
                        style={{
                          backgroundColor: getHighlight(index + 1)
                            ? `${getHighlight(index + 1)}40`
                            : undefined,
                        }}
                        className={`py-3 px-2 rounded-[10px] transition-all ${selectedVerse === index + 1 ? "bg-[#2c2c2e]" : "active:bg-[#2c2c2e]/50"}`}
                      >
                        <div className="flex gap-3">
                          <span className="text-[#0a84ff] font-medium text-[14px] w-8 mt-0.5">
                            {(verse === "" || verse === "-") &&
                            index < verses.length - 1 &&
                            verses[index + 1] !== "" && verses[index + 1] !== "-"
                              ? `${index + 1}-${index + 2}`
                              : index + 1}
                          </span>
                          <p
                            className="text-[#f5f5f7] text-[18px] leading-[1.6] rounded px-1"
                            style={{
                              backgroundColor:
                                getHighlight(index + 1) || undefined,
                            }}
                          >
                            {(verse === "" || verse === "-") && index < verses.length - 1
                              ? verses[index + 1]
                              : verse === "-" ? "" : verse}
                          </p>
                        </div>
                        {selectedVerse === index + 1 && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (getHighlight(index + 1)) {
                                  saveHighlight(null);
                                } else {
                                  setShowColorPicker(!showColorPicker);
                                }
                              }}
                              className={`flex-1 py-2.5 bg-[#3a3a3c] text-[#ff9f0a] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2 ${getHighlight(index + 1) ? "border-2 border-[#ffeb3b]" : ""}`}
                            >
                              <Highlighter className="w-4 h-4" />
                              {getHighlight(index + 1)
                                ? "Highlighted"
                                : "Highlight"}
                            </button>
                            {showColorPicker && selectedVerse === index + 1 && (
                              <div className="flex gap-2 mt-2 pb-2">
                                {highlightColors.map((color) => (
                                  <button
                                    key={color}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveHighlight(color);
                                    }}
                                    className="w-8 h-8 rounded-full border-2 border-white/30"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div ref={englishScrollRef} className="flex-1 overflow-y-auto">
                  <div className="text-[#8e8e93] text-[12px] font-medium uppercase tracking-wide px-2 py-2 sticky top-0 bg-[#000] z-10">
                    English ({englishVersion.toUpperCase()})
                  </div>
                  <div className="space-y-1">
                    {englishVerses.map((verse, index) => (
                      <div
                        key={index + 1}
                        onClick={() =>
                          setSelectedVerse(
                            selectedVerse === index + 1 ? null : index + 1,
                          )
                        }
                        style={{
                          backgroundColor: getHighlight(index + 1)
                            ? `${getHighlight(index + 1)}40`
                            : undefined,
                        }}
                        className={`py-3 px-2 rounded-[10px] transition-all ${selectedVerse === index + 1 ? "bg-[#2c2c2e]" : "active:bg-[#2c2c2e]/50"}`}
                      >
                        <div className="flex gap-3">
                          <span className="text-[#8e8e93] font-medium text-[14px] w-8 mt-0.5">
                            {index + 1}
                          </span>
                          <p
                            className="text-[#f5f5f7] text-[16px] leading-[1.5] rounded px-1"
                            style={{
                              backgroundColor:
                                getHighlight(index + 1) || undefined,
                            }}
                          >
                            {verse}
                          </p>
                        </div>
                        {selectedVerse === index + 1 && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (getHighlight(index + 1)) {
                                  saveHighlight(null);
                                } else {
                                  setShowColorPicker(!showColorPicker);
                                }
                              }}
                              className={`flex-1 py-2.5 bg-[#3a3a3c] text-[#ff9f0a] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2 ${getHighlight(index + 1) ? "border-2 border-[#ffeb3b]" : ""}`}
                            >
                              <Highlighter className="w-4 h-4" />
                              {getHighlight(index + 1)
                                ? "Highlighted"
                                : "Highlight"}
                            </button>
                            {showColorPicker && selectedVerse === index + 1 && (
                              <div className="flex gap-2 mt-2 pb-2">
                                {highlightColors.map((color) => (
                                  <button
                                    key={color}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveHighlight(color);
                                    }}
                                    className="w-8 h-8 rounded-full border-2 border-white/30"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                saveBookmark();
                              }}
                              className={`flex-1 py-2.5 text-[15px] rounded-full font-medium flex items-center justify-center gap-2 ${isBookmarked(index + 1) ? "bg-[#34c759] text-white" : "bg-[#0a84ff] text-white active:bg-[#007aff]"}`}
                            >
                              <Bookmark className="w-4 h-4" />
                              {isBookmarked(index + 1) ? "Saved" : "Save"}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {englishVerses.map((verse, index) => (
                  <div
                    key={index + 1}
                    onClick={() =>
                      setSelectedVerse(
                        selectedVerse === index + 1 ? null : index + 1,
                      )
                    }
                    style={{
                      backgroundColor: getHighlight(index + 1)
                        ? `${getHighlight(index + 1)}40`
                        : undefined,
                    }}
                    className={`py-3 px-2 rounded-[10px] transition-all ${selectedVerse === index + 1 ? "bg-[#2c2c2e]" : "active:bg-[#2c2c2e]/50"}`}
                  >
                    <div className="flex gap-3">
                      <span className="text-[#8e8e93] font-medium text-[14px] w-8 mt-0.5">
                        {index + 1}
                      </span>
                      <p
                        className="text-[#f5f5f7] text-[16px] leading-[1.5] rounded px-1"
                        style={{
                          backgroundColor: getHighlight(index + 1) || undefined,
                        }}
                      >
                        {verse}
                      </p>
                    </div>
                    {selectedVerse === index + 1 && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (getHighlight(index + 1)) {
                              saveHighlight(null);
                            } else {
                              setShowColorPicker(!showColorPicker);
                            }
                          }}
                          className={`flex-1 py-2.5 bg-[#3a3a3c] text-[#ff9f0a] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2 ${getHighlight(index + 1) ? "border-2 border-[#ffeb3b]" : ""}`}
                        >
                          <Highlighter className="w-4 h-4" />
                          {getHighlight(index + 1)
                            ? "Highlighted"
                            : "Highlight"}
                        </button>
                        {showColorPicker && selectedVerse === index + 1 && (
                          <div className="flex gap-2 mt-2 pb-2">
                            {highlightColors.map((color) => (
                              <button
                                key={color}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveHighlight(color);
                                }}
                                className="w-8 h-8 rounded-full border-2 border-white/30"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveBookmark();
                          }}
                          className={`flex-1 py-2.5 text-[15px] rounded-full font-medium flex items-center justify-center gap-2 ${isBookmarked(index + 1) ? "bg-[#34c759] text-white" : "bg-[#0a84ff] text-white active:bg-[#007aff]"}`}
                        >
                          <Bookmark className="w-4 h-4" />
                          {isBookmarked(index + 1) ? "Saved" : "Save"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around px-2 pb-6 bg-[#1c1c1e] border-t border-white/5">
        <button
          onClick={() => setActiveTab("bible")}
          className={`flex flex-col items-center gap-1 px-6 py-1 rounded-xl ${activeTab === "bible" ? "bg-[#0a84ff]/20" : "active:bg-white/5"}`}
        >
          <BookOpen
            className={`w-6 h-6 ${activeTab === "bible" ? "text-[#0a84ff]" : "text-[#8e8e93]"}`}
          />
          <span
            className={`text-[11px] font-medium ${activeTab === "bible" ? "text-[#0a84ff]" : "text-[#8e8e93]"}`}
          >
            Bible
          </span>
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex flex-col items-center gap-1 px-6 py-1 rounded-xl ${activeTab === "saved" ? "bg-[#0a84ff]/20" : "active:bg-white/5"}`}
        >
          <BookMarked
            className={`w-6 h-6 ${activeTab === "saved" ? "text-[#0a84ff]" : "text-[#8e8e93]"}`}
          />
          <span
            className={`text-[11px] font-medium ${activeTab === "saved" ? "text-[#0a84ff]" : "text-[#8e8e93]"}`}
          >
            Saved
          </span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center gap-1 px-6 py-1 rounded-xl ${activeTab === "settings" ? "bg-[#0a84ff]/20" : "active:bg-white/5"}`}
        >
          <Settings
            className={`w-6 h-6 ${activeTab === "settings" ? "text-[#0a84ff]" : "text-[#8e8e93]"}`}
          />
          <span
            className={`text-[11px] font-medium ${activeTab === "settings" ? "text-[#0a84ff]" : "text-[#8e8e93]"}`}
          >
            Settings
          </span>
        </button>
      </nav>

      {/* Book Picker - iOS Bottom Sheet */}
      {showBookPicker && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowBookPicker(false)}
          />
          <div
            ref={sheetRef}
            className="relative w-full bg-[#1c1c1e] rounded-t-[20px] max-h-[80vh] overflow-hidden animate-slide-up"
          >
            <div
              className="flex justify-center pt-3 pb-1"
              onTouchStart={(e) => {
                touchStartY.current = e.touches[0].clientY;
              }}
              onTouchMove={(e) => {
                touchCurrentY.current = e.touches[0].clientY;
                const deltaY = touchCurrentY.current - touchStartY.current;
                if (deltaY > 0) {
                  sheetRef.current!.style.transform = `translateY(${deltaY}px)`;
                }
              }}
              onTouchEnd={(e) => {
                const deltaY = touchCurrentY.current - touchStartY.current;
                if (deltaY > 100) {
                  setShowBookPicker(false);
                } else {
                  sheetRef.current!.style.transform = "";
                }
              }}
            >
              <div className="w-9 h-1.25 bg-white/20 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-white text-[17px] font-semibold">መጽሐፍ</h2>
              <button
                onClick={() => setShowBookPicker(false)}
                className="text-[#0a84ff] text-[17px] font-medium"
              >
                Done
              </button>
            </div>
            <div className="flex px-4 py-2 gap-2">
              <button
                onClick={() => setTestament("old")}
                className={`flex-1 py-2 rounded-lg text-[15px] font-medium ${testament === "old" ? "bg-[#0a84ff] text-white" : "bg-[#2c2c2e] text-[#8e8e93]"}`}
              >
                Old Testament
              </button>
              <button
                onClick={() => setTestament("new")}
                className={`flex-1 py-2 rounded-lg text-[15px] font-medium ${testament === "new" ? "bg-[#0a84ff] text-white" : "bg-[#2c2c2e] text-[#8e8e93]"}`}
              >
                New Testament
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-2">
                {filteredBooks.map((book) => (
                  <button
                    key={book.name}
                    onClick={() => {
                      setSelectedBook(book);
                      setShowChapterPicker(true);
                    }}
                    className={`p-3 rounded-lg text-left transition-colors ${selectedBook.name === book.name ? "bg-[#0a84ff] text-white" : "bg-[#2c2c2e] text-white/90 hover:bg-[#3a3a3c]"}`}
                  >
                    <div className="text-[15px] font-medium">
                      {translationView === "amharic" ? book.amharic : book.name}
                    </div>
                    <div className="text-[13px] opacity-70">
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
      {showChapterPicker && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowChapterPicker(false)}
          />
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[20px] max-h-[80vh] overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <button
                onClick={() => setShowChapterPicker(false)}
                className="text-[#0a84ff] text-[17px] font-medium"
              >
                Back
              </button>
              <h2 className="text-white text-[17px] font-semibold">
                {translationView === "amharic"
                  ? selectedBook.amharic
                  : selectedBook.name}
              </h2>
              <button
                onClick={() => setShowChapterPicker(false)}
                className="text-[#0a84ff] text-[17px] font-medium"
              >
                Done
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-5 gap-2">
                {Array.from(
                  { length: selectedBook.chapters },
                  (_, i) => i + 1,
                ).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => {
                      setChapter(ch);
                      setShowChapterPicker(false);
                      setShowBookPicker(false);
                    }}
                    className={`p-3 rounded-lg text-center transition-colors ${chapter === ch ? "bg-[#0a84ff] text-white" : "bg-[#2c2c2e] text-white/90 hover:bg-[#3a3a3c]"}`}
                  >
                    <div className="text-[15px] font-medium">{ch}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCompare(false)}
          />
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[20px] max-h-[85vh] overflow-hidden animate-slide-up">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[36px] h-[5px] bg-white/20 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-white text-[17px] font-semibold">
                Compare Versions
              </h2>
              <button
                onClick={() => setShowCompare(false)}
                className="text-[#0a84ff] text-[17px] font-medium"
              >
                Close
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="text-white/50 text-center py-8">
                English translation coming soon...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
