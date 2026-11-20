"use client";

import { useState, type ReactNode } from "react";
import { FONT_SIZES } from "../constants/fonts";
import { THEMES, type Theme, type ThemeConfig } from "../constants/themes";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { FeatureSuggestionModal } from "./FeatureSuggestionModal";

interface SettingsProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSizeIdx: number;
  setFontSizeIdx: (idx: number) => void;
  isOnline: boolean;
  isCached: boolean;
  onCacheBibleData: () => void;
  onCheckUpdates: () => void;
  t: ThemeConfig;
}

const ICON_PROPS = {
  className: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
};

function Card({ t, title, children }: { t: ThemeConfig; title: string; children: ReactNode }) {
  return (
    <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
      <h3 className={`${t.text} text-base font-semibold mb-3`}>{title}</h3>
      {children}
    </div>
  );
}

export function SettingsView({
  theme,
  setTheme,
  fontSizeIdx,
  setFontSizeIdx,
  isOnline,
  isCached,
  onCacheBibleData,
  onCheckUpdates,
  t,
}: SettingsProps) {
  const { isInstalled, isIOS, installApp, deferredPrompt } = useInstallPrompt();
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const primaryButton = `w-full py-3 ${t.buttonBg} text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-40 active:scale-[0.98]`;

  return (
    <div className="py-6 px-1 space-y-4">
      <div className={`text-lg font-bold ${t.text}`}>
        <span className={t.primary}>Settings</span>
      </div>

      <Card t={t} title="Theme">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(THEMES) as Theme[]).map((key) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-200 ${
                theme === key
                  ? `${THEMES[key].buttonBg} text-white shadow-lg`
                  : `${t.surfaceActive} ${t.textSecondary}`
              }`}
            >
              <span className="text-lg">{THEMES[key].emoji}</span>
              <span className="text-xs font-semibold">{THEMES[key].label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card t={t} title="Font Size">
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
                key={f.label}
                onClick={() => setFontSizeIdx(i)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  i === fontSizeIdx
                    ? `${t.buttonBg} text-white shadow-md`
                    : `${t.surfaceActive} ${t.textTertiary}`
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFontSizeIdx(Math.min(FONT_SIZES.length - 1, fontSizeIdx + 1))}
            className={`w-10 h-10 rounded-xl ${t.surfaceActive} flex items-center justify-center ${t.textSecondary}`}
          >
            +
          </button>
        </div>
      </Card>

      <Card t={t} title="Offline Access">
        <div className="flex items-center justify-between mb-3">
          <span className={`${t.textSecondary} text-sm`}>Status</span>
          <span className={`text-sm font-semibold ${isOnline ? "text-emerald-400" : "text-amber-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <button onClick={onCacheBibleData} disabled={!isOnline} className={`${primaryButton} mb-2`}>
          {isCached ? "Re-cache Bible Data" : "Cache All Bible Data"}
        </button>
        <p className={`${t.textTertiary} text-xs`}>
          {isCached
            ? "Bible data is cached for offline use. Tap to refresh."
            : "Download all translations for offline reading."}
        </p>
      </Card>

      <Card t={t} title="Install App">
        {isInstalled ? (
          <div className={`${t.textSecondary} text-sm flex items-center gap-2`}>
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            App is installed
          </div>
        ) : isIOS ? (
          <div className="space-y-3">
            <p className={`${t.textSecondary} text-sm leading-relaxed`}>
              Install this app on your iPhone for the best experience:
            </p>
            <ol className={`${t.textSecondary} text-sm space-y-2 list-decimal list-inside`}>
              <li>
                Tap the <strong>Share</strong> button in Safari
              </li>
              <li>
                Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>
              </li>
              <li>
                Tap <strong>&ldquo;Add&rdquo;</strong> in the top right
              </li>
            </ol>
          </div>
        ) : deferredPrompt ? (
          <button
            onClick={installApp}
            className={`${primaryButton} flex items-center justify-center gap-2`}
          >
            <svg {...ICON_PROPS}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Install App
          </button>
        ) : (
          <div className="space-y-3">
            <p className={`${t.textSecondary} text-sm`}>Install this app for the best experience:</p>
            <ul className={`${t.textSecondary} text-sm space-y-1 list-disc list-inside`}>
              <li>Chrome: Menu → &ldquo;Install Word of Truth&rdquo;</li>
              <li>Safari: File → &ldquo;Install App&rdquo;</li>
            </ul>
          </div>
        )}
      </Card>

      <Card t={t} title="Updates">
        <button
          onClick={onCheckUpdates}
          disabled={!isOnline}
          className={`${primaryButton} flex items-center justify-center gap-2`}
        >
          <svg {...ICON_PROPS}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Check for Updates
        </button>
        <p className={`${t.textTertiary} text-xs mt-2`}>Check for new Bible data and features</p>
      </Card>

      <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
        <h3 className={`${t.text} text-base font-semibold mb-1`}>About</h3>
        <p className={`${t.textSecondary} text-sm`}>Word of Truth Bible App</p>
        <p className={`${t.textTertiary} text-xs mt-0.5`}>Version 2.0</p>
      </div>

      <div className={`${t.surface} rounded-2xl p-4 backdrop-blur-sm`}>
        <button
          onClick={() => setShowFeatureModal(true)}
          className={`w-full py-3 ${t.buttonBg} text-white rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
        >
          <svg {...ICON_PROPS}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Suggest a Feature
        </button>
      </div>

      {showFeatureModal && (
        <FeatureSuggestionModal t={t} onClose={() => setShowFeatureModal(false)} />
      )}
    </div>
  );
}
