import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  shouldShowVerse,
  getVerseLabel,
  isBookmarked,
  getBookmarkId,
  getHighlight,
  findNextChapter,
  findPreviousChapter,
  formatVerseForCopy,
  copyVerseToClipboard,
} from '@/utils/bibleHelpers';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('shouldShowVerse', () => {
  it('should return true for non-empty verses', () => {
    const verses = ['Verse 1', 'Verse 2', 'Verse 3'];
    expect(shouldShowVerse(verses, 0)).toBe(true);
    expect(shouldShowVerse(verses, 1)).toBe(true);
    expect(shouldShowVerse(verses, 2)).toBe(true);
  });

  it('should return false for empty verses', () => {
    const verses = ['', '-', 'Verse 3'];
    expect(shouldShowVerse(verses, 0)).toBe(false);
    expect(shouldShowVerse(verses, 1)).toBe(false);
  });

  it('should return true for empty string that is not a placeholder', () => {
    const verses = ['Verse 1', '   ', 'Verse 3'];
    expect(shouldShowVerse(verses, 0)).toBe(true);
    expect(shouldShowVerse(verses, 1)).toBe(true);
  });
});

describe('getVerseLabel', () => {
  it('should return single verse number when no empty verses follow', () => {
    const verses = ['Verse 1', 'Verse 2', 'Verse 3'];
    expect(getVerseLabel(verses, 0)).toBe('1');
    expect(getVerseLabel(verses, 1)).toBe('2');
    expect(getVerseLabel(verses, 2)).toBe('3');
  });

  it('should return range when empty verses follow', () => {
    const verses = ['Verse 1', '', '', 'Verse 4'];
    expect(getVerseLabel(verses, 0)).toBe('1-3');
    expect(getVerseLabel(verses, 1)).toBe('2-3');
    expect(getVerseLabel(verses, 2)).toBe('3');
    expect(getVerseLabel(verses, 3)).toBe('4');
  });

  it('should handle multiple consecutive empty verses', () => {
    const verses = ['Verse 1', '', '-', '', 'Verse 5'];
    expect(getVerseLabel(verses, 0)).toBe('1-4');
    expect(getVerseLabel(verses, 4)).toBe('5');
  });

  it('should handle edge cases', () => {
    const verses = ['Verse 1', ''];
    expect(getVerseLabel(verses, 0)).toBe('1-2');
    expect(getVerseLabel(verses, 1)).toBe('2');
  });
});

describe('getBookmarkId', () => {
  it('should generate correct bookmark ID', () => {
    const book = { name: 'Genesis', chapters: 50 };
    expect(getBookmarkId(book, 1, 5)).toBe('genesis-1-5');
  });

  it('should handle book names with spaces', () => {
    const book = { name: '1 Samuel', chapters: 31 };
    expect(getBookmarkId(book, 10, 15)).toBe('1 samuel-10-15');
  });

  it('should convert to lowercase', () => {
    const book = { name: 'GENESIS', chapters: 50 };
    expect(getBookmarkId(book, 1, 1)).toBe('genesis-1-1');
  });
});

describe('isBookmarked', () => {
  it('should return true when verse is bookmarked', () => {
    const bookmarks = [
      { id: 'genesis-1-1', verse: 1 },
      { id: 'genesis-1-2', verse: 2 },
    ];
    const book = { name: 'Genesis', chapters: 50 };
    expect(isBookmarked(bookmarks, book, 1, 1)).toBe(true);
    expect(isBookmarked(bookmarks, book, 1, 2)).toBe(true);
  });

  it('should return false when verse is not bookmarked', () => {
    const bookmarks = [
      { id: 'genesis-1-1', verse: 1 },
    ];
    const book = { name: 'Genesis', chapters: 50 };
    expect(isBookmarked(bookmarks, book, 1, 2)).toBe(false);
    expect(isBookmarked(bookmarks, book, 2, 1)).toBe(false);
  });

  it('should handle empty bookmarks array', () => {
    const bookmarks: any[] = [];
    const book = { name: 'Genesis', chapters: 50 };
    expect(isBookmarked(bookmarks, book, 1, 1)).toBe(false);
  });
});

describe('getHighlight', () => {
  it('should return highlight color when verse is highlighted', () => {
    const highlights = {
      'genesis-1-1': '#ffeb3b',
      'genesis-1-2': '#4caf50',
    };
    const book = { name: 'Genesis', chapters: 50 };
    expect(getHighlight(highlights, book, 1, 1)).toBe('#ffeb3b');
    expect(getHighlight(highlights, book, 1, 2)).toBe('#4caf50');
  });

  it('should return null when verse is not highlighted', () => {
    const highlights = {
      'genesis-1-1': '#ffeb3b',
    };
    const book = { name: 'Genesis', chapters: 50 };
    expect(getHighlight(highlights, book, 1, 2)).toBe(null);
  });

  it('should handle empty highlights object', () => {
    const highlights: Record<string, string> = {};
    const book = { name: 'Genesis', chapters: 50 };
    expect(getHighlight(highlights, book, 1, 1)).toBe(null);
  });
});

