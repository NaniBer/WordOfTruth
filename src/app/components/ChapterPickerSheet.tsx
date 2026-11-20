"use client";

import type { ThemeConfig } from "../constants/themes";
import type { TranslationView } from "../constants/translations";
import type { Book } from "../types/book";
import { BottomSheet } from "./BottomSheet";

interface ChapterPickerSheetProps {
  t: ThemeConfig;
  book: Book;
  chapter: number;
  translationView: TranslationView;
  onSelectChapter: (chapter: number) => void;
  /** Closes this sheet and returns to the book picker. */
  onBack: () => void;
  /** Closes this sheet and the book picker. */
  onDone: () => void;
}

export function ChapterPickerSheet({
  t,
  book,
  chapter,
  translationView,
  onSelectChapter,
  onBack,
  onDone,
}: ChapterPickerSheetProps) {
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <BottomSheet
      onClose={onBack}
      t={t}
      maxHeight="max-h-[80vh]"
      header={
        <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
          <button onClick={onBack} className={`${t.primary} text-sm font-semibold`}>
            Back
          </button>
          <h2 className={`${t.text} text-lg font-bold`}>
            {translationView === "amharic" ? book.amharic : book.name}
          </h2>
          <button onClick={onDone} className={`${t.primary} text-sm font-semibold`}>
            Done
          </button>
        </div>
      }
    >
      <div className="p-4 overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-5 gap-2">
          {chapters.map((ch) => (
            <button
              key={ch}
              onClick={() => onSelectChapter(ch)}
              className={`p-3 rounded-xl text-center font-semibold transition-all duration-200 ${
                chapter === ch
                  ? `${t.buttonBg} text-white shadow-lg`
                  : `${t.surface} ${t.text} hover:${t.surfaceActive}`
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
