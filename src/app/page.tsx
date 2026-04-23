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

// Book mapping - Amharic file name to display name
const amharicBooks = [
  {
    file: "01_ኦሪት ዘፍጥረት.json",
    name: "Genesis",
    amharic: "ኦሪት ዘፍጥረት",
    chapters: 50,
  },
  {
    file: "02_ኦሪት ዘጸአት.json",
    name: "Exodus",
    amharic: "ኦሪት ዘጸአት",
    chapters: 40,
  },
  {
    file: "03_ኦሪት ዘሌዋውያን.json",
    name: "Leviticus",
    amharic: "ኦሪት ዘሌዋውያን",
    chapters: 27,
  },
  {
    file: "04_ኦሪት ዘኍልቍ.json",
    name: "Numbers",
    amharic: "ኦሪት ዘኍልቍ",
    chapters: 36,
  },
  {
    file: "05_ኦሪት ዘዳግም.json",
    name: "Deuteronomy",
    amharic: "ኦሪት ዘዳግም",
    chapters: 34,
  },
  {
    file: "06_ዮስዋ ወልደ ነዌ.json",
    name: "Joshua",
    amharic: "ዮስዋ ወልደ ነዌ",
    chapters: 24,
  },
  { file: "07_መሳፍንት.json", name: "Judges", amharic: "መሳፍንት", chapters: 21 },
  { file: "08_ሩት.json", name: "Ruth", amharic: "ሩት", chapters: 4 },
  {
    file: "09_ሰማዊል ቀዳማዊ.json",
    name: "1 Samuel",
    amharic: "ሰማዊል ቀዳማዊ",
    chapters: 31,
  },
  {
    file: "10_ሰማዊል ሁለተኛ.json",
    name: "2 Samuel",
    amharic: "ሰማዊል ሁለተኛ",
    chapters: 24,
  },
  {
    file: "11_ነገሥት ቀዳማዊ.json",
    name: "1 Kings",
    amharic: "ነገሥት ቀዳማዊ",
    chapters: 22,
  },
  {
    file: "12_ነገሥት ሁለተኛ.json",
    name: "2 Kings",
    amharic: "ነገሥት ሁለተኛ",
    chapters: 25,
  },
  {
    file: "13_ዕጽዋት ቀዳማዊ.json",
    name: "1 Chronicles",
    amharic: "ዕጽዋት ቀዳማዊ",
    chapters: 29,
  },
  {
    file: "14_ዕጽዋት ሁለተኛ.json",
    name: "2 Chronicles",
    amharic: "ዕጽዋት ሁለተኛ",
    chapters: 36,
  },
  { file: "15_ዕዝራ.json", name: "Ezra", amharic: "ዕዝራ", chapters: 10 },
  { file: "16_ነህምያ.json", name: "Nehemiah", amharic: "ነህምያ", chapters: 13 },
  { file: "17_ኤስጦር.json", name: "Esther", amharic: "ኤስጦር", chapters: 10 },
  { file: "18_ኢዮብ.json", name: "Job", amharic: "ኢዮብ", chapters: 42 },
  {
    file: "19_መዝሙረ ዳዊት.json",
    name: "Psalms",
    amharic: "መዝሙረ ዳዊት",
    chapters: 150,
  },
  { file: "20_ምሳህር.json", name: "Proverbs", amharic: "ምሳህር", chapters: 31 },
  { file: "21_አሮጌው.json", name: "Ecclesiastes", amharic: "አሮጌው", chapters: 12 },
  {
    file: "22_መናህር ስምዐም.json",
    name: "Song of Solomon",
    amharic: "መናህር ስምዐም",
    chapters: 8,
  },
  { file: "23_ዐይስያ.json", name: "Isaiah", amharic: "ዐይስያ", chapters: 66 },
  { file: "24_ኤርሚያ.json", name: "Jeremiah", amharic: "ኤርሚያ", chapters: 52 },
  {
    file: "25_ርእስተ ኤርሚያ.json",
    name: "Lamentations",
    amharic: "ርእስተ ኤርሚያ",
    chapters: 5,
  },
  { file: "26_ሕዝቅያ.json", name: "Ezekiel", amharic: "ሕዝቅያ", chapters: 48 },
  { file: "27_ዳንኤል.json", name: "Daniel", amharic: "ዳንኤል", chapters: 12 },
  { file: "28_ሆሴዕ.json", name: "Hosea", amharic: "ሆሴዕ", chapters: 14 },
  { file: "29_ዮኤል.json", name: "Joel", amharic: "ዮኤል", chapters: 3 },
  { file: "30_አሞጋ.json", name: "Amos", amharic: "አሞጋ", chapters: 9 },
  { file: "31_ኦባዲያ.json", name: "Obadiah", amharic: "ኦባዲያ", chapters: 1 },
  { file: "32_ዮናስ.json", name: "Jonah", amharic: "ዮናስ", chapters: 4 },
  { file: "33_ሚቃዕ.json", name: "Micah", amharic: "ሚቃዕ", chapters: 7 },
  { file: "34_ናሆም.json", name: "Nahum", amharic: "ናሆም", chapters: 3 },
  { file: "35_ሐበቲ.json", name: "Habakkuk", amharic: "ሐበቲ", chapters: 3 },
  { file: "36_ስፍንያ.json", name: "Zephaniah", amharic: "ስፍንያ", chapters: 3 },
  { file: "37_ኃጋር.json", name: "Haggai", amharic: "ኃጋር", chapters: 2 },
  { file: "38_ዘካርያ.json", name: "Zechariah", amharic: "ዘካርያ", chapters: 14 },
  { file: "39_ማላኪ.json", name: "Malachi", amharic: "ማላኪ", chapters: 4 },
  // New Testament
  { file: "40_ማቲዎስ.json", name: "Matthew", amharic: "ማቲዎስ", chapters: 28 },
  { file: "41_ማርቆስ.json", name: "Mark", amharic: "ማርቆስ", chapters: 16 },
  { file: "42_ሉቃስ.json", name: "Luke", amharic: "ሉቃስ", chapters: 24 },
  { file: "43_ዮሐንስ.json", name: "John", amharic: "ዮሐንስ", chapters: 21 },
  {
    file: "44_የሐዋርያት ሥራ.json",
    name: "Acts",
    amharic: "የሐዋርያት ሥራ",
    chapters: 28,
  },
  { file: "45_ሮሜ.json", name: "Romans", amharic: "ሮሜ", chapters: 16 },
  {
    file: "46_ቀሪት ቀዳማዊ.json",
    name: "1 Corinthians",
    amharic: "ቀሪት ቀዳማዊ",
    chapters: 16,
  },
  {
    file: "47_ቀሪት ሁለተኛ.json",
    name: "2 Corinthians",
    amharic: "ቀሪት ሁለተኛ",
    chapters: 13,
  },
  { file: "48_ጋላትያ.json", name: "Galatians", amharic: "ጋላትያ", chapters: 6 },
  { file: "49_ኤፌስያ.json", name: "Ephesians", amharic: "ኤፌስያ", chapters: 6 },
  { file: "50_ፊሊጵያ.json", name: "Philippians", amharic: "ፊሊጵያ", chapters: 4 },
  { file: "51_ቆሎሳያ.json", name: "Colossians", amharic: "ቆሎሳያ", chapters: 4 },
  {
    file: "52_ለሰንተንት ቀዳማዊ.json",
    name: "1 Thessalonians",
    amharic: "ለሰንተንት ቀዳማዊ",
    chapters: 5,
  },
  {
    file: "53_ለሰንተንት ሁለተኛ.json",
    name: "2 Thessalonians",
    amharic: "ለሰንተንት ሁለተኛ",
    chapters: 3,
  },
  {
    file: "54_ጢሞትዎስ ቀዳማዊ.json",
    name: "1 Timothy",
    amharic: "ጢሞትዎስ ቀዳማዊ",
    chapters: 6,
  },
  {
    file: "55_ጢሞትዎስ ሁለተኛ.json",
    name: "2 Timothy",
    amharic: "ጢሞትዎስ ሁለተኛ",
    chapters: 4,
  },
  { file: "56_ቲቶስ.json", name: "Titus", amharic: "ቲቶስ", chapters: 3 },
  { file: "57_ፊልሞን.json", name: "Philemon", amharic: "ፊልሞን", chapters: 1 },
  { file: "58_ዕብራይስጥ.json", name: "Hebrews", amharic: "ዕብራይስጥ", chapters: 13 },
  { file: "59_የቂም.json", name: "James", amharic: "የቂም", chapters: 5 },
  {
    file: "60_ጴጥሮስ ቀዳማዊ.json",
    name: "1 Peter",
    amharic: "ጴጥሮስ ቀዳማዊ",
    chapters: 5,
  },
  {
    file: "61_ጴጥሮስ ሁለተኛ.json",
    name: "2 Peter",
    amharic: "ጴጥሮስ ሁለተኛ",
    chapters: 3,
  },
  {
    file: "62_ዮሐንስ ቀዳማዊ.json",
    name: "1 John",
    amharic: "ዮሐንስ ቀዳማዊ",
    chapters: 5,
  },
  {
    file: "63_ዮሐንስ ሁለተኛ.json",
    name: "2 John",
    amharic: "ዮሐንስ ሁለተኛ",
    chapters: 1,
  },
  {
    file: "64_ዮሐንስ ሣልሳን.json",
    name: "3 John",
    amharic: "ዮሐንስ ሣልሳን",
    chapters: 1,
  },
  {
    file: "65_የይሁዳ መልእክት.json",
    name: "Jude",
    amharic: "የይሁዳ መልእክት",
    chapters: 1,
  },
  {
    file: "66_የዮሐንስ ራእይ.json",
    name: "Revelation",
    amharic: "የዮሐንስ ራእይ",
    chapters: 22,
  },
];

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(
    amharicBooks[0] || { name: "Genesis", amharic: "ኦሪት ዘፍጥረት", chapters: 50 },
  );
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [testament, setTestament] = useState<"old" | "new">("old");
  const [activeTab, setActiveTab] = useState("bible");
  const [showCompare, setShowCompare] = useState(false);
  const [englishVersion, setEnglishVersion] = useState<"kjv" | "web">("web");
  const [englishVerses, setEnglishVerses] = useState<string[]>([]);
  const [showEnglish, setShowEnglish] = useState(false);
  const [translationView, setTranslationView] = useState<"amharic" | "english" | "both">("amharic");
  const [loading, setLoading] = useState(true);
  const amharicScrollRef = useRef<HTMLDivElement>(null);
  const englishScrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

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
        const amharicResponse = await fetch(`/data/amharic/${bookIndex + 1}.json`);
        const amharicData = await amharicResponse.json();
        const amharicChapter = amharicData.chapters.find(
          (c: any) => c.chapter === chapter.toString(),
        );
        setVerses(amharicChapter?.verses || []);
        
        // Load English
        const englishResponse = await fetch(`/data/english/${englishVersion}/${bookIndex + 1}.json`);
        if (englishResponse.ok) {
          const englishData = await englishResponse.json();
          const englishChapter = englishData.text?.[chapter - 1];
          const englishVerseTexts = englishChapter?.text?.map((v: any) => v.text || "") || [];
          setEnglishVerses(englishVerseTexts);
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
  }, [selectedBook, chapter, englishVersion]);

  useEffect(() => {
    const amharicEl = amharicScrollRef.current;
    const englishEl = englishScrollRef.current;

    if (!amharicEl || !englishEl) return;

    const handleAmharicScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      const scrollRatio = amharicEl.scrollTop / (amharicEl.scrollHeight - amharicEl.clientHeight);
      englishEl.scrollTop = scrollRatio * (englishEl.scrollHeight - englishEl.clientHeight);
      setTimeout(() => { isScrolling.current = false; }, 50);
    };

    const handleEnglishScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      const scrollRatio = englishEl.scrollTop / (englishEl.scrollHeight - englishEl.clientHeight);
      amharicEl.scrollTop = scrollRatio * (amharicEl.scrollHeight - amharicEl.clientHeight);
      setTimeout(() => { isScrolling.current = false; }, 50);
    };

    amharicEl.addEventListener("scroll", handleAmharicScroll);
    englishEl.addEventListener("scroll", handleEnglishScroll);

    return () => {
      amharicEl.removeEventListener("scroll", handleAmharicScroll);
      englishEl.removeEventListener("scroll", handleEnglishScroll);
    };
  }, [translationView]);

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
    <div className="flex flex-col h-screen bg-[#000]">
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 bg-[#1c1c1e] border-b border-white/5"
        style={{ paddingTop: 44 }}
      >
        <button
          onClick={() => setShowBookPicker(true)}
          className="flex items-center gap-1"
        >
          <span className="text-white text-[17px] font-semibold">
            {selectedBook.amharic}
          </span>
          <span className="text-white/60 text-[15px]">{chapter}</span>
          <ChevronDown className="w-4 h-4 text-white/60" />
        </button>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-[#2c2c2e] rounded-lg p-1">
            <button 
              onClick={() => setTranslationView("amharic")}
              className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium ${translationView === "amharic" ? 'bg-[#0a84ff] text-white' : 'text-white/70'}`}
            >
              አማ
            </button>
            <button 
              onClick={() => setTranslationView("both")}
              className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium ${translationView === "both" ? 'bg-[#0a84ff] text-white' : 'text-white/70'}`}
            >
              አማ+ENG
            </button>
            <button 
              onClick={() => {
                setTranslationView("english");
                setShowEnglish(true);
              }}
              className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium ${translationView === "english" ? 'bg-[#0a84ff] text-white' : 'text-white/70'}`}
            >
              ENG
            </button>
          </div>
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
      <main className="flex-1 overflow-y-auto px-4 py-2">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-white/50">Loading...</span>
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
                        {verse === "" && index < verses.length - 1 && verses[index + 1] !== "" 
                          ? `${index + 1}-${index + 2}` 
                          : index + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <p className="text-[#f5f5f7] text-[18px] leading-[1.6]">
                          {verse === "" && index < verses.length - 1 ? verses[index + 1] : verse}
                        </p>
                      </div>
                    </div>
                    {selectedVerse === index + 1 && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="flex-1 py-2.5 bg-[#3a3a3c] text-[#ff9f0a] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2"
                        >
                          <Highlighter className="w-4 h-4" />
                          Highlight
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="flex-1 py-2.5 bg-[#0a84ff] text-white text-[15px] rounded-full font-medium active:bg-[#007aff] flex items-center justify-center gap-2"
                        >
                          <Bookmark className="w-4 h-4" />
                          Bookmark
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : translationView === "both" ? (
              <div className="flex flex-col h-full">
                <div ref={amharicScrollRef} className="flex-1 overflow-y-auto border-b border-white/10">
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
                        className={`py-3 px-2 rounded-[10px] transition-all ${selectedVerse === index + 1 ? "bg-[#2c2c2e]" : "active:bg-[#2c2c2e]/50"}`}
                      >
                        <div className="flex gap-3">
                          <span className="text-[#0a84ff] font-medium text-[14px] w-8 mt-0.5">
                            {verse === "" && index < verses.length - 1 && verses[index + 1] !== "" 
                              ? `${index + 1}-${index + 2}` 
                              : index + 1}
                          </span>
                          <p className="text-[#f5f5f7] text-[18px] leading-[1.6]">
                            {verse === "" && index < verses.length - 1 ? verses[index + 1] : verse}
                          </p>
                        </div>
                        {selectedVerse === index + 1 && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex-1 py-2.5 bg-[#3a3a3c] text-[#ff9f0a] text-[15px] rounded-full font-medium active:bg-[#48484a] flex items-center justify-center gap-2"
                            >
                              <Highlighter className="w-4 h-4" />
                              Highlight
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex-1 py-2.5 bg-[#0a84ff] text-white text-[15px] rounded-full font-medium active:bg-[#007aff] flex items-center justify-center gap-2"
                            >
                              <Bookmark className="w-4 h-4" />
                              Bookmark
                            </button>
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
                        className="py-3 px-2 rounded-[10px] active:bg-[#2c2c2e]/50"
                      >
                        <div className="flex gap-3">
                          <span className="text-[#8e8e93] font-medium text-[14px] w-8 mt-0.5">
                            {index + 1}
                          </span>
                          <p className="text-[#f5f5f7] text-[16px] leading-[1.5]">
                            {verse}
                          </p>
                        </div>
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
                    className="py-3 px-2 rounded-[10px] active:bg-[#2c2c2e]/50"
                  >
                    <div className="flex gap-3">
                      <span className="text-[#8e8e93] font-medium text-[14px] w-8 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-[#f5f5f7] text-[16px] leading-[1.5]">
                        {verse}
                      </p>
                    </div>
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
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[20px] max-h-[80vh] overflow-hidden animate-slide-up">
            <div className="flex justify-center pt-3 pb-1">
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
                    key={book.file}
                    onClick={() => {
                      setSelectedBook(book);
                      setChapter(1);
                      setShowBookPicker(false);
                    }}
                    className={`p-3 rounded-lg text-left transition-colors ${selectedBook.name === book.name ? "bg-[#0a84ff] text-white" : "bg-[#2c2c2e] text-white/90 hover:bg-[#3a3a3c]"}`}
                  >
                    <div className="text-[15px] font-medium">
                      {book.amharic}
                    </div>
                    <div className="text-[13px] opacity-70">
                      {book.chapters} ክፍሎች
                    </div>
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
