// Translation identifiers shared by the reader, search, caching and settings.

export type TranslationView = "amharic" | "english" | "both";
export type EnglishVersion = "niv" | "nlt" | "csb";
export type AmharicVersion = "amharic_bible" | "amharic_nasb";

export const ENGLISH_VERSION_OPTIONS: { value: EnglishVersion; label: string }[] = [
  { value: "niv", label: "NIV" },
  { value: "nlt", label: "NLT" },
  { value: "csb", label: "CSB" },
];

export const AMHARIC_VERSION_OPTIONS: { value: AmharicVersion; label: string }[] = [
  { value: "amharic_bible", label: "Amh 1954" },
  { value: "amharic_nasb", label: "NASB" },
];
