import { useRef, useCallback } from "react";

interface SwipeNavigationOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minSwipeDistance?: number;
}

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 80,
}: SwipeNavigationOptions) {
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);
  const swipeEndX = useRef(0);
  const swipeEndY = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    swipeStartX.current = e.targetTouches[0].clientX;
    swipeStartY.current = e.targetTouches[0].clientY;
    swipeEndX.current = swipeStartX.current;
    swipeEndY.current = swipeStartY.current;
    isSwiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    swipeEndX.current = e.targetTouches[0].clientX;
    swipeEndY.current = e.targetTouches[0].clientY;
    const deltaX = Math.abs(swipeEndX.current - swipeStartX.current);
    const deltaY = Math.abs(swipeEndY.current - swipeStartY.current);
    if (deltaX > deltaY && deltaX > 10) {
      isSwiping.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaX = swipeEndX.current - swipeStartX.current;
    const deltaY = swipeEndY.current - swipeStartY.current;

    if (
      Math.abs(deltaX) > minSwipeDistance &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      isSwiping.current
    ) {
      if (deltaX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    isSwiping.current = false;
  }, [minSwipeDistance, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}