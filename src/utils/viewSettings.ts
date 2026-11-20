import {
  type AmharicVersion,
  type EnglishVersion,
  type TranslationView,
} from "@/app/constants/translations";
import { DEFAULT_FONT_SIZE_IDX } from "@/app/constants/fonts";

const VIEW_SETTINGS_KEY = "bible-view-settings";

export interface ViewSettings {
  translationView: TranslationView;
  englishVersion: EnglishVersion;
  amharicVersion: AmharicVersion;
  fontSizeIdx: number;
}

const DEFAULT_SETTINGS: ViewSettings = {
  translationView: "amharic",
  englishVersion: "niv",
  amharicVersion: "amharic_bible",
  fontSizeIdx: DEFAULT_FONT_SIZE_IDX,
};

const TRANSLATION_VIEWS: TranslationView[] = ["amharic", "english", "both"];
const ENGLISH_VERSIONS: EnglishVersion[] = ["niv", "nlt", "csb"];
const AMHARIC_VERSIONS: AmharicVersion[] = ["amharic_bible", "amharic_nasb"];
const FONT_SIZE_COUNT = 4;

/** Keeps a stored value only if it is one of the allowed options, otherwise uses the default. */
const pick = <T,>(value: unknown, allowed: T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

/** Stored settings can be hand-edited or come from an older version, so each field is checked. */
export const sanitizeViewSettings = (raw: unknown): ViewSettings => {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const fontSize = Number.isInteger(r.fontSizeIdx) ? (r.fontSizeIdx as number) : DEFAULT_SETTINGS.fontSizeIdx;
  return {
    translationView: pick(r.translationView, TRANSLATION_VIEWS, DEFAULT_SETTINGS.translationView),
    englishVersion: pick(r.englishVersion, ENGLISH_VERSIONS, DEFAULT_SETTINGS.englishVersion),
    amharicVersion: pick(r.amharicVersion, AMHARIC_VERSIONS, DEFAULT_SETTINGS.amharicVersion),
    fontSizeIdx: Math.min(Math.max(fontSize, 0), FONT_SIZE_COUNT - 1),
  };
};

export const loadViewSettings = (): ViewSettings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const saved = localStorage.getItem(VIEW_SETTINGS_KEY);
  if (!saved) return DEFAULT_SETTINGS;
  try {
    return sanitizeViewSettings(JSON.parse(saved));
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveViewSettings = (settings: Partial<ViewSettings>): void => {
  if (typeof window === "undefined") return;
  const updated = { ...loadViewSettings(), ...settings };
  localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(updated));
};
