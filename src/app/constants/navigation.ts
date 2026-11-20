import { BookOpen, BookMarked, Settings, type LucideIcon } from "lucide-react";

export type Tab = "bible" | "saved" | "settings";

export const NAV_ITEMS: { id: Tab; icon: LucideIcon; label: string }[] = [
  { id: "bible", icon: BookOpen, label: "Bible" },
  { id: "saved", icon: BookMarked, label: "Saved" },
  { id: "settings", icon: Settings, label: "Settings" },
];
