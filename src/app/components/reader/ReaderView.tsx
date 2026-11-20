"use client";

import { useEffect, useRef } from "react";
import { getVerseLabel, shouldShowVerse } from "@/utils/bibleHelpers";
import { CustomSelect } from "../CustomSelect";
import type { ThemeConfig } from "../../constants/themes";
import {
  ENGLISH_VERSION_OPTIONS,
  type EnglishVersion,
  type TranslationView,
} from "../../constants/translations";
import type { Book } from "../../types/book";
import { VerseRow } from "./VerseRow";

interface ReaderViewProps {
  t: ThemeConfig;
  book: Book;
  translationView: TranslationView;
  verses: string[];
  englishVerses: string[];
  englishVersion: EnglishVersion;
  setEnglishVersion: (version: EnglishVersion) => void;
  fontSize: string;
  selectedVerse: number | null;
  selectionMode: boolean;
  checkedVerses: readonly number[];
  onTapVerse: (verseNum: number) => void;
  getHighlightIdx: (verseNum: number) => number | null;
  onHighlight: (verseNum: number, colorIdx: number | null) => void;
  onCopy: (verseNum: number) => void;
}

export function ReaderView({
  t,
  book,
  translationView,
  verses,
  englishVerses,
  englishVersion,
  setEnglishVersion,
  fontSize,
  selectedVerse,
  selectionMode,
  checkedVerses,
  onTapVerse,
  getHighlightIdx,
  onHighlight,
  onCopy,
}: ReaderViewProps) {
  const amharicScrollRef = useRef<HTMLDivElement>(null);
  const englishScrollRef = useRef<HTMLDivElement>(null);
  const isSyncingScroll = useRef(false);

  // In side-by-side mode, scrolling one column scrolls the other to the same relative position.
  useEffect(() => {
    if (translationView !== "both") return;
    const amharicEl = amharicScrollRef.current;
    const englishEl = englishScrollRef.current;
    if (!amharicEl || !englishEl) return;

    const mirror = (source: HTMLElement, target: HTMLElement) => {
      if (isSyncingScroll.current) return;
      const sourceMax = source.scrollHeight - source.clientHeight;
      const targetMax = target.scrollHeight - target.clientHeight;
      if (sourceMax <= 0 || targetMax <= 0) return;

      isSyncingScroll.current = true;
      target.scrollTop = (source.scrollTop / sourceMax) * targetMax;
      // The scroll event fired by the write above must not mirror back.
      setTimeout(() => {
        isSyncingScroll.current = false;
      }, 50);
    };

    const onAmharicScroll = () => mirror(amharicEl, englishEl);
    const onEnglishScroll = () => mirror(englishEl, amharicEl);
    amharicEl.addEventListener("scroll", onAmharicScroll);
    englishEl.addEventListener("scroll", onEnglishScroll);
    return () => {
      amharicEl.removeEventListener("scroll", onAmharicScroll);
      englishEl.removeEventListener("scroll", onEnglishScroll);
    };
  }, [translationView, verses, englishVerses]);

  const renderVerses = (data: string[], isEnglish: boolean) => (
    <div className="space-y-1 py-1">
      {data.map((text, index) => {
        if (!shouldShowVerse(data, index)) return null;
        const verseNum = index + 1;
        return (
          <VerseRow
            key={verseNum}
            t={t}
            verseNum={verseNum}
            text={text}
            label={isEnglish ? verseNum.toString() : getVerseLabel(data, index)}
            isSelected={!selectionMode && selectedVerse === verseNum}
            selectionMode={selectionMode}
            isChecked={checkedVerses.includes(verseNum)}
            highlightIdx={getHighlightIdx(verseNum)}
            fontSize={fontSize}
            onSelect={() => onTapVerse(verseNum)}
            onHighlight={(colorIdx) => onHighlight(verseNum, colorIdx)}
            onCopy={() => onCopy(verseNum)}
          />
        );
      })}
    </div>
  );

  if (translationView !== "both") {
    const isEnglish = translationView === "english";
    return (
      <div className="space-y-1">
        {renderVerses(isEnglish ? englishVerses : verses, isEnglish)}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div ref={amharicScrollRef} className="flex-1 overflow-y-auto rounded-2xl">
        {renderVerses(verses, false)}
      </div>

      <div ref={englishScrollRef} className="flex-1 overflow-y-auto rounded-2xl">
        <div
          className={`sticky top-0 ${t.bgSecondary} border-b ${t.border} px-4 py-2 flex items-center justify-between`}
        >
          <span className={`${t.text} text-sm font-bold`}>{book.abbrEnglish}</span>
          <CustomSelect
            value={englishVersion}
            options={ENGLISH_VERSION_OPTIONS}
            onChange={setEnglishVersion}
            t={t}
            minWidth="60px"
          />
        </div>
        {renderVerses(englishVerses, true)}
      </div>
    </div>
  );
}
