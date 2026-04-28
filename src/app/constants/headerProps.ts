import { ChevronDown, Search } from "lucide-react";

type Props = {
  t: any;
  selectedBook: any;
  chapter: number;
  translationView: "amharic" | "english" | "both";
  setTranslationView: (v: "amharic" | "english" | "both") => void;
  setShowBookPicker: (v: boolean) => void;
  englishVersion: "niv" | "nlt" | "csb";
  setEnglishVersion: (v: "niv" | "nlt" | "csb") => void;
  amharicVersion: "amharic_bible" | "amharic_nasb";
  setAmharicVersion: (v: "amharic_bible" | "amharic_nasb") => void;
};
