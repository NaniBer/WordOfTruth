type Props = {
  color: string;
  label: string;
  items: any[];
  t: any;
  onOpen: (item: any) => void;
  onRemove: (id: string) => void;
};

export function SavedGroup({
  color,
  label,
  items,
  t,
  onOpen,
  onRemove,
}: Props) {
  return (
    <div className="space-y-2">
      {/* Group header */}
      <div className="flex items-center gap-2 px-1">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span
          className={`${t.textSecondary} text-xs font-semibold uppercase tracking-wide`}
        >
          {label} ({items.length})
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {items
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((h) => {
            const id = `${h.bookName.toLowerCase()}-${h.chapter}-${h.verse}`;

            return (
              <button
                key={id}
                onClick={() => onOpen(h)}
                className={`w-full text-left p-4 rounded-2xl ${t.surface} hover:${t.surfaceActive} transition-all duration-200 backdrop-blur-sm border-l-4`}
                style={{ borderLeftColor: color }}
              >
                {/* top row */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`${t.text} text-sm font-bold`}>
                    {h.bookAmharic} {h.chapter}:{h.verse}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(id);
                    }}
                    className={`${t.textTertiary} hover:text-red-400 text-xs px-2.5 py-1 rounded-lg ${t.surface}`}
                  >
                    Remove
                  </button>
                </div>

                {/* verse text */}
                <p
                  className={`${t.verseText} text-sm leading-relaxed line-clamp-2`}
                >
                  {h.amharic}
                </p>

                {h.english && (
                  <p className={`${t.textTertiary} text-xs mt-2 line-clamp-1`}>
                    {h.english}
                  </p>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
