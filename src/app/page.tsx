"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  Bookmark,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  X,
  Minus,
  Plus,
} from "lucide-react";

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

const amharicBooks = BOOKS_DATA.map((book) => ({
  name: book.english,
  amharic: book.amharic,
  abbr: book.abbr,
  chapters: book.chapters,
}));

type Theme = "light" | "warm" | "dark" | "midnight" | "amoled" | "ocean";

const THEMES: Record<Theme, {
  label: string;
  emoji: string;
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  surface: string;
  surfaceActive: string;
  border: string;
  borderLight: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryGlow: string;
  verseText: string;
  verseBg: string;
  verseSelected: string;
  navBg: string;
  navActive: string;
  gradient: string;
  bookGradient: string;
  dot: string;
  highlightColors: [string, string, string];
  highlightBg: [string, string, string];
}> = {
  light: {
    label: "Light",
    emoji: "☀️",
    bg: "from-gray-50 via-white to-gray-100",
    bgSecondary: "bg-white/80",
    bgTertiary: "bg-gray-100/60",
    surface: "bg-white border-gray-200",
    surfaceActive: "bg-gray-50 border-gray-300",
    border: "border-gray-200",
    borderLight: "border-gray-300",
    text: "text-gray-900",
    textSecondary: "text-gray-500",
    textTertiary: "text-gray-400",
    primary: "text-indigo-600",
    primaryGlow: "shadow-indigo-500/20",
    verseText: "text-gray-800",
    verseBg: "bg-transparent",
    verseSelected: "bg-indigo-50 border border-indigo-200",
    navBg: "bg-white/90",
    navActive: "bg-indigo-50 text-indigo-600",
    gradient: "from-indigo-600 to-violet-600",
    bookGradient: "from-indigo-600 to-violet-600",
    dot: "bg-indigo-500",
    highlightColors: ["#6366f1", "#f59e0b", "#10b981"],
    highlightBg: ["bg-indigo-100", "bg-amber-100", "bg-emerald-100"],
  },
  warm: {
    label: "Warm",
    emoji: "📖",
    bg: "from-[#faf6f0] via-[#f7f0e6] to-[#f3ead9]",
    bgSecondary: "bg-[#f5edd8]/90",
    bgTertiary: "bg-[#ede3c8]/70",
    surface: "bg-[#fff8ed] border-[#e0d5be]",
    surfaceActive: "bg-[#f5edd8] border-[#d4c9a8]",
    border: "border-[#e0d5be]",
    borderLight: "border-[#d4c9a8]",
    text: "text-[#3d3222]",
    textSecondary: "text-[#7a6b52]",
    textTertiary: "text-[#a0916f]",
    primary: "text-[#8b6914]",
    primaryGlow: "shadow-amber-500/20",
    verseText: "text-[#3a2e1a]",
    verseBg: "bg-transparent",
    verseSelected: "bg-[#f0e4c8] border border-[#d4b86a]",
    navBg: "bg-[#f7f0e6]/90",
    navActive: "bg-[#f0e4c8] text-[#8b6914]",
    gradient: "from-[#c99a1a] to-[#a67c00]",
    bookGradient: "from-[#c99a1a] to-[#a67c00]",
    dot: "bg-[#c99a1a]",
    highlightColors: ["#b8860b", "#c05621", "#2d6a4f"],
    highlightBg: ["bg-[#f5e6b8]", "bg-[#f5dbc8]", "bg-[#c8e6d8]"],
  },
  dark: {
    label: "Dark",
    emoji: "🌙",
    bg: "from-[#1a1a2e] via-[#16213e] to-[#0f0f23]",
    bgSecondary: "bg-[#1e1e36]/90",
    bgTertiary: "bg-[#252545]/70",
    surface: "bg-white/[0.05] border-white/[0.07]",
    surfaceActive: "bg-white/[0.09] border-white/[0.12]",
    border: "border-white/[0.07]",
    borderLight: "border-white/[0.13]",
    text: "text-gray-200",
    textSecondary: "text-gray-400",
    textTertiary: "text-gray-500",
    primary: "text-purple-400",
    primaryGlow: "shadow-purple-500/20",
    verseText: "text-gray-200",
    verseBg: "bg-transparent",
    verseSelected: "bg-purple-500/10 border border-purple-500/20",
    navBg: "bg-[#1a1a2e]/90",
    navActive: "bg-purple-500/15 text-purple-400",
    gradient: "from-purple-500 to-indigo-500",
    bookGradient: "from-purple-600 to-indigo-600",
    dot: "bg-purple-500",
    highlightColors: ["#a78bfa", "#fbbf24", "#34d399"],
    highlightBg: ["bg-purple-500/20", "bg-amber-500/20", "bg-emerald-500/20"],
  },
  midnight: {
    label: "Midnight",
    emoji: "✨",
    bg: "from-[#030712] via-[#0a0e1a] to-[#0f0a1e]",
    bgSecondary: "bg-[#111827]/80",
    bgTertiary: "bg-[#1f2937]/60",
    surface: "bg-white/[0.04] border-white/[0.06]",
    surfaceActive: "bg-white/[0.08] border-white/[0.1]",
    border: "border-white/[0.06]",
    borderLight: "border-white/[0.12]",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    textTertiary: "text-gray-500",
    primary: "text-indigo-400",
    primaryGlow: "shadow-indigo-500/20",
    verseText: "text-gray-100",
    verseBg: "bg-transparent",
    verseSelected: "bg-indigo-500/10 border border-indigo-500/20",
    navBg: "bg-[#030712]/90",
    navActive: "bg-indigo-500/15 text-indigo-400",
    gradient: "from-indigo-500 to-violet-500",
    bookGradient: "from-indigo-600 to-violet-600",
    dot: "bg-indigo-500",
    highlightColors: ["#818cf8", "#fbbf24", "#6ee7b7"],
    highlightBg: ["bg-indigo-500/20", "bg-amber-500/20", "bg-emerald-500/20"],
  },
  amoled: {
    label: "AMOLED",
    emoji: "🖤",
    bg: "from-black via-black to-black",
    bgSecondary: "bg-black",
    bgTertiary: "bg-[#111]/80",
    surface: "bg-white/[0.04] border-white/[0.05]",
    surfaceActive: "bg-white/[0.08] border-white/[0.09]",
    border: "border-white/[0.05]",
    borderLight: "border-white/[0.1]",
    text: "text-gray-100",
    textSecondary: "text-gray-500",
    textTertiary: "text-gray-600",
    primary: "text-cyan-400",
    primaryGlow: "shadow-cyan-500/20",
    verseText: "text-gray-200",
    verseBg: "bg-transparent",
    verseSelected: "bg-cyan-500/8 border border-cyan-500/15",
    navBg: "bg-black/95",
    navActive: "bg-cyan-500/10 text-cyan-400",
    gradient: "from-cyan-500 to-teal-400",
    bookGradient: "from-cyan-600 to-teal-500",
    dot: "bg-cyan-500",
    highlightColors: ["#22d3ee", "#a78bfa", "#fb923c"],
    highlightBg: ["bg-cyan-500/15", "bg-violet-500/15", "bg-orange-500/15"],
  },
  ocean: {
    label: "Ocean",
    emoji: "🌊",
    bg: "from-[#0a192f] via-[#0c2340] to-[#071528]",
    bgSecondary: "bg-[#0d2137]/90",
    bgTertiary: "bg-[#122e4f]/70",
    surface: "bg-blue-500/[0.07] border-blue-400/[0.1]",
    surfaceActive: "bg-blue-500/[0.12] border-blue-400/[0.16]",
    border: "border-blue-900/30",
    borderLight: "border-blue-700/35",
    text: "text-blue-50",
    textSecondary: "text-blue-300/70",
    textTertiary: "text-blue-400/50",
    primary: "text-teal-400",
    primaryGlow: "shadow-teal-500/20",
    verseText: "text-blue-50",
    verseBg: "bg-transparent",
    verseSelected: "bg-teal-500/10 border border-teal-500/20",
    navBg: "bg-[#0a192f]/90",
    navActive: "bg-teal-500/15 text-teal-400",
    gradient: "from-teal-500 to-blue-500",
    bookGradient: "from-teal-600 to-blue-600",
    dot: "bg-teal-500",
    highlightColors: ["#2dd4bf", "#818cf8", "#fbbf24"],
    highlightBg: ["bg-teal-500/20", "bg-indigo-500/20", "bg-amber-500/20"],
  },
};

