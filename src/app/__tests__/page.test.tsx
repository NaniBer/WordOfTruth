import { describe, it, expect } from 'vitest';

describe('Book Data Structure', () => {
  it('has correct book structure for Genesis', () => {
    const firstBook = {
      amharic: "ኦሪት ዘፍጥረት",
      english: "Genesis",
      abbr: "ዘፍ",
      chapters: 50
    };
    expect(firstBook).toHaveProperty('amharic');
    expect(firstBook).toHaveProperty('english');
    expect(firstBook).toHaveProperty('abbr');
    expect(firstBook).toHaveProperty('chapters');
    expect(firstBook.chapters).toBe(50);
  });

  it('has correct book structure for Psalms', () => {
    const psalmsBook = {
      amharic: "መዝሙረ ዳዊት",
      english: "Psalms",
      abbr: "መዝ",
      chapters: 150
    };
    expect(psalmsBook).toHaveProperty('amharic');
    expect(psalmsBook).toHaveProperty('english');
    expect(psalmsBook).toHaveProperty('abbr');
    expect(psalmsBook).toHaveProperty('chapters');
    expect(psalmsBook.chapters).toBe(150);
  });

  it('has correct book structure for Revelation', () => {
    const revelationBook = {
      amharic: "የዮሐንስ ራእይ",
      english: "Revelation",
      abbr: "ራእ",
      chapters: 22
    };
    expect(revelationBook).toHaveProperty('amharic');
    expect(revelationBook).toHaveProperty('english');
    expect(revelationBook).toHaveProperty('abbr');
    expect(revelationBook).toHaveProperty('chapters');
    expect(revelationBook.chapters).toBe(22);
  });
});
