import type { ThemeConfig } from "../../constants/themes";

export interface VerseRowProps {
  t: ThemeConfig;
  verseNum: number;
  text: string;
  label: string;
  /** The verse whose action panel is open (single-verse mode). */
  isSelected: boolean;
  /** Multi-select mode is on, so the row shows a checkbox and no action panel. */
  selectionMode: boolean;
  isChecked: boolean;
  highlightIdx: number | null;
  /** Tailwind classes for the verse text size and leading. */
  fontSize: string;
  onSelect: () => void;
  onHighlight: (colorIdx: number | null) => void;
  onCopy: () => void;
}

export function VerseRow({
  t,
  verseNum,
  text,
  label,
  isSelected,
  selectionMode,
  isChecked,
  highlightIdx,
  fontSize,
  onSelect,
  onHighlight,
  onCopy,
}: VerseRowProps) {
  const highlightColor = highlightIdx !== null ? t.highlightColors[highlightIdx] : undefined;

  return (
    <div
      data-verse-num={verseNum}
      onClick={onSelect}
      className={`group py-1 px-2 rounded-2xl transition-all duration-200 cursor-pointer ${
        isSelected || isChecked ? t.verseSelected : "hover:bg-white/[0.03]"
      } ${highlightIdx !== null ? t.highlightBg[highlightIdx] : ""}`}
    >
      <div className="flex gap-1">
        {selectionMode && (
          <span
            className={`mt-1.5 w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
              isChecked ? `${t.buttonBg} border-transparent` : `${t.border}`
            }`}
          >
            {isChecked && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        )}
        <span
          className={`verse-number w-8 mt-1 text-sm font-semibold ${
            isSelected ? t.primary : highlightIdx !== null ? "" : t.textTertiary
          }`}
          style={highlightColor ? { color: highlightColor } : undefined}
        >
          {label}
        </span>
        <div className="flex-1">
          <p className={`verse-text ${fontSize} ${t.verseText} rounded px-0.5`}>{text}</p>
        </div>
      </div>
      {isSelected && (
        <VerseActions t={t} highlightIdx={highlightIdx} onHighlight={onHighlight} onCopy={onCopy} />
      )}
    </div>
  );
}

function VerseActions({
  t,
  highlightIdx,
  onHighlight,
  onCopy,
}: Pick<VerseRowProps, "t" | "highlightIdx" | "onHighlight" | "onCopy">) {
  return (
    <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {t.highlightColors.map((color, i) => {
          const active = highlightIdx === i;
          return (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation();
                onHighlight(active ? null : i); // tapping the active color clears it
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                active
                  ? "ring-2 ring-offset-1 text-white shadow-md ring-offset-transparent"
                  : `${t.surfaceActive} ${t.textSecondary}`
              }`}
              style={
                active
                  ? { backgroundColor: color, boxShadow: `0 0 0 2px ${color}, 0 0 0 4px transparent` }
                  : {}
              }
            >
              <span
                className="w-3.5 h-3.5 rounded-full inline-block border border-white/20"
                style={{
                  backgroundColor: color,
                  boxShadow: `inset 0 0 0 2px ${active ? "white" : "transparent"}`,
                }}
              />
            </button>
          );
        })}
        {highlightIdx !== null && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHighlight(null);
            }}
            className={`px-3 py-2 rounded-xl ${t.surfaceActive} ${t.textTertiary} text-xs font-semibold transition-all`}
          >
            Clear
          </button>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className={`w-full py-2.5 rounded-xl ${t.surfaceActive} ${t.primary} text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Copy
      </button>
    </div>
  );
}
