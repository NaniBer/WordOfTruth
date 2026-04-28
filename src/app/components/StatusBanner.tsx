type Props = {
  type: "offline" | "caching";
  message?: string;
  isOnline?: boolean;
};

export function StatusBanner({ type, message, isOnline }: Props) {
  if (type === "offline") {
    if (isOnline) return null;

    return (
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-1.5 px-4 text-xs font-semibold">
        Offline Mode - Content is cached
      </div>
    );
  }

  if (type === "caching") {
    if (!message) return null;

    return (
      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-center py-1.5 px-4 text-xs font-semibold">
        {message}
      </div>
    );
  }

  return null;
}
