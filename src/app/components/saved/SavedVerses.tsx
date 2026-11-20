import { BIBLE_BOOKS } from "@/app/constants/books";
import type { ThemeConfig } from "@/app/constants/themes";
import type { Book } from "@/app/types/book";
import {
  getAllHighlights,
  getHighlightId,
  type HighlightsMap,
} from "@/utils/highlights";

interface SavedVersesProps {
  highlights: HighlightsMap;
  t: ThemeConfig;
  onOpenVerse: (book: Book, chapter: number, verse: number) => void;
  onRemove: (id: string) => void;
}

export function SavedVersesView({ highlights, t, onOpenVerse, onRemove }: SavedVersesProps) {
  const saved = getAllHighlights(highlights);
  const colors = t.highlightColors;

  return (
    <div className="py-6 space-y-4">
      <div className={`${t.textSecondary} text-lg font-bold px-1`}>
        Saved Verses ({saved.length})
      </div>

      {saved.length === 0 ? (
        <div className={`${t.textTertiary} text-center py-16`}>
          <p className="text-sm">No saved verses yet</p>
          <p className="text-xs mt-1">Select a verse and tap a color to save it</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {saved.map((h) => {
            const id = getHighlightId(h.bookName, h.chapter, h.verse);
            const color = colors[h.colorIdx];

            return (
              <div
                key={id}
                className={`${t.surface} rounded-2xl overflow-hidden transition-all duration-200 backdrop-blur-sm`}
              >
                <button
                  onClick={() => {
                    const book = BIBLE_BOOKS.find((b) => b.name === h.bookName);
                    if (book) onOpenVerse(book, h.chapter, h.verse);
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

                <button
                  onClick={() => onRemove(id)}
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
