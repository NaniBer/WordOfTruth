"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  booksForTestament,
  getTestament,
  type Testament,
} from "../constants/books";
import type { ThemeConfig } from "../constants/themes";
import type { TranslationView } from "../constants/translations";
import type { Book } from "../types/book";
import { BottomSheet } from "./BottomSheet";

interface BookPickerProps {
  t: ThemeConfig;
  selectedBook: Book;
  translationView: TranslationView;
  onSelectBook: (book: Book) => void;
  onClose: () => void;
}

const TESTAMENT_LABELS: Record<Testament, string> = {
  old: "Old Testament",
  new: "New Testament",
};

export function BookPicker({
  t,
  selectedBook,
  translationView,
  onSelectBook,
  onClose,
}: BookPickerProps) {
  // Starts on the testament of the current book; the tab is local to this sheet.
  const [testament, setTestament] = useState<Testament>(() => getTestament(selectedBook));
  const useAmharicNames = translationView === "amharic";

  return (
    <BottomSheet
      onClose={onClose}
      t={t}
      swipeToDismiss
      header={
        <>
          <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
            <h2 className={`${t.text} text-lg font-bold`}>Select Book</h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full ${t.surface} flex items-center justify-center ${t.textSecondary}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex px-4 py-2.5 gap-2">
            {(["old", "new"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setTestament(value)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  testament === value
                    ? `${t.buttonBg} text-white shadow-lg`
                    : `${t.surface} ${t.textSecondary}`
                }`}
              >
                {TESTAMENT_LABELS[value]}
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="px-4 pb-4 overflow-y-auto max-h-[60vh]">
        <div className="grid grid-cols-2 gap-2">
          {booksForTestament(testament).map((book) => {
            const isSelected = selectedBook.name === book.name;
            return (
              <button
                key={book.name}
                onClick={() => onSelectBook(book)}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 ${
                  isSelected
                    ? `${t.buttonBg} text-white shadow-lg`
                    : `${t.surface} ${t.text} hover:${t.surfaceActive}`
                }`}
              >
                <div className="text-sm font-semibold">
                  {useAmharicNames ? book.amharic : book.name}
                </div>
                <div
                  className={`text-xs mt-0.5 ${isSelected ? "text-white/70" : t.textTertiary}`}
                >
                  {book.chapters} {useAmharicNames ? "ክፍሎች" : "chapters"}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </BottomSheet>
  );
}
