import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSwipeNavigation } from "../useSwipeNavigation";

const touch = (x: number, y: number) => ({ targetTouches: [{ clientX: x, clientY: y }] }) as unknown as React.TouchEvent;

type Hook = ReturnType<typeof useSwipeNavigation>;
function swipe(hook: Hook, from: [number, number], to: [number, number]) {
  hook.onTouchStart(touch(...from));
  hook.onTouchMove(touch(...to));
  hook.onTouchEnd();
}

describe("useSwipeNavigation", () => {
  it("calls onSwipeLeft for a long horizontal swipe to the left (next chapter)", () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation({ onSwipeLeft, onSwipeRight }));
    swipe(result.current, [300, 100], [150, 105]);
    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it("calls onSwipeRight for a swipe to the right (previous chapter)", () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation({ onSwipeLeft, onSwipeRight }));
    swipe(result.current, [100, 100], [260, 100]);
    expect(onSwipeRight).toHaveBeenCalledTimes(1);
  });

  it("ignores short swipes", () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation({ onSwipeLeft, onSwipeRight: vi.fn() }));
    swipe(result.current, [200, 100], [150, 100]); // 50px < 80px threshold
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  it("ignores mostly-vertical gestures so scrolling does not change chapter", () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation({ onSwipeLeft, onSwipeRight }));
    swipe(result.current, [200, 100], [100, 400]);
    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it("does not fire when the touch never moved horizontally", () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation({ onSwipeLeft, onSwipeRight: vi.fn() }));
    result.current.onTouchStart(touch(200, 100));
    result.current.onTouchEnd();
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });
});
