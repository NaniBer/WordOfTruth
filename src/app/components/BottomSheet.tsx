"use client";

import { useRef, type ReactNode, type TouchEvent } from "react";
import type { ThemeConfig } from "../constants/themes";

const SWIPE_DISMISS_DISTANCE_PX = 100;

interface BottomSheetProps {
  onClose: () => void;
  t: ThemeConfig;
  /** Tailwind max-height class. Pass the full literal class, e.g. "max-h-[80vh]". */
  maxHeight?: string;
  /** Rendered below the drag handle. Typically a title row with a close control. */
  header: ReactNode;
  children: ReactNode;
  /** Drag the sheet down past a threshold to dismiss it. */
  swipeToDismiss?: boolean;
}

/** True if `target` or an ancestor inside the sheet has been scrolled away from the top. */
function isInsideScrolledContent(target: HTMLElement | null, sheet: HTMLElement | null): boolean {
  for (let el = target; el && el !== sheet; el = el.parentElement) {
    if (el.scrollTop > 0) return true;
  }
  return false;
}

/** Full-width sheet anchored to the bottom of the screen, with a backdrop. */
export function BottomSheet({
  onClose,
  t,
  maxHeight = "max-h-[85vh]",
  header,
  children,
  swipeToDismiss = false,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  // A drag that starts inside scrolled content belongs to that content, not the sheet.
  const dragEnabled = useRef(false);

  const swipeHandlers = swipeToDismiss
    ? {
        onTouchStart: (e: TouchEvent) => {
          touchStartY.current = e.touches[0].clientY;
          touchCurrentY.current = e.touches[0].clientY;
          dragEnabled.current = !isInsideScrolledContent(e.target as HTMLElement, sheetRef.current);
        },
        onTouchMove: (e: TouchEvent) => {
          if (!dragEnabled.current) return;
          touchCurrentY.current = e.touches[0].clientY;
          const deltaY = touchCurrentY.current - touchStartY.current;
          if (deltaY > 0 && sheetRef.current) {
            sheetRef.current.style.transform = `translateY(${deltaY}px)`;
          }
        },
        onTouchEnd: () => {
          if (!dragEnabled.current) return;
          const deltaY = touchCurrentY.current - touchStartY.current;
          if (deltaY > SWIPE_DISMISS_DISTANCE_PX) {
            onClose();
          } else if (sheetRef.current) {
            sheetRef.current.style.transform = "";
          }
        },
      }
    : {};

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className={`relative w-full max-w-lg ${t.bgSecondary} backdrop-blur-2xl rounded-t-3xl ${maxHeight} overflow-hidden animate-slide-up border-t ${t.borderLight}`}
        {...swipeHandlers}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className={`w-10 h-1 rounded-full ${t.handle}`} />
        </div>
        {header}
        {children}
      </div>
    </div>
  );
}