describe('findNextChapter', () => {
  const mockBooks = [
    { name: 'Genesis', chapters: 50 },
    { name: 'Exodus', chapters: 40 },
    { name: 'Leviticus', chapters: 27 },
  ];

  it('should return next chapter in same book', () => {
    const book = mockBooks[0];
    expect(findNextChapter(book, 10, mockBooks)).toEqual({ book, chapter: 11 });
    expect(findNextChapter(book, 49, mockBooks)).toEqual({ book, chapter: 50 });
  });

  it('should return first chapter of next book', () => {
    const book = mockBooks[0];
    expect(findNextChapter(book, 50, mockBooks)).toEqual({ book: mockBooks[1], chapter: 1 });
  });

  it('should return null for last chapter of last book', () => {
    const book = mockBooks[2];
    expect(findNextChapter(book, 27, mockBooks)).toBe(null);
  });

  it('should return next chapter even for book not in list', () => {
    const book = { name: 'Unknown', chapters: 10 };
    expect(findNextChapter(book, 5, mockBooks)).toEqual({ book, chapter: 6 });
  });
});

describe('findPreviousChapter', () => {
  const mockBooks = [
    { name: 'Genesis', chapters: 50 },
    { name: 'Exodus', chapters: 40 },
    { name: 'Leviticus', chapters: 27 },
  ];

  it('should return previous chapter in same book', () => {
    const book = mockBooks[1];
    expect(findPreviousChapter(book, 10, mockBooks)).toEqual({ book, chapter: 9 });
    expect(findPreviousChapter(book, 2, mockBooks)).toEqual({ book, chapter: 1 });
  });

  it('should return last chapter of previous book', () => {
    const book = mockBooks[1];
    expect(findPreviousChapter(book, 1, mockBooks)).toEqual({ book: mockBooks[0], chapter: 50 });
  });

  it('should return null for first chapter of first book', () => {
    const book = mockBooks[0];
    expect(findPreviousChapter(book, 1, mockBooks)).toBe(null);
  });

  it('should return previous chapter even for book not in list', () => {
    const book = { name: 'Unknown', chapters: 10 };
    expect(findPreviousChapter(book, 5, mockBooks)).toEqual({ book, chapter: 4 });
  });
});

describe('formatVerseForCopy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should format verse with both Amharic and English text', () => {
    const book = { name: 'Genesis', amharic: 'ኦሪት ዘፍጥረት', chapters: 50 };
    const verses = ['In the beginning God created', 'And the earth was'];
    const englishVerses = ['In the beginning God created the heaven', 'And the earth was without form'];

    const result = formatVerseForCopy(book, 1, 1, verses, englishVerses, getVerseLabel);

    expect(result).toContain('ኦሪት ዘፍጥረት 1:1');
    expect(result).toContain('Genesis 1:1');
    expect(result).toContain('In the beginning God created');
    expect(result).toContain('In the beginning God created the heaven');
  });

  it('should handle verse ranges correctly', () => {
    const book = { name: 'Genesis', amharic: 'ኦሪት ዘፍጥረት', chapters: 50 };
    const verses = ['Verse 1', '', '', 'Verse 4'];
    const englishVerses = ['English 1', '', '', 'English 4'];

    const result = formatVerseForCopy(book, 1, 1, verses, englishVerses, getVerseLabel);

    expect(result).toContain('ኦሪት ዘፍጥረት 1:1-3');
    expect(result).toContain('Genesis 1:1-3');
  });

  it('should handle missing English text', () => {
    const book = { name: 'Genesis', amharic: 'ኦሪት ዘፍጥረት', chapters: 50 };
    const verses = ['Amharic text only'];
    const englishVerses: string[] = [];

    const result = formatVerseForCopy(book, 1, 1, verses, englishVerses, getVerseLabel);

    expect(result).toContain('Amharic text only');
    expect(result).toContain('\n\n');
  });

  it('should handle missing Amharic text', () => {
    const book = { name: 'Genesis', amharic: 'ኦሪት ዘፍጥረት', chapters: 50 };
    const verses: string[] = [];
    const englishVerses = ['English text only'];

    const result = formatVerseForCopy(book, 1, 1, verses, englishVerses, getVerseLabel);

    expect(result).toContain('English text only');
  });

  it('should format verse number 2 correctly', () => {
    const book = { name: 'Psalms', amharic: 'መዝሙረ ዳዊት', chapters: 150 };
    const verses = ['Verse 1', 'Verse 2'];
    const englishVerses = ['English 1', 'English 2'];

    const result = formatVerseForCopy(book, 23, 2, verses, englishVerses, getVerseLabel);

    expect(result).toContain('መዝሙረ ዳዊት 23:2');
    expect(result).toContain('Psalms 23:2');
    expect(result).toContain('Verse 2');
    expect(result).toContain('English 2');
  });
});

describe('copyVerseToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (navigator.clipboard.writeText as any).mockResolvedValue(undefined);
  });

  it('should copy text to clipboard successfully', async () => {
    const text = 'Test verse text';
    const result = await copyVerseToClipboard(text);

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });

  it('should return false when clipboard write fails', async () => {
    const text = 'Test verse text';
    (navigator.clipboard.writeText as any).mockRejectedValue(new Error('Clipboard error'));

    const result = await copyVerseToClipboard(text);

    expect(result).toBe(false);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });

  it('should handle empty text', async () => {
    const text = '';
    const result = await copyVerseToClipboard(text);

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
  });

  it('should handle multiline text', async () => {
    const text = 'Line 1\nLine 2\nLine 3';
    const result = await copyVerseToClipboard(text);

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });

  it('should handle special characters in text', async () => {
    const text = 'አማርኛ Amharic Text בעברית Hebrew';
    const result = await copyVerseToClipboard(text);

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });
});
