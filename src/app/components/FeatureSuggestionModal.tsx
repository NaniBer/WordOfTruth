"use client";

import { useState } from "react";
import type { ThemeConfig } from "../constants/themes";
import { BottomSheet } from "./BottomSheet";

const FEEDBACK_EMAIL = "gdgr2010@gmail.com";

interface FeatureSuggestionModalProps {
  t: ThemeConfig;
  onClose: () => void;
}

/** Mounted while open. Sends the suggestion through the user's mail app. */
export function FeatureSuggestionModal({ t, onClose }: FeatureSuggestionModalProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const subject = encodeURIComponent("Feature Suggestion for Word of Truth");
    const body = encodeURIComponent(
      `Feature Suggestion:\n\n${trimmed}\n\n---\nSent from Word of Truth Bible App\n`,
    );
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <BottomSheet
      onClose={onClose}
      t={t}
      header={
        <div className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}>
          <h2 className={`${t.text} text-lg font-bold`}>Suggest a Feature</h2>
        </div>
      }
    >
      <div className="px-5 py-4">
        <p className={`${t.textSecondary} text-sm mb-4`}>
          Have an idea to make the Bible app better? We&apos;d love to hear it!
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your feature idea..."
          className={`w-full h-32 p-3 rounded-xl ${t.surface} ${t.text} border ${t.border} placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
        />

        <button
          onClick={handleSubmit}
          className={`w-full mt-4 py-3 ${t.buttonBg} text-white rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-all`}
        >
          Send Suggestion
        </button>

        <button
          onClick={onClose}
          className={`w-full mt-2 py-3 ${t.surface} ${t.textSecondary} rounded-xl font-semibold text-sm transition-all`}
        >
          Cancel
        </button>
      </div>
    </BottomSheet>
  );
}
