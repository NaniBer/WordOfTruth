import type { Book } from "@/app/types/book";

type ChapterLocation<B> = { book: B; chapter: number };

/** Verses are stored as "" or "-" when a verse is absent from a translation. */
const isEmptyVerse = (verse: string | undefined): boolean =>
  verse === "" || verse === "-";

export const shouldShowVerse = (verses: string[], index: number): boolean =>
  !isEmptyVerse(verses[index]);

/**
 * Label for the verse at `index`. A run of empty verses that follows it is
 * folded into the label, so `["a", "", "", "d"]` labels index 0 as "1-3".
 */
export const getVerseLabel = (verses: string[], index: number): string => {
  const current = index + 1;

  let endVerse = current;
  for (let i = index + 1; i < verses.length && isEmptyVerse(verses[i]); i++) {
    endVerse = i + 1;
  }

  return endVerse > current ? `${current}-${endVerse}` : current.toString();
};

/** The chapter that follows `chapter`, moving into the next book when needed. Null at the end of the Bible. */
export const findNextChapter = <B extends Pick<Book, "name" | "chapters">>(
  book: B,
  chapter: number,
  books: readonly B[],
): ChapterLocation<B> | null => {
  if (chapter < book.chapters) return { book, chapter: chapter + 1 };

  const index = books.findIndex((b) => b.name === book.name);
  const next = books[index + 1];
  return index !== -1 && next ? { book: next, chapter: 1 } : null;
};

/** The chapter that precedes `chapter`, moving into the previous book when needed. Null at the start of the Bible. */
export const findPreviousChapter = <B extends Pick<Book, "name" | "chapters">>(
  book: B,
  chapter: number,
  books: readonly B[],
): ChapterLocation<B> | null => {
  if (chapter > 1) return { book, chapter: chapter - 1 };

  const index = books.findIndex((b) => b.name === book.name);
  const prev = index > 0 ? books[index - 1] : undefined;
  return prev ? { book: prev, chapter: prev.chapters } : null;
};

export const formatVerseForCopy = (
  book: Pick<Book, "name" | "amharic">,
  chapter: number,
  verseNum: number,
  verses: string[],
  englishVerses: string[],
  getLabel: (verses: string[], index: number) => string,
): string => {
  const amharicText = verses[verseNum - 1] || "";
  const englishText = englishVerses[verseNum - 1] || "";
  const label = getLabel(verses, verseNum - 1);

  return `${book.amharic} ${chapter}:${label}\n${book.name} ${chapter}:${label}\n\n${amharicText}\n\n${englishText}`;
};

/**
 * Formats several verses for copying, in chapter order, one block per verse.
 * Verses that are empty in both translations are left out.
 */
export const formatVersesForCopy = (
  book: Pick<Book, "name" | "amharic">,
  chapter: number,
  verseNums: readonly number[],
  verses: string[],
  englishVerses: string[],
  getLabel: (verses: string[], index: number) => string,
): string =>
  [...verseNums]
    .sort((a, b) => a - b)
    .filter((n) => verses[n - 1] || englishVerses[n - 1])
    .map((n) => formatVerseForCopy(book, chapter, n, verses, englishVerses, getLabel))
    .join("\n\n");

/** Legacy path for browsers or non-secure origins where the async Clipboard API is unavailable. */
const copyWithExecCommand = (text: string): boolean => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  try {
    textArea.focus();
    textArea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textArea.remove();
  }
};

/** Copies text, falling back to execCommand when the Clipboard API is unavailable. Resolves to whether the copy succeeded. */
export const copyVerseToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
  return copyWithExecCommand(text);
};
