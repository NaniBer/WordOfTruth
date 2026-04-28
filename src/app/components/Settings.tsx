import { Theme, ThemeConfig } from "../constants/themes";

interface SettingsProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSizeIdx: number;
  setFontSizeIdx: (idx: number) => void;
  FONT_SIZES: { label: string; size: string }[];
  THEMES: Record<Theme, ThemeConfig>;
  isOnline: boolean;
  cacheAllBibleData: () => void;
  t: ThemeConfig;
  isCached?: boolean;
}

export function SettingsView({
  theme,
  setTheme,
  fontSizeIdx,
  setFontSizeIdx,
  FONT_SIZES,
  THEMES,
  isOnline,
  cacheAllBibleData,
  t,
  isCached = false,
}: SettingsProps) {
  return (
    <div className="py-6 px-1 space-y-4">
      {/* Header */}
      <div className={`text-lg font-bold ${t.text}`}>
        <span
          className={`bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}
        >
          Settings
        </span>
      </div>

      {/* Theme */}
      <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
        <h3 className={`${t.text} text-base font-semibold mb-3`}>Theme</h3>

        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(THEMES) as Theme[]).map((key) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-200 ${
                theme === key
                  ? `bg-gradient-to-r ${THEMES[key].gradient} text-white shadow-lg`
                  : `${t.surfaceActive} ${t.textSecondary}`
              }`}
            >
              <span className="text-lg">{THEMES[key].emoji}</span>
              <span className="text-xs font-semibold">{THEMES[key].label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
        <h3 className={`${t.text} text-base font-semibold mb-3`}>Font Size</h3>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setFontSizeIdx(Math.max(0, fontSizeIdx - 1))}
            className={`w-10 h-10 rounded-xl ${t.surfaceActive} flex items-center justify-center ${t.textSecondary}`}
          >
            −
          </button>

          <div className="flex gap-2">
            {FONT_SIZES.map((f, i) => (
              <button
                key={i}
                onClick={() => setFontSizeIdx(i)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  i === fontSizeIdx
                    ? `bg-gradient-to-r ${t.gradient} text-white shadow-md`
                    : `${t.surfaceActive} ${t.textTertiary}`
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setFontSizeIdx(Math.min(FONT_SIZES.length - 1, fontSizeIdx + 1))
            }
            className={`w-10 h-10 rounded-xl ${t.surfaceActive} flex items-center justify-center ${t.textSecondary}`}
          >
            +
          </button>
        </div>
      </div>

      {/* Offline */}
      <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
        <h3 className={`${t.text} text-base font-semibold mb-3`}>
          Offline Access
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className={`${t.textSecondary} text-sm`}>Status</span>
          <span
            className={`text-sm font-semibold ${
              isOnline ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        {isCached ? (
          <>
            <button
              onClick={cacheAllBibleData}
              disabled={!isOnline}
              className={`w-full py-3 ${t.surface} ${t.text} border ${t.border} rounded-xl text-sm font-semibold transition-all disabled:opacity-40 active:scale-[0.98] mb-2`}
            >
              Re-cache Bible Data
            </button>
            <p className={`${t.textTertiary} text-xs`}>
              ✅ Bible data is cached for offline use. Tap to refresh.
            </p>
          </>
        ) : (
          <>
            <button
              onClick={cacheAllBibleData}
              disabled={!isOnline}
              className={`w-full py-3 bg-gradient-to-r ${t.gradient} text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-40 active:scale-[0.98] mb-2`}
            >
              Cache All Bible Data
            </button>
            <p className={`${t.textTertiary} text-xs`}>
              Download all translations for offline reading.
            </p>
          </>
        )}
      </div>

      {/* About */}
      <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
        <h3 className={`${t.text} text-base font-semibold mb-1`}>About</h3>
        <p className={`${t.textSecondary} text-sm`}>Word of Truth Bible App</p>
        <p className={`${t.textTertiary} text-xs mt-0.5`}>Version 2.0</p>
      </div>
    </div>
  );
}
