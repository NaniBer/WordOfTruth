import { HIGHLIGHT_LABELS } from "@/app/constants/themes";
import { SavedGroup } from "./SavedGroup";

type Props = {
  highlights: Record<string, any>;
  highlightColors: string[];
  amharicBooks: any[];
  setSelectedBook: (b: any) => void;
  setChapter: (n: number) => void;
  setActiveTab: (tab: string) => void;
  removeHighlight: (id: string) => void;
  t: any;
};

export function SavedVersesView({
  highlights,
  highlightColors,
  amharicBooks,
  setSelectedBook,
  setChapter,
  setActiveTab,
  removeHighlight,
  t,
}: Props) {
  const saved = Object.values(highlights);

  return (
    <div className="py-4 space-y-4">
      <div className={`${t.textSecondary} text-lg font-bold px-1`}>
        <span
          className={`bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}
        >
          Saved
        </span>{" "}
        Verses ({saved.length})
      </div>

      {saved.length === 0 ? (
        <div className={`${t.textTertiary} text-center py-16`}>
          <p className="text-sm">No saved verses yet</p>
          <p className="text-xs mt-1">Highlight verses to save them</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[0, 1, 2].map((colorIdx) => {
            const color = highlightColors[colorIdx];
            const group = saved.filter((h: any) => h.colorIdx === colorIdx);

            if (!group.length) return null;

            return (
              <SavedGroup
                key={colorIdx}
                color={color}
                label={HIGHLIGHT_LABELS[colorIdx]}
                items={group}
                t={t}
                onOpen={(h: any) => {
                  const book = amharicBooks.find((b) => b.name === h.bookName);
                  if (book) {
                    setSelectedBook(book);
                    setChapter(h.chapter);
                    setActiveTab("bible");
                  }
                }}
                onRemove={removeHighlight}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
