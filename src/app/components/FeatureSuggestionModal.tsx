import { ThemeConfig } from "../constants/themes";

interface FeatureSuggestionModalProps {
  open: boolean;
  onClose: () => void;
  t: ThemeConfig;
}

export function FeatureSuggestionModal({
  open,
  onClose,
  t,
}: FeatureSuggestionModalProps) {
  if (!open) return null;

  const handleSubmit = () => {
    const message = (
      document.querySelector("#feature-suggestion") as HTMLTextAreaElement
    )?.value;

    if (!message || message.trim() === "") return;

    const subject = encodeURIComponent("Feature Suggestion for Word of Truth");
    const body = encodeURIComponent(`Feature Suggestion:

${message}

---
Sent from Word of Truth Bible App
`);
    const email = "gdgr2010@gmail.com";

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl max-h-[85vh] overflow-hidden animate-slide-up border-t ${t.borderLight}`}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div
            className={`w-10 h-1 rounded-full ${
              t.bg === "#ffffff" ? "bg-gray-300" : "bg-white/20"
            }`}
          />
        </div>
        <div
          className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}
        >
          <h2 className={`${t.text} text-lg font-bold`}>Suggest a Feature</h2>
        </div>

        <div className="px-5 py-4">
          <p className={`${t.textSecondary} text-sm mb-4`}>
            Have an idea to make the Bible app better? We'd love to hear it!
          </p>

          <textarea
            id="feature-suggestion"
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
      </div>
    </div>
  );
}
