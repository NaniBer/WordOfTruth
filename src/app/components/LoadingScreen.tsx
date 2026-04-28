import { ThemeConfig } from "../constants/themes";

interface LoadingScreenProps {
  t: ThemeConfig;
}

export const LoadingScreen = ({ t }: LoadingScreenProps) => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full border-2 ${t.border} border-t-transparent animate-spin`}
      />
      <span className={`${t.textTertiary} text-sm`}>Loading...</span>
    </div>
  </div>
);