const FONT_SIZES = [
  { label: "S", size: "text-[15px] leading-[1.7]" },
  { label: "M", size: "text-[17px] leading-[1.8]" },
  { label: "L", size: "text-[19px] leading-[1.9]" },
  { label: "XL", size: "text-[22px] leading-[2.0]" },
];

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(
    amharicBooks[0] || { name: "Genesis", amharic: "ኦሪት ዘፍጥረት", abbr: "ዘፍ", chapters: 50 },
  );
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  const [testament, setTestament] = useState<"old" | "new">("old");
  const [activeTab, setActiveTab] = useState("bible");
  const [englishVersion, setEnglishVersion] = useState<"niv" | "nlt" | "csb">("niv");
  const [englishVerses, setEnglishVerses] = useState<string[]>([]);
  const [amharicVersion, setAmharicVersion] = useState<"amharic_bible" | "amharic_nasb">("amharic_bible");
  const [translationView, setTranslationView] = useState<"amharic" | "english" | "both">("amharic");
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
  
  type HighlightData = {
    colorIdx: number;
    bookName: string;
    bookAmharic: string;
    chapter: number;
    verse: number;
    amharic: string;
    english: string;
    timestamp: number;
  };

  const [highlights, setHighlights] = useState<Record<string, HighlightData>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("bible-highlights-v3");
    if (saved) return JSON.parse(saved);
    // Migrate from v2 format (stored color hex, now store index)
    const v2Saved = localStorage.getItem("bible-highlights-v2");
    if (v2Saved) {
      const v2Data: Record<string, {color: string; bookName: string; bookAmharic: string; chapter: number; verse: number; amharic: string; english: string; timestamp: number}> = JSON.parse(v2Saved);
      const migrated: Record<string, HighlightData> = {};
      // Map theme colors to indices - simplified mapping (first color of each theme per index)
      const colorToIdx: Record<string, number> = {
        // Faith (index 0) - blues/purples
        "#6366f1": 0, "#b8860b": 0, "#a78bfa": 0, "#818cf8": 0, "#22d3ee": 0, "#2dd4bf": 0,
        // Hope (index 1) - oranges/amber
        "#f59e0b": 1, "#c05621": 1, "#fbbf24": 1, "#fb923c": 1,
        // Love (index 2) - greens
        "#10b981": 2, "#2d6a4f": 2, "#34d399": 2, "#6ee7b7": 2,
      };
      Object.entries(v2Data).forEach(([id, data]) => {
        const colorIdx = colorToIdx[data.color] ?? 0;
        migrated[id] = { colorIdx, bookName: data.bookName, bookAmharic: data.bookAmharic, chapter: data.chapter, verse: data.verse, amharic: data.amharic, english: data.english, timestamp: data.timestamp };
      });
      localStorage.setItem("bible-highlights-v3", JSON.stringify(migrated));
      return migrated;
    }
    return {};
  });
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
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);
  const swipeEndX = useRef(0);
  const swipeEndY = useRef(0);
  const isSwiping = useRef(false);

  const [isOnline, setIsOnline] = useState(true);
  const [cachingStatus, setCachingStatus] = useState<string | null>(null);

  const t = THEMES[theme];

  useEffect(() => {
    localStorage.setItem("bible-theme", theme);
  }, [theme]);

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

  const handleContentTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.targetTouches[0].clientX;
    swipeStartY.current = e.targetTouches[0].clientY;
    swipeEndX.current = swipeStartX.current;
    swipeEndY.current = swipeStartY.current;
    isSwiping.current = false;
  };

  const handleContentTouchMove = (e: React.TouchEvent) => {
    swipeEndX.current = e.targetTouches[0].clientX;
    swipeEndY.current = e.targetTouches[0].clientY;
    const deltaX = Math.abs(swipeEndX.current - swipeStartX.current);
    const deltaY = Math.abs(swipeEndY.current - swipeStartY.current);
    if (deltaX > deltaY && deltaX > 10) {
      isSwiping.current = true;
    }
  };

  const handleContentTouchEnd = () => {
    const minSwipeDistance = 80;
    const deltaX = swipeEndX.current - swipeStartX.current;
    const deltaY = swipeEndY.current - swipeStartY.current;
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY) && isSwiping.current) {
      if (deltaX > 0) {
        goToPreviousChapter();
      } else {
        goToNextChapter();
      }
    }
    isSwiping.current = false;
  };

  const cacheAllBibleData = async () => {
    if (!navigator.onLine) {
      setCachingStatus("Cannot cache while offline");
      setTimeout(() => setCachingStatus(null), 3000);
      return;
    }
    setCachingStatus("Caching Bible data...");
    const booksToCache = ["amharic_bible", "amharic_nasb", "english/niv", "english/nlt", "english/csb"];
    let cached = 0;
    const total = booksToCache.length * 66;
    try {
      const cache = await caches.open("wordoftruth-v1");
      for (const bookPath of booksToCache) {
        for (let i = 1; i <= 66; i++) {
          try {
            const response = await fetch(`/data/${bookPath}/${i}.json`);
            if (response.ok) {
              await cache.put(`/data/${bookPath}/${i}.json`, response.clone());
              cached++;
              if (cached % 10 === 0) {
                setCachingStatus(`Cached ${cached}/${total} files...`);
              }
            }
          } catch (e) {
            console.error(`Failed to cache ${bookPath}/${i}.json`);
          }
        }
      }
      setCachingStatus(`Cached ${cached} files for offline use`);
      setTimeout(() => setCachingStatus(null), 3000);
    } catch (error) {
      setCachingStatus("Failed to cache data");
      setTimeout(() => setCachingStatus(null), 3000);
    }
  };

  const saveHighlight = (colorIdx: number | null) => {
    if (selectedVerse === null) return;
    const id = `${selectedBook.name.toLowerCase()}-${chapter}-${selectedVerse}`;
    if (colorIdx === null) {
      const { [id]: removed, ...rest } = highlights;
      setHighlights(rest);
      localStorage.setItem("bible-highlights-v3", JSON.stringify(rest));
    } else {
      const data: HighlightData = {
        colorIdx,
        bookName: selectedBook.name,
        bookAmharic: selectedBook.amharic,
        chapter,
        verse: selectedVerse,
        amharic: verses[selectedVerse - 1] || "",
        english: englishVerses[selectedVerse - 1] || "",
        timestamp: Date.now(),
      };
      const updated = { ...highlights, [id]: data };
      setHighlights(updated);
      localStorage.setItem("bible-highlights-v3", JSON.stringify(updated));
    }
  };

  const getHighlightIdx = (verseNum: number): number | null => {
    const id = `${selectedBook.name.toLowerCase()}-${chapter}-${verseNum}`;
    return highlights[id]?.colorIdx ?? null;
  };

  const removeHighlight = (id: string) => {
    const { [id]: removed, ...rest } = highlights;
    setHighlights(rest);
    localStorage.setItem("bible-highlights-v3", JSON.stringify(rest));
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
        const bookIndex = amharicBooks.findIndex((b) => b.name === selectedBook.name);
        const amharicResponse = await fetch(`/data/${amharicVersion}/${bookIndex + 1}.json`);
        const amharicData = await amharicResponse.json();
        const amharicChapter = amharicData.chapters.find((c: any) => c.chapter === chapter.toString());
        setVerses(amharicChapter?.verses || []);
        const englishResponse = await fetch(`/data/english/${englishVersion}/${bookIndex + 1}.json`);
        if (englishResponse.ok) {
          const englishData = await englishResponse.json();
          const englishChapter = englishData.chapters.find((c: any) => c.chapter === chapter.toString());
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
      setTimeout(() => { isScrolling.current = false; }, 50);
    };
    const handleEnglishScroll = () => {
      if (isScrolling.current) return;
      const amharicMaxScroll = amharicEl.scrollHeight - amharicEl.clientHeight;
      const englishMaxScroll = englishEl.scrollHeight - englishEl.clientHeight;
      if (amharicMaxScroll <= 0 || englishMaxScroll <= 0) return;
      isScrolling.current = true;
      const scrollRatio = englishEl.scrollTop / englishMaxScroll;
      amharicEl.scrollTop = scrollRatio * amharicMaxScroll;
      setTimeout(() => { isScrolling.current = false; }, 50);
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

  const HIGHLIGHT_LABELS = ["Faith", "Hope", "Love"] as const;

  const VerseActions = ({ verseNum }: { verseNum: number }) => {
    const currentHighlightIdx = getHighlightIdx(verseNum);
    return (
    <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {highlightColors.map((color, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); saveHighlight(i); }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
              currentHighlightIdx === i
                ? "ring-2 ring-offset-1 text-white shadow-md ring-offset-transparent"
                : `${t.surfaceActive} ${t.textSecondary}`
            }`}
            style={currentHighlightIdx === i
              ? { backgroundColor: color, boxShadow: `0 0 0 2px ${color}, 0 0 0 4px transparent` }
              : {}}
          >
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: currentHighlightIdx === i ? "white" : color }} />
            {HIGHLIGHT_LABELS[i]}
          </button>
        ))}
        {currentHighlightIdx !== null && (
          <button
            onClick={(e) => { e.stopPropagation(); saveHighlight(null); }}
            className={`px-3 py-2 rounded-xl ${t.surfaceActive} ${t.textTertiary} text-xs font-semibold transition-all`}
          >
            Clear
          </button>
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); copyVerse(verseNum); }}
        className={`w-full py-2.5 rounded-xl ${t.surfaceActive} ${t.primary} text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy
      </button>
    </div>
    );
  };

  const VerseItem = ({ verse, index, versesArray, isEnglish }: { verse: string; index: number; versesArray: string[]; isEnglish?: boolean }) => {
    const verseNum = index + 1;
    const highlightIdx = getHighlightIdx(verseNum);
    const isSelected = selectedVerse === verseNum;
    const label = isEnglish ? (verseNum).toString() : getVerseLabel(versesArray, index);

    return (
      <div
        key={verseNum}
        onClick={() => setSelectedVerse(selectedVerse === verseNum ? null : verseNum)}
        className={`group py-3 px-3 rounded-2xl transition-all duration-200 cursor-pointer ${
          isSelected ? t.verseSelected : "hover:bg-white/[0.03]"
        } ${highlightIdx !== null ? t.highlightBg[highlightIdx] : ""}`}
      >
        <div className="flex gap-3">
          <span className={`verse-number w-8 mt-1 text-sm font-semibold ${isSelected ? t.primary : highlightIdx !== null ? "" : t.textTertiary}`}
            style={highlightIdx !== null ? { color: highlightColors[highlightIdx] } : undefined}
          >
            {label}
          </span>
          <div className="flex-1">
            <p className={`verse-text ${FONT_SIZES[fontSizeIdx].size} ${t.verseText} rounded px-0.5`}
            >
              {verse}
            </p>
          </div>
        </div>
        {isSelected && <VerseActions verseNum={verseNum} />}
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-screen bg-gradient-to-b ${t.bg} transition-colors duration-500`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-4 py-2 ${t.navBg} backdrop-blur-2xl border-b ${t.border}`} style={{ paddingTop: 44 }}>
        <button
          onClick={() => setShowBookPicker(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
        >
          <div className={`bg-gradient-to-r ${t.bookGradient} bg-clip-text`}>
            <span className={`text-base font-bold ${t.text}`}>
              {translationView === "amharic"
                ? (selectedBook.abbr || selectedBook.amharic.slice(0, 4))
                : translationView === "english"
                  ? selectedBook.name
                  : `${selectedBook.abbr || selectedBook.amharic.slice(0, 4)} / ${selectedBook.name}`}
            </span>
          </div>
          <span className={`${t.textSecondary} text-sm font-medium`}>{chapter}</span>
          <ChevronDown className={`w-3.5 h-3.5 ${t.textTertiary}`} />
        </button>
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-0.5 ${t.bgTertiary} rounded-xl p-1 backdrop-blur-sm`}>
            {(["amharic", "both", "english"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setTranslationView(view)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  translationView === view
                    ? `bg-gradient-to-r ${t.gradient} text-white shadow-md`
                    : `${t.textTertiary} hover:${t.textSecondary}`
                }`}
              >
                {view === "amharic" ? "አማ" : view === "both" ? "አማ+EN" : "EN"}
              </button>
            ))}
          </div>
          {(translationView === "english" || translationView === "both") && (
            <select
              value={englishVersion}
              onChange={(e) => setEnglishVersion(e.target.value as "niv" | "nlt" | "csb")}
              className={`${t.bgTertiary} ${t.text} text-xs rounded-lg px-2 py-1.5 border-none outline-none backdrop-blur-sm`}
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
              className={`${t.bgTertiary} ${t.text} text-xs rounded-lg px-2 py-1.5 border-none outline-none backdrop-blur-sm`}
            >
              <option value="amharic_bible">Haile Selassie</option>
              <option value="amharic_nasb">NASB</option>
            </select>
          )}
          <button className={`p-2 rounded-xl hover:bg-white/[0.06] transition-all ${t.textSecondary}`}>
            <Search className="w-[20px] h-[20px]" />
          </button>
        </div>
      </header>

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-1.5 px-4 text-xs font-semibold">
          Offline Mode - Content is cached
        </div>
      )}
      {cachingStatus && (
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-center py-1.5 px-4 text-xs font-semibold">
          {cachingStatus}
        </div>
      )}

      {/* Chapter Navigation */}
      <div className={`flex items-center justify-between px-5 py-2 ${t.bgSecondary} backdrop-blur-xl border-b ${t.border}`}>
        <button
          onClick={handlePrevChapter}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200`}
        >
          <ChevronLeft className={`w-4 h-4 ${t.textSecondary}`} />
          <span className={`${t.textSecondary} text-sm font-medium`}>Prev</span>
        </button>
        <div className="text-center">
          <span className={`${t.textTertiary} text-xs`}>
            Ch. {chapter} / {selectedBook.chapters}
          </span>
        </div>
        <button
          onClick={handleNextChapter}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200`}
        >
          <span className={`${t.textSecondary} text-sm font-medium`}>Next</span>
          <ChevronRight className={`w-4 h-4 ${t.textSecondary}`} />
        </button>
      </div>

      {/* Bible Content */}
      <main
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-2"
        onTouchStart={handleContentTouchStart}
        onTouchMove={handleContentTouchMove}
        onTouchEnd={handleContentTouchEnd}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full border-2 ${t.border} border-t-transparent animate-spin`} />
              <span className={`${t.textTertiary} text-sm`}>Loading...</span>
            </div>
          </div>
        ) : activeTab === "saved" ? (
          <div className="py-4 space-y-4">
            <div className={`${t.textSecondary} text-lg font-bold px-1`}>
              <span className={`bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>Saved</span> Verses ({Object.keys(highlights).length})
            </div>
            {Object.keys(highlights).length === 0 ? (
              <div className={`${t.textTertiary} text-center py-16`}>
                <BookMarked className={`w-12 h-12 mx-auto mb-3 ${t.textTertiary} opacity-30`} />
                <p className="text-sm">No saved verses yet</p>
                <p className="text-xs mt-1">Highlight verses to save them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Group by color index */}
                {[0, 1, 2].map((colorIdx) => {
                  const color = highlightColors[colorIdx];
                  const versesWithColor = Object.values(highlights).filter(h => h.colorIdx === colorIdx);
                  if (versesWithColor.length === 0) return null;
                  return (
                    <div key={colorIdx} className="space-y-2">
                      <div className="flex items-center gap-2 px-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                        <span className={`${t.textSecondary} text-xs font-semibold uppercase tracking-wide`}>
                          {HIGHLIGHT_LABELS[colorIdx]} ({versesWithColor.length})
                        </span>
                      </div>
                      <div className="space-y-2">
                        {versesWithColor
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map((h) => (
                            <button
                              key={`${h.bookName}-${h.chapter}-${h.verse}`}
                              onClick={() => {
                                const book = amharicBooks.find((b) => b.name === h.bookName);
                                if (book) {
                                  setSelectedBook(book);
                                  setChapter(h.chapter);
                                  setActiveTab("bible");
                                }
                              }}
                              className={`w-full text-left p-4 rounded-2xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200 backdrop-blur-sm border-l-4`}
                              style={{ borderLeftColor: color }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`${t.text} text-sm font-bold`}>
                                  {h.bookAmharic} {h.chapter}:{h.verse}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const id = `${h.bookName.toLowerCase()}-${h.chapter}-${h.verse}`;
                                    removeHighlight(id);
                                  }}
                                  className={`${t.textTertiary} hover:text-red-400 text-xs px-2.5 py-1 rounded-lg ${t.surface}`}
                                >
                                  Remove
                                </button>
                              </div>
                              <p className={`${t.verseText} text-sm leading-relaxed line-clamp-2`}>
                                {h.amharic}
                              </p>
                              {h.english && (
                                <p className={`${t.textTertiary} text-xs mt-2 line-clamp-1`}>
                                  {h.english}
                                </p>
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : activeTab === "settings" ? (
          <div className="py-4 px-1 space-y-4">
            <div className={`text-lg font-bold ${t.text}`}>
              <span className={`bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>Settings</span>
            </div>

            {/* Theme Picker */}
            <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
              <h3 className={`${t.text} text-base font-semibold mb-3`}>Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(THEMES) as Theme[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-200 ${
                      theme === key ? `bg-gradient-to-r ${THEMES[key].gradient} text-white shadow-lg` : `${t.surfaceActive} ${t.textSecondary}`
                    }`}
                  >
                    <span className="text-lg">{THEMES[key].emoji}</span>
                    <span className="text-xs font-semibold">{THEMES[key].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
              <h3 className={`${t.text} text-base font-semibold mb-3`}>Font Size</h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setFontSizeIdx(Math.max(0, fontSizeIdx - 1))}
                  className={`w-10 h-10 rounded-xl ${t.surfaceActive} flex items-center justify-center ${t.textSecondary}`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {FONT_SIZES.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setFontSizeIdx(i)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                        i === fontSizeIdx ? `bg-gradient-to-r ${t.gradient} text-white shadow-md` : `${t.surfaceActive} ${t.textTertiary}`
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setFontSizeIdx(Math.min(FONT_SIZES.length - 1, fontSizeIdx + 1))}
                  className={`w-10 h-10 rounded-xl ${t.surfaceActive} flex items-center justify-center ${t.textSecondary}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Offline */}
            <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
              <h3 className={`${t.text} text-base font-semibold mb-3`}>Offline Access</h3>
              <div className="flex items-center justify-between mb-3">
                <span className={`${t.textSecondary} text-sm`}>Status</span>
                <span className={`text-sm font-semibold ${isOnline ? "text-emerald-400" : "text-amber-400"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <button
                onClick={cacheAllBibleData}
                disabled={!isOnline}
                className={`w-full py-3 bg-gradient-to-r ${t.gradient} text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-40 active:scale-[0.98]`}
              >
                Cache All Bible Data
              </button>
              <p className={`${t.textTertiary} text-xs mt-2`}>
                Download all translations for offline reading.
              </p>
            </div>

            {/* About */}
            <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
              <h3 className={`${t.text} text-base font-semibold mb-1`}>About</h3>
              <p className={`${t.textSecondary} text-sm`}>Word of Truth Bible App</p>
              <p className={`${t.textTertiary} text-xs mt-0.5`}>Version 2.0</p>
            </div>
          </div>
        ) : (
          <>
            {translationView === "amharic" ? (
              <div className="space-y-1">
                {verses.map((verse, index) => (
                  shouldShowVerse(verses, index) ? <VerseItem key={index} verse={verse} index={index} versesArray={verses} /> : null
                ))}
              </div>
            ) : translationView === "both" ? (
              <div className="flex flex-col h-full gap-3">
                <div
                  ref={amharicScrollRef}
                  className="flex-1 overflow-y-auto rounded-2xl"
                >
                  <div className={`sticky top-0 z-10 ${t.bgSecondary} backdrop-blur-xl border-b ${t.border} px-4 py-2 flex items-center gap-2`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${t.gradient}`} />
                    <span className={`${t.textTertiary} text-xs font-bold uppercase tracking-widest`}>Amharic</span>
                  </div>
                  <div className="space-y-1 py-1">
                    {verses.map((verse, index) => (
                      shouldShowVerse(verses, index) ? <VerseItem key={index} verse={verse} index={index} versesArray={verses} /> : null
                    ))}
                  </div>
                </div>
                <div ref={englishScrollRef} className="flex-1 overflow-y-auto rounded-2xl">
                  <div className={`sticky top-0 z-10 ${t.bgSecondary} backdrop-blur-xl border-b ${t.border} px-4 py-2 flex items-center gap-2`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${t.gradient}`} />
                    <span className={`${t.textTertiary} text-xs font-bold uppercase tracking-widest`}>English ({englishVersion.toUpperCase()})</span>
                  </div>
                  <div className="space-y-1 py-1">
                    {englishVerses.map((verse, index) => (
                      shouldShowVerse(englishVerses, index) ? <VerseItem key={index} verse={verse} index={index} versesArray={englishVerses} isEnglish /> : null
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {englishVerses.map((verse, index) => (
                  shouldShowVerse(englishVerses, index) ? <VerseItem key={index} verse={verse} index={index} versesArray={englishVerses} isEnglish /> : null
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className={`${t.navBg} backdrop-blur-2xl border-t ${t.border}`}>
        <div className="flex items-center justify-around px-4 pt-2 pb-2" style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))" }}>
          {[
            { id: "bible", icon: BookOpen, label: "Bible" },
            { id: "saved", icon: BookMarked, label: "Saved" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-2xl transition-all duration-300 ${
                activeTab === id ? t.navActive : `${t.textTertiary} hover:bg-white/[0.04]`
              }`}
            >
              <Icon className={`w-[22px] h-[22px] transition-all duration-300 ${activeTab === id ? "drop-shadow" : ""}`} />
              <span className="text-[11px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Book Picker */}
      {showBookPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBookPicker(false)} />
          <div
            ref={sheetRef}
            className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl max-h-[85vh] overflow-hidden animate-slide-up border-t ${t.borderLight}`}
            onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
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
              <div className={`w-10 h-1 rounded-full ${theme === "light" ? "bg-gray-300" : "bg-white/20"}`} />
            </div>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
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
                    testament === t2 ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg` : `${t.surface} ${t.textSecondary}`
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
                    onClick={() => { setSelectedBook(book); setShowChapterPicker(true); }}
                    className={`p-3.5 rounded-xl text-left transition-all duration-200 ${
                      selectedBook.name === book.name
                        ? `bg-gradient-to-r ${t.bookGradient} text-white shadow-lg`
                        : `${t.surface} ${t.text} hover:${t.surfaceActive}`
                    }`}
                  >
                    <div className="text-sm font-semibold">
                      {translationView === "amharic" ? book.amharic : book.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${selectedBook.name === book.name ? "text-white/70" : theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                      {book.chapters} {translationView === "amharic" ? "ክፍሎች" : "chapters"}
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
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowChapterPicker(false)} />
          <div className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl max-h-[80vh] overflow-hidden animate-slide-up border-t ${t.borderLight}`}>
            <div className="flex justify-center pt-3 pb-1">
              <div className={`w-10 h-1 rounded-full ${theme === "light" ? "bg-gray-300" : "bg-white/20"}`} />
            </div>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
              <button
                onClick={() => setShowChapterPicker(false)}
                className={`${t.primary} text-sm font-semibold`}
              >
                Back
              </button>
              <h2 className={`${t.text} text-lg font-bold`}>
                {translationView === "amharic" ? selectedBook.amharic : selectedBook.name}
              </h2>
              <button
                onClick={() => { setShowChapterPicker(false); setShowBookPicker(false); }}
                className={`${t.primary} text-sm font-semibold`}
              >
                Done
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => { setChapter(ch); setShowChapterPicker(false); setShowBookPicker(false); }}
                    className={`p-3 rounded-xl text-center font-semibold transition-all duration-200 ${
                      chapter === ch
                        ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg`
                        : `${t.surface} ${t.text} hover:${t.surfaceActive}`
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-scale-in">
          <div className={`${t.bgSecondary} ${t.text} px-5 py-2.5 rounded-2xl shadow-2xl border ${t.borderLight} backdrop-blur-2xl text-sm font-medium`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}