const VIEW_SETTINGS_KEY = "bible-view-settings";

export interface ViewSettings {
  translationView: "amharic" | "english" | "both";
  englishVersion: "niv" | "nlt" | "csb";
  amharicVersion: "amharic_bible" | "amharic_nasb";
  fontSizeIdx: number;
}

const defaultSettings: ViewSettings = {
  translationView: "amharic",
  englishVersion: "niv",
  amharicVersion: "amharic_bible",
  fontSizeIdx: 1,
};

export const saveViewSettings = (settings: Partial<ViewSettings>): void => {
  if (typeof window === "undefined") return;
  const current = loadViewSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(updated));
};

export const loadViewSettings = (): ViewSettings => {
  if (typeof window === "undefined") return defaultSettings;
  const saved = localStorage.getItem(VIEW_SETTINGS_KEY);
  if (!saved) return defaultSettings;
  try {
    return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    return defaultSettings;
  }
};