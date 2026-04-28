import { ChevronDown, Search } from "lucide-react";
import { ThemeConfig } from "../constants/themes";
import { CustomSelect } from "./CustomSelect";

interface Book {
  name: string;
  amharic: string;
  abbr: string;
  chapters: number;
}

interface HeaderProps {
  t: ThemeConfig;
  selectedBook: Book;
  chapter: number;
  translationView: "amharic" | "english" | "both";
  setTranslationView: (view: "amharic" | "english" | "both") => void;
  setShowBookPicker: (show: boolean) => void;
  englishVersion: "niv" | "nlt" | "csb";
  setEnglishVersion: (version: "niv" | "nlt" | "csb") => void;
  amharicVersion: "amharic_bible" | "amharic_nasb";
  setAmharicVersion: (version: "amharic_bible" | "amharic_nasb") => void;
}

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
}: HeaderProps) => {
  return (
    <header
      className={`relative z-30 flex items-center justify-between px-4 py-2 ${t.navBg} backdrop-blur-2xl border-b ${t.border}`}
      style={{ paddingTop: 44 }}
    >
      <button
        onClick={() => setShowBookPicker(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
      >
        <div className={`bg-gradient-to-r ${t.bookGradient} bg-clip-text`}>
          <span className={`text-base font-bold ${t.text}`}>
            {translationView === "english"
              ? selectedBook.name
              : selectedBook.abbr || selectedBook.amharic.slice(0, 4)}
          </span>
        </div>

        <span className={`${t.textSecondary} text-sm font-medium`}>
          {chapter}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 ${t.textTertiary}`} />
      </button>

      <div className="flex items-center gap-1.5">
        <div
          className={`flex items-center gap-0.5 ${t.bgTertiary} rounded-xl p-1 backdrop-blur-sm`}
        >
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

        {translationView === "english" && (
          <CustomSelect
            value={englishVersion}
            options={[
              { value: "niv", label: "NIV" },
              { value: "nlt", label: "NLT" },
              { value: "csb", label: "CSB" },
            ]}
            onChange={(value) => setEnglishVersion(value as "niv" | "nlt" | "csb")}
            t={t}
            minWidth="60px"
          />
        )}

        {translationView === "amharic" && (
          <CustomSelect
            value={amharicVersion}
            options={[
              { value: "amharic_bible", label: "Haile Selassie" },
              { value: "amharic_nasb", label: "NASB" },
            ]}
            onChange={(value) => setAmharicVersion(value as "amharic_bible" | "amharic_nasb")}
            t={t}
            minWidth="90px"
          />
        )}

        <button
          className={`p-2 rounded-xl hover:bg-white/[0.06] transition-all ${t.textSecondary}`}
        >
          <Search className="w-[20px] h-[20px]" />
        </button>
      </div>
    </header>
  );
};