import { Book } from "@/app/types/book";

interface HighlightData {
  colorIdx: number;
  bookName: string;
  bookAmharic: string;
  chapter: number;
  verse: number;
  amharic: string;
  english: string;
  timestamp: number;
}

interface SavedVersesProps {
  highlights: Record<string, HighlightData>;
  highlightColors: string[];
  amharicBooks: Book[];
  setSelectedBook: (book: Book) => void;
  setChapter: (chapter: number) => void;
  setSelectedVerse: (verse: number | null) => void;
  setActiveTab: (tab: string) => void;
  removeHighlight: (id: string) => void;
  t: {
    textSecondary: string;
    primary: string;
    textTertiary: string;
    text: string;
    surface: string;
    surfaceActive: string;
    highlightBg: [string, string, string];
    verseText: string;
  };
}

export function SavedVersesView({
  highlights,
  highlightColors,
  amharicBooks,
  setSelectedBook,
  setChapter,
  setSelectedVerse,
  setActiveTab,
  removeHighlight,
  t,
}: SavedVersesProps) {
  const saved = Object.values(highlights)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="py-6 space-y-4">
      <div className={`${t.textSecondary} text-lg font-bold px-1`}>
        <span className={t.primary}>
          Saved
        </span>{" "}
        Verses ({saved.length})
      </div>

      {saved.length === 0 ? (
        <div className={`${t.textTertiary} text-center py-16`}>
          <p className="text-sm">No saved verses yet</p>
          <p className="text-xs mt-1">Select a verse and tap a color to save it</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {saved.map((h) => {
            const id = `${h.bookName.toLowerCase()}-${h.chapter}-${h.verse}`;
            const color = highlightColors[h.colorIdx];

            return (
              <div
                key={id}
                className={`${t.surface} rounded-2xl overflow-hidden transition-all duration-200 backdrop-blur-sm`}
              >
                {/* Color bar + Header row */}
                <button
                  onClick={() => {
                    const book = amharicBooks.find((b) => b.name === h.bookName);
                    if (book) {
                      setSelectedBook(book);
                      setChapter(h.chapter);
                      setSelectedVerse(h.verse);
                      setActiveTab("bible");
                    }
                  }}
                  className={`w-full text-left p-4 border-l-4 ${t.highlightBg[h.colorIdx]} hover:${t.surfaceActive} transition-all`}
                  style={{ borderLeftColor: color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${t.text} text-sm font-bold`}>
                      {h.bookAmharic} {h.chapter}:{h.verse}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
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

                {/* Remove button */}
                <button
                  onClick={() => removeHighlight(id)}
                  className={`w-full py-2.5 text-xs font-semibold ${t.textTertiary} hover:text-red-400 ${t.surfaceActive} border-t border-white/[0.05] transition-colors`}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
