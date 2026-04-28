type Props = {
  chapter: number;
  totalChapters: number;
  onPrev: () => void;
  onNext: () => void;
  t: any;
};

import { ChevronLeft, ChevronRight } from "lucide-react";

export function ChapterNavigation({
  chapter,
  totalChapters,
  onPrev,
  onNext,
  t,
}: Props) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-2 ${t.bgSecondary} backdrop-blur-xl border-b ${t.border}`}
    >
      {/* Prev */}
      <button
        onClick={onPrev}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200`}
      >
        <ChevronLeft className={`w-4 h-4 ${t.textSecondary}`} />
        <span className={`${t.textSecondary} text-sm font-medium`}>Prev</span>
      </button>

      {/* Center info */}
      <div className="text-center">
        <span className={`${t.textTertiary} text-xs`}>
          Ch. {chapter} / {totalChapters}
        </span>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200`}
      >
        <span className={`${t.textSecondary} text-sm font-medium`}>Next</span>
        <ChevronRight className={`w-4 h-4 ${t.textSecondary}`} />
      </button>
    </div>
  );
}
