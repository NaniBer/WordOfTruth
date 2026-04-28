type Props = {
  open: boolean;
  selectedBook: any;
  chapter: number;
  setChapter: (ch: number) => void;
  setShowChapterPicker: (v: boolean) => void;
  setShowBookPicker: (v: boolean) => void;
  translationView: "amharic" | "english" | "both";
  theme: string;
  t: any;
};

export function ChapterPickerSheet({
  open,
  selectedBook,
  chapter,
  setChapter,
  setShowChapterPicker,
  setShowBookPicker,
  translationView,
  theme,
  t,
}: Props) {
  if (!open || !selectedBook) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowChapterPicker(false)}
      />

      {/* sheet */}
      <div
        className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl max-h-[80vh] overflow-hidden animate-slide-up border-t ${t.borderLight}`}
      >
        {/* handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className={`w-10 h-1 rounded-full ${
              theme === "light" ? "bg-gray-300" : "bg-white/20"
            }`}
          />
        </div>

        {/* header */}
        <div
          className={`flex items-center justify-between px-5 py-3 border-b ${t.border}`}
        >
          <button
            onClick={() => setShowChapterPicker(false)}
            className={`${t.primary} text-sm font-semibold`}
          >
            Back
          </button>

          <h2 className={`${t.text} text-lg font-bold`}>
            {translationView === "amharic"
              ? selectedBook.amharic
              : selectedBook.name}
          </h2>

          <button
            onClick={() => {
              setShowChapterPicker(false);
              setShowBookPicker(false);
            }}
            className={`${t.primary} text-sm font-semibold`}
          >
            Done
          </button>
        </div>

        {/* grid */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(
              (ch) => (
                <button
                  key={ch}
                  onClick={() => {
                    setChapter(ch);
                    setShowChapterPicker(false);
                    setShowBookPicker(false);
                  }}
                  className={`p-3 rounded-xl text-center font-semibold transition-all duration-200 ${
                    chapter === ch
                      ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg`
                      : `${t.surface} ${t.text} hover:${t.surfaceActive}`
                  }`}
                >
                  {ch}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
