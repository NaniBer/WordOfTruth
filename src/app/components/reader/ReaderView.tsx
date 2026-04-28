import { RefObject, ReactElement } from "react";
import { ThemeConfig } from "../../constants/themes";
import { CustomSelect } from "../CustomSelect";

interface VerseItemProps {
  verse: string;
  index: number;
  versesArray: string[];
  isEnglish?: boolean;
}

interface Book {
  name: string;
  amharic: string;
  abbr: string;
  chapters: number;
}

interface ReaderViewProps {
  translationView: "amharic" | "english" | "both";
  verses: string[];
  englishVerses: string[];
  shouldShowVerse: (arr: string[], index: number) => boolean;
  englishVersion: "niv" | "nlt" | "csb";
  setEnglishVersion?: (version: "niv" | "nlt" | "csb") => void;
  amharicVersion: "amharic_bible" | "amharic_nasb";
  setAmharicVersion?: (version: "amharic_bible" | "amharic_nasb") => void;
  t: ThemeConfig;
  amharicScrollRef: RefObject<HTMLDivElement | null>;
  englishScrollRef: RefObject<HTMLDivElement | null>;
  VerseItem: (props: VerseItemProps) => ReactElement;
  selectedBook?: Book;
}

export function ReaderView({
  translationView,
  verses,
  englishVerses,
  shouldShowVerse,
  englishVersion,
  setEnglishVersion,
  amharicVersion,
  setAmharicVersion,
  t,
  amharicScrollRef,
  englishScrollRef,
  VerseItem,
  selectedBook,
}: ReaderViewProps) {
  const renderVerses = (data: string[], isEnglish?: boolean) => (
    <div className="space-y-1 py-1">
      {data.map((verse, index) =>
        shouldShowVerse(data, index) ? (
          <VerseItem
            key={index}
            verse={verse}
            index={index}
            versesArray={data}
            isEnglish={isEnglish}
          />
        ) : null,
      )}
    </div>
  );

  if (translationView !== "both") {
    const data = translationView === "amharic" ? verses : englishVerses;
    const isEnglish = translationView === "english";

    return <div className="space-y-1">{renderVerses(data, isEnglish)}</div>;
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div
        ref={amharicScrollRef}
        className="flex-1 overflow-y-auto rounded-2xl"
      >
        <div
          className={`sticky top-0 ${t.bgSecondary} border-b ${t.border} px-4 py-2 flex items-center justify-between`}
        >
          <span className={`${t.textSecondary} text-xs font-semibold uppercase tracking-wide`}>
            Amharic
          </span>
          {setAmharicVersion && (
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
        </div>
        {renderVerses(verses)}
      </div>

      <div
        ref={englishScrollRef}
        className="flex-1 overflow-y-auto rounded-2xl"
      >
        <div
          className={`sticky top-0 ${t.bgSecondary} border-b ${t.border} px-4 py-2 flex items-center justify-between`}
        >
          {selectedBook ? (
            <span className={`${t.text} text-sm font-bold`}>
              {selectedBook.name}
            </span>
          ) : (
            <span className={`${t.textSecondary} text-xs font-semibold uppercase tracking-wide`}>
              English
            </span>
          )}
          {setEnglishVersion && (
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
        </div>
        {renderVerses(englishVerses, true)}
      </div>
    </div>
  );
}