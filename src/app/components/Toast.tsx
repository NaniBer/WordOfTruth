type Props = {
  visible: boolean;
  message: string;
  t: any;
};

export function Toast({ visible, message, t }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-scale-in">
      <div
        className={`${t.bgSecondary} ${t.text} px-5 py-2.5 rounded-2xl shadow-2xl border ${t.borderLight} backdrop-blur-2xl text-sm font-medium`}
      >
        {message}
      </div>
    </div>
  );
}
