export const shouldShowVerse = (verses: string[], index: number): boolean => {
  const verse = verses[index];
  if (verse !== "" && verse !== "-") return true;
  return false;
};

export const getVerseLabel = (verses: string[], index: number): string => {
  const current = index + 1;

  let endVerse = current;
  for (let i = index + 1; i < verses.length; i++) {
    if (verses[i] === "" || verses[i] === "-") {
      endVerse = i + 1;
    } else {
      break;
    }
  }

  if (endVerse > current) {
    return `${current}-${endVerse}`;
  }

  return current.toString();
};

export const isBookmarked = (bookmarks: any[], selectedBook: any, chapter: number, verseNum: number): boolean => {
  const id = `${selectedBook.name.toLowerCase()}-${chapter}-${verseNum}`;
  return bookmarks.some((b) => b.id === id);
};

export const getBookmarkId = (selectedBook: any, chapter: number, verseNum: number): string => {
  return `${selectedBook.name.toLowerCase()}-${chapter}-${verseNum}`;
};

export const getHighlight = (highlights: Record<string, string>, selectedBook: any, chapter: number, verseNum: number): string | null => {
  const id = getBookmarkId(selectedBook, chapter, verseNum);
  return highlights[id] || null;
};

export const findNextChapter = (selectedBook: any, chapter: number, amharicBooks: any[]) => {
  if (chapter < selectedBook.chapters) {
    return { book: selectedBook, chapter: chapter + 1 };
  }
  const currentBookIndex = amharicBooks.findIndex((b) => b.name === selectedBook.name);
  if (currentBookIndex < amharicBooks.length - 1) {
    return { book: amharicBooks[currentBookIndex + 1], chapter: 1 };
  }
  return null;
};

export const findPreviousChapter = (selectedBook: any, chapter: number, amharicBooks: any[]) => {
  if (chapter > 1) {
    return { book: selectedBook, chapter: chapter - 1 };
  }
  const currentBookIndex = amharicBooks.findIndex((b) => b.name === selectedBook.name);
  if (currentBookIndex > 0) {
    return { book: amharicBooks[currentBookIndex - 1], chapter: amharicBooks[currentBookIndex - 1].chapters };
  }
  return null;
};

export const formatVerseForCopy = (
  selectedBook: any,
  chapter: number,
  verseNum: number,
  verses: string[],
  englishVerses: string[],
  getVerseLabelFn: (verses: string[], index: number) => string
): string => {
  const amharicText = verses[verseNum - 1] || "";
  const englishText = englishVerses[verseNum - 1] || "";
  const verseLabel = getVerseLabelFn(verses, verseNum - 1);

  return `${selectedBook.amharic} ${chapter}:${verseLabel}\n${selectedBook.name} ${chapter}:${verseLabel}\n\n${amharicText}\n\n${englishText}`;
};

export const copyVerseToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};
