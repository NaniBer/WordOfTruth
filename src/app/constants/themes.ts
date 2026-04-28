export type Theme = "light" | "warm" | "dark" | "midnight" | "amoled" | "ocean";

export interface ThemeConfig {
  label: string;
  emoji: string;
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  surface: string;
  surfaceActive: string;
  border: string;
  borderLight: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryGlow: string;
  verseText: string;
  verseBg: string;
  verseSelected: string;
  navBg: string;
  navActive: string;
  gradient: string;
  bookGradient: string;
  dot: string;
  highlightColors: [string, string, string];
  highlightBg: [string, string, string];
}

export const THEMES: Record<Theme, ThemeConfig> = {
  light: {
    label: "Light",
    emoji: "☀️",
    bg: "from-gray-50 via-white to-gray-100",
    bgSecondary: "bg-white/80",
    bgTertiary: "bg-gray-100/60",
    surface: "bg-white border-gray-200",
    surfaceActive: "bg-gray-50 border-gray-300",
    border: "border-gray-200",
    borderLight: "border-gray-300",
    text: "text-gray-900",
    textSecondary: "text-gray-500",
    textTertiary: "text-gray-400",
    primary: "text-indigo-600",
    primaryGlow: "shadow-indigo-500/20",
    verseText: "text-gray-800",
    verseBg: "bg-transparent",
    verseSelected: "bg-indigo-50 border border-indigo-200",
    navBg: "bg-white/90",
    navActive: "bg-indigo-50 text-indigo-600",
    gradient: "from-indigo-600 to-violet-600",
    bookGradient: "from-indigo-600 to-violet-600",
    dot: "bg-indigo-500",
    highlightColors: ["#6366f1", "#f59e0b", "#10b981"],
    highlightBg: ["bg-indigo-100", "bg-amber-100", "bg-emerald-100"],
  },
  warm: {
    label: "Warm",
    emoji: "📖",
    bg: "from-[#faf6f0] via-[#f7f0e6] to-[#f3ead9]",
    bgSecondary: "bg-[#f5edd8]/90",
    bgTertiary: "bg-[#ede3c8]/70",
    surface: "bg-[#fff8ed] border-[#e0d5be]",
    surfaceActive: "bg-[#f5edd8] border-[#d4c9a8]",
    border: "border-[#e0d5be]",
    borderLight: "border-[#d4c9a8]",
    text: "text-[#3d3222]",
    textSecondary: "text-[#7a6b52]",
    textTertiary: "text-[#a0916f]",
    primary: "text-[#8b6914]",
    primaryGlow: "shadow-amber-500/20",
    verseText: "text-[#3a2e1a]",
    verseBg: "bg-transparent",
    verseSelected: "bg-[#f0e4c8] border border-[#d4b86a]",
    navBg: "bg-[#f7f0e6]/90",
    navActive: "bg-[#f0e4c8] text-[#8b6914]",
    gradient: "from-[#c99a1a] to-[#a67c00]",
    bookGradient: "from-[#c99a1a] to-[#a67c00]",
    dot: "bg-[#c99a1a]",
    highlightColors: ["#b8860b", "#c05621", "#2d6a4f"],
    highlightBg: ["bg-[#f5e6b8]", "bg-[#f5dbc8]", "bg-[#c8e6d8]"],
  },
  dark: {
    label: "Dark",
    emoji: "🌙",
    bg: "from-[#1a1a2e] via-[#16213e] to-[#0f0f23]",
    bgSecondary: "bg-[#1e1e36]/90",
    bgTertiary: "bg-[#252545]/70",
    surface: "bg-white/[0.05] border-white/[0.07]",
    surfaceActive: "bg-white/[0.09] border-white/[0.12]",
    border: "border-white/[0.07]",
    borderLight: "border-white/[0.13]",
    text: "text-gray-200",
    textSecondary: "text-gray-400",
    textTertiary: "text-gray-500",
    primary: "text-purple-400",
    primaryGlow: "shadow-purple-500/20",
    verseText: "text-gray-200",
    verseBg: "bg-transparent",
    verseSelected: "bg-purple-500/10 border border-purple-500/20",
    navBg: "bg-[#1a1a2e]/90",
    navActive: "bg-purple-500/15 text-purple-400",
    gradient: "from-purple-500 to-indigo-500",
    bookGradient: "from-purple-600 to-indigo-600",
    dot: "bg-purple-500",
    highlightColors: ["#a78bfa", "#fbbf24", "#34d399"],
    highlightBg: ["bg-purple-500/20", "bg-amber-500/20", "bg-emerald-500/20"],
  },
  midnight: {
    label: "Midnight",
    emoji: "✨",
    bg: "from-[#030712] via-[#0a0e1a] to-[#0f0a1e]",
    bgSecondary: "bg-[#111827]/80",
    bgTertiary: "bg-[#1f2937]/60",
    surface: "bg-white/[0.04] border-white/[0.06]",
    surfaceActive: "bg-white/[0.08] border-white/[0.1]",
    border: "border-white/[0.06]",
    borderLight: "border-white/[0.12]",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    textTertiary: "text-gray-500",
    primary: "text-indigo-400",
    primaryGlow: "shadow-indigo-500/20",
    verseText: "text-gray-100",
    verseBg: "bg-transparent",
    verseSelected: "bg-indigo-500/10 border border-indigo-500/20",
    navBg: "bg-[#030712]/90",
    navActive: "bg-indigo-500/15 text-indigo-400",
    gradient: "from-indigo-500 to-violet-500",
    bookGradient: "from-indigo-600 to-violet-600",
    dot: "bg-indigo-500",
    highlightColors: ["#818cf8", "#fbbf24", "#6ee7b7"],
    highlightBg: ["bg-indigo-500/20", "bg-amber-500/20", "bg-emerald-500/20"],
  },
  amoled: {
    label: "AMOLED",
    emoji: "🖤",
    bg: "from-black via-black to-black",
    bgSecondary: "bg-black",
    bgTertiary: "bg-[#111]/80",
    surface: "bg-white/[0.04] border-white/[0.05]",
    surfaceActive: "bg-white/[0.08] border-white/[0.09]",
    border: "border-white/[0.05]",
    borderLight: "border-white/[0.1]",
    text: "text-gray-100",
    textSecondary: "text-gray-500",
    textTertiary: "text-gray-600",
    primary: "text-cyan-400",
    primaryGlow: "shadow-cyan-500/20",
    verseText: "text-gray-200",
    verseBg: "bg-transparent",
    verseSelected: "bg-cyan-500/8 border border-cyan-500/15",
    navBg: "bg-black/95",
    navActive: "bg-cyan-500/10 text-cyan-400",
    gradient: "from-cyan-500 to-teal-400",
    bookGradient: "from-cyan-600 to-teal-500",
    dot: "bg-cyan-500",
    highlightColors: ["#22d3ee", "#a78bfa", "#fb923c"],
    highlightBg: ["bg-cyan-500/15", "bg-violet-500/15", "bg-orange-500/15"],
  },
  ocean: {
    label: "Ocean",
    emoji: "🌊",
    bg: "from-[#0a192f] via-[#0c2340] to-[#071528]",
    bgSecondary: "bg-[#0d2137]/90",
    bgTertiary: "bg-[#122e4f]/70",
    surface: "bg-blue-500/[0.07] border-blue-400/[0.1]",
    surfaceActive: "bg-blue-500/[0.12] border-blue-400/[0.16]",
    border: "border-blue-900/30",
    borderLight: "border-blue-700/35",
    text: "text-blue-50",
    textSecondary: "text-blue-300/70",
    textTertiary: "text-blue-400/50",
    primary: "text-teal-400",
    primaryGlow: "shadow-teal-500/20",
    verseText: "text-blue-50",
    verseBg: "bg-transparent",
    verseSelected: "bg-teal-500/10 border border-teal-500/20",
    navBg: "bg-[#0a192f]/90",
    navActive: "bg-teal-500/15 text-teal-400",
    gradient: "from-teal-500 to-blue-500",
    bookGradient: "from-teal-600 to-blue-600",
    dot: "bg-teal-500",
    highlightColors: ["#2dd4bf", "#818cf8", "#fbbf24"],
    highlightBg: ["bg-teal-500/20", "bg-indigo-500/20", "bg-amber-500/20"],
  },
};
export const HIGHLIGHT_LABELS = ["Faith", "Hope", "Love"] as const;
