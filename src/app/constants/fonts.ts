export interface FontSize {
  label: string;
  /** Tailwind classes applied to verse text. */
  size: string;
}

export const FONT_SIZES: readonly FontSize[] = [
  { label: "S", size: "text-[15px] leading-[1.7]" },
  { label: "M", size: "text-[17px] leading-[1.8]" },
  { label: "L", size: "text-[19px] leading-[1.9]" },
  { label: "XL", size: "text-[22px] leading-[2.0]" },
];

export const DEFAULT_FONT_SIZE_IDX = 1;
