import type { ThemeConfig } from "../constants/themes";

interface SelectionBarProps {
  t: ThemeConfig;
  count: number;
  onCopy: () => void;
  onCancel: () => void;
}

/** Shown above the bottom nav while several verses are being selected. */
export function SelectionBar({ t, count, onCopy, onCancel }: SelectionBarProps) {
  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-2.5 ${t.navBg} backdrop-blur-2xl border-t ${t.border}`}>
      <span className={`${t.text} text-sm font-semibold`}>
        {count === 0 ? "Tap verses to select" : `${count} selected`}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onCancel}
          className={`px-3 py-2 rounded-xl ${t.surface} ${t.textSecondary} text-sm font-semibold`}
        >
          Cancel
        </button>
        <button
          onClick={onCopy}
          disabled={count === 0}
          className={`px-4 py-2 rounded-xl ${t.buttonBg} text-white text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40`}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
