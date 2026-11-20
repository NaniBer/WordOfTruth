import { ChevronDown, ListChecks, Search } from "lucide-react";
import type { ThemeConfig } from "../constants/themes";
import {
  AMHARIC_VERSION_OPTIONS,
  ENGLISH_VERSION_OPTIONS,
  type AmharicVersion,
  type EnglishVersion,
  type TranslationView,
} from "../constants/translations";
import type { Book } from "../types/book";
import { CustomSelect } from "./CustomSelect";

interface HeaderProps {
  t: ThemeConfig;
  selectedBook: Book;
  chapter: number;
  translationView: TranslationView;
  setTranslationView: (view: TranslationView) => void;
  setShowBookPicker: (show: boolean) => void;
  englishVersion: EnglishVersion;
  setEnglishVersion: (version: EnglishVersion) => void;
  amharicVersion: AmharicVersion;
  setAmharicVersion: (version: AmharicVersion) => void;
  onSearchClick: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  /** False at the start of the Bible; the Prev button is disabled. */
  hasPrevChapter: boolean;
  /** False at the end of the Bible; the Next button is disabled. */
  hasNextChapter: boolean;
  selectionMode: boolean;
  onToggleSelection: () => void;
}

const VIEW_OPTIONS: { value: TranslationView; label: string }[] = [
  { value: "amharic", label: "አማ" },
  { value: "both", label: "አማ+EN" },
  { value: "english", label: "EN" },
];

const ChevronIcon = ({ className, d }: { className: string; d: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

export const Header = ({
  t,
  selectedBook,
  chapter,
  translationView,
  setTranslationView,
  setShowBookPicker,
  englishVersion,
  setEnglishVersion,
  amharicVersion,
  setAmharicVersion,
  onSearchClick,
  onPrevChapter,
  onNextChapter,
  hasPrevChapter,
  hasNextChapter,
  selectionMode,
  onToggleSelection,
}: HeaderProps) => {
  const showEnglishVersion = translationView === "english" || translationView === "both";
  const showAmharicVersion = translationView === "amharic" || translationView === "both";

  return (
    <>
      {/* Book, chapter and search */}
      <header
        className={`relative z-30 flex items-center justify-between px-4 py-2 ${t.navBg} backdrop-blur-2xl border-b ${t.border}`}
        style={{ paddingTop: 44 }}
      >
        <button
          onClick={() => setShowBookPicker(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
        >
          <span className={`text-base font-bold ${t.primary}`}>
            {translationView === "english"
              ? selectedBook.abbrEnglish
              : selectedBook.abbr || selectedBook.amharic.slice(0, 4)}
          </span>
          <span className={`${t.primary} text-sm font-medium`}>{chapter}</span>
          <ChevronDown className={`w-3.5 h-3.5 ${t.textTertiary}`} />
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={onToggleSelection}
            aria-label={selectionMode ? "Cancel selection" : "Select multiple verses"}
            aria-pressed={selectionMode}
            className={`p-2 rounded-xl hover:bg-white/[0.06] transition-all ${
              selectionMode ? t.primary : t.textSecondary
            }`}
          >
            <ListChecks className="w-[20px] h-[20px]" />
          </button>
          <button
            onClick={onSearchClick}
            aria-label="Search"
            className={`p-2 rounded-xl hover:bg-white/[0.06] transition-all ${t.textSecondary}`}
          >
            <Search className="w-[20px] h-[20px]" />
          </button>
        </div>
      </header>

      {/* Previous / next chapter */}
      <div className={`flex items-center justify-between px-5 py-2 ${t.bgSecondary} backdrop-blur-xl border-b ${t.border}`}>
        <button
          onClick={onPrevChapter}
          disabled={!hasPrevChapter}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none`}
        >
          <ChevronIcon className={`w-4 h-4 ${t.textSecondary}`} d="M15 19l-7-7 7-7" />
          <span className={`${t.textSecondary} text-sm font-medium`}>Prev</span>
        </button>

        <div className="text-center">
          <span className={`${t.textTertiary} text-xs`}>
            Ch. {chapter} / {selectedBook.chapters}
          </span>
        </div>

        <button
          onClick={onNextChapter}
          disabled={!hasNextChapter}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none`}
        >
          <span className={`${t.textSecondary} text-sm font-medium`}>Next</span>
          <ChevronIcon className={`w-4 h-4 ${t.textSecondary}`} d="M9 5l7 7-7 7" />
        </button>
      </div>

      {/* Language selector and translation versions */}
      <div className={`flex items-center justify-between px-4 py-2 ${t.navBg} border-b ${t.border}`}>
        <div className={`flex items-center gap-0.5 ${t.bgTertiary} rounded-xl p-1 backdrop-blur-sm`}>
          {VIEW_OPTIONS.map((view) => (
            <button
              key={view.value}
              onClick={() => setTranslationView(view.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                translationView === view.value
                  ? `${t.buttonBg} text-white shadow-md`
                  : `${t.textTertiary} hover:${t.textSecondary}`
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {showEnglishVersion && (
            <CustomSelect
              value={englishVersion}
              options={ENGLISH_VERSION_OPTIONS}
              onChange={setEnglishVersion}
              t={t}
              minWidth="60px"
            />
          )}
          {showAmharicVersion && (
            <CustomSelect
              value={amharicVersion}
              options={AMHARIC_VERSION_OPTIONS}
              onChange={setAmharicVersion}
              t={t}
              minWidth="75px"
            />
          )}
        </div>
      </div>
    </>
  );
};
