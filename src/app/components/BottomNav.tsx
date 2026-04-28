import { NAV_ITEMS } from "../constants/navigation";
import { ThemeConfig } from "../constants/themes";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  t: ThemeConfig;
}

export const BottomNav = ({ activeTab, setActiveTab, t }: BottomNavProps) => {
  return (
    <nav className={`${t.navBg} backdrop-blur-2xl border-t ${t.border}`}>
      <div
        className="flex items-center justify-around px-4 pt-2 pb-1"
        style={{
          paddingBottom: "calc(4px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-2xl transition-all duration-300 ${
              activeTab === id
                ? t.navActive
                : `${t.textTertiary} hover:bg-white/[0.04]`
            }`}
          >
            <Icon
              className={`w-[22px] h-[22px] transition-all duration-300 ${
                activeTab === id ? "drop-shadow" : ""
              }`}
            />
            <span className="text-[11px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
