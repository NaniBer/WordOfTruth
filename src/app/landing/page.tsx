"use client";

import Link from "next/link";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { THEMES } from "../constants/themes";
import { useTheme } from "@/hooks/useTheme";

const FEATURES = [
  {
    title: "Dual Translation",
    description: "Read in both Amharic and English side by side, or choose your preferred translation",
  },
  {
    title: "Highlight & Save",
    description: "Save your favorite verses with custom color highlights and access them anytime",
  },
  {
    title: "Quick Search",
    description: "Search across all books and chapters to find specific verses instantly",
  },
  {
    title: "Dark Mode",
    description: "Easy on your eyes with light and dark theme options",
  },
  {
    title: "Works Offline",
    description: "Download once and read anywhere - no internet required",
  },
  {
    title: "Customizable",
    description: "Adjust font size and translation view to match your reading style",
  },
];

const INSTALL_STEPS_IOS = [
  { title: "Open in Safari", description: "Open this page in Safari browser" },
  { title: "Tap Share", description: "Tap the Share button at the bottom of Safari" },
  {
    title: "Add to Home Screen",
    description: "Scroll down and tap “Add to Home Screen”, then tap “Add”",
  },
];

const DOWNLOAD_ICON_PATH =
  "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z";

export default function LandingPage() {
  const { theme } = useTheme();
  const { isIOS, isInstalled, deferredPrompt, installApp } = useInstallPrompt();
  const t = THEMES[theme];

  return (
    <div className={`h-screen ${t.bg} overflow-y-auto`}>
      <section className="relative overflow-hidden py-12 px-4">
        <div className="relative max-w-lg mx-auto text-center">
          <div className={`mb-4 text-4xl font-bold ${t.primary}`}>W</div>
          <h1 className={`text-3xl font-bold mb-3 ${t.text}`}>Word of Truth</h1>
          <p className={`text-base mb-6 ${t.textSecondary}`}>
            Your personal Bible companion - anytime, anywhere
          </p>

          {!isInstalled && deferredPrompt ? (
            <button
              onClick={installApp}
              className={`w-full py-4 ${t.buttonBg} text-white rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={DOWNLOAD_ICON_PATH} />
              </svg>
              Install App
            </button>
          ) : null}
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className={`text-lg font-bold mb-4 ${t.text}`}>Features</h2>
          <div className="space-y-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className={`${t.surface} rounded-xl p-4 border ${t.border}`}>
                <h3 className={`text-sm font-bold mb-1 ${t.text}`}>{feature.title}</h3>
                <p className={`${t.textSecondary} text-xs leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className={`text-lg font-bold mb-4 ${t.text}`}>How to Install</h2>
          <div className={`${t.surface} rounded-xl p-4 border ${t.border}`}>
            {isIOS ? (
              <ol className="space-y-3">
                {INSTALL_STEPS_IOS.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg ${t.buttonBg} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${t.text}`}>{step.title}</p>
                      <p className={`${t.textSecondary} text-xs mt-0.5`}>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : isInstalled ? (
              <p className={`${t.textSecondary} text-sm flex items-center gap-2`}>
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                App is installed
              </p>
            ) : deferredPrompt ? (
              <button
                onClick={installApp}
                className={`w-full py-3 ${t.buttonBg} text-white rounded-xl text-sm font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={DOWNLOAD_ICON_PATH} />
                </svg>
                Install App
              </button>
            ) : (
              <p className={`${t.textSecondary} text-sm`}>
                Open this page in Chrome and you&apos;ll see an install option in the menu.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className={`${t.surface} rounded-2xl p-6 border ${t.border}`}>
            <h2 className={`text-lg font-bold mb-2 ${t.text}`}>Ready to begin your journey?</h2>
            <p className={`text-sm mb-4 ${t.textSecondary}`}>Start reading the Word of Truth today</p>
            <Link
              href="/"
              className={`inline-block px-6 py-3 ${t.buttonBg} text-white rounded-xl font-bold text-base shadow-lg active:scale-[0.98] transition-all`}
            >
              Open Bible App
            </Link>
          </div>
        </div>
      </section>

      <footer className={`py-4 px-4 border-t ${t.border}`}>
        <div className="max-w-lg mx-auto text-center">
          <p className={`${t.textTertiary} text-xs`}>Made for the Ethiopian Christian community</p>
        </div>
      </footer>
    </div>
  );
}
