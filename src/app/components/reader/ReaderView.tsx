import { RefObject, ReactElement } from "react";
import { ThemeConfig } from "../../constants/themes";

interface VerseItemProps {
  verse: string;
  index: number;
  versesArray: string[];
  isEnglish?: boolean;
}

interface ReaderViewProps {
  translationView: "amharic" | "english" | "both";
  verses: string[];
  englishVerses: string[];
  shouldShowVerse: (arr: string[], index: number) => boolean;
  englishVersion: string;
  t: ThemeConfig;
  amharicScrollRef: RefObject<HTMLDivElement | null>;
  englishScrollRef: RefObject<HTMLDivElement | null>;
  VerseItem: (props: VerseItemProps) => ReactElement;
}

export function ReaderView({
  translationView,
  verses,
  englishVerses,
  shouldShowVerse,
  englishVersion,
  t,
  amharicScrollRef,
  englishScrollRef,
  VerseItem,
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
          className={`sticky top-0 z-10 ${t.bgSecondary} border-b ${t.border} px-4 py-2`}
        >
          Amharic
        </div>
        {renderVerses(verses)}
      </div>

      <div
        ref={englishScrollRef}
        className="flex-1 overflow-y-auto rounded-2xl"
      >
        <div
          className={`sticky top-0 z-10 ${t.bgSecondary} border-b ${t.border} px-4 py-2`}
        >
          English ({englishVersion.toUpperCase()})
        </div>
        {renderVerses(englishVerses, true)}
      </div>
    </div>
  );
}