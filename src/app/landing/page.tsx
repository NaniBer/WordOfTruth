"use client";

import { THEMES, Theme } from "../constants/themes";
import { FONT_SIZES } from "../constants/fonts";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [theme, setTheme] = useState<Theme>("light");
  const [fontSizeIdx, setFontSizeIdx] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("bible-theme") as Theme | null;
    if (saved && THEMES[saved]) {
      setTheme(saved);
    }
  }, []);

  const t = THEMES[theme];
  const fontSize = FONT_SIZES[fontSizeIdx];

  const features = [
    {
      icon: "📖",
      title: "Dual Translation",
      description: "Read in both Amharic and English side by side, or choose your preferred translation"
    },
    {
      icon: "📌",
      title: "Highlight & Save",
      description: "Save your favorite verses with custom color highlights and access them anytime"
    },
    {
      icon: "🔍",
      title: "Quick Search",
      description: "Search across all books and chapters to find specific verses instantly"
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description: "Easy on your eyes with light and dark theme options"
    },
    {
      icon: "📱",
      title: "Works Offline",
      description: "Download once and read anywhere - no internet required"
    },
    {
      icon: "🎨",
      title: "Customizable",
      description: "Adjust font size and translation view to match your reading style"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Open on Mobile",
      description: "Visit this page on your phone's browser (Chrome or Safari recommended)"
    },
    {
      step: "2",
      title: "Add to Home Screen",
      description: "Tap the share button and select 'Add to Home Screen'"
    },
    {
      step: "3",
      title: "Start Reading",
      description: "Launch the app from your home screen anytime, anywhere"
    }
  ];

  return (
    <div className={`h-screen ${t.bg} overflow-y-auto`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 px-4">
        <div className="relative max-w-lg mx-auto text-center">
          <div className={`mb-4 text-2xl`}>📖</div>
          <h1 className={`text-3xl font-bold mb-3 ${t.text}`}>
            Word of Truth
          </h1>
          <p className={`text-base mb-6 ${t.textSecondary}`}>
            Your personal Bible companion - anytime, anywhere
          </p>
          <a
            href="/"
            className={`inline-block px-6 py-3 ${t.buttonBg} text-white rounded-xl font-bold text-base shadow-lg active:scale-[0.98] transition-all`}
          >
            Start Reading Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className={`text-lg font-bold mb-4 ${t.text}`}>
            Features
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${t.surface} rounded-xl p-4 border ${t.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold mb-1 ${t.text}`}>
                      {feature.title}
                    </h3>
                    <p className={`${t.textSecondary} text-xs leading-relaxed`}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Install Section */}
      <section className="py-6 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className={`text-lg font-bold mb-4 ${t.text}`}>
            How to Install
          </h2>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${t.surface} rounded-xl p-4 border ${t.border}`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-lg ${t.buttonBg} flex items-center justify-center text-white font-bold text-sm`}>
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold mb-1 ${t.text}`}>
                      {step.title}
                    </h3>
                    <p className={`${t.textSecondary} text-xs leading-relaxed`}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className={`${t.surface} rounded-2xl p-6 border ${t.border}`}>
            <h2 className={`text-lg font-bold mb-2 ${t.text}`}>
              Ready to begin your journey?
            </h2>
            <p className={`text-sm mb-4 ${t.textSecondary}`}>
              Start reading the Word of Truth today
            </p>
            <a
              href="/"
              className={`inline-block px-6 py-3 ${t.buttonBg} text-white rounded-xl font-bold text-base shadow-lg active:scale-[0.98] transition-all`}
            >
              Open Bible App
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-4 px-4 border-t ${t.border}`}>
        <div className="max-w-lg mx-auto text-center">
          <p className={`${t.textTertiary} text-xs`}>
            Made with ❤️ for the Ethiopian Christian community
          </p>
        </div>
      </footer>
    </div>
  );
}
