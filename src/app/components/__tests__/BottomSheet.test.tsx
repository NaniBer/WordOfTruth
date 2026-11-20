import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import { BottomSheet } from "../BottomSheet";
import { THEMES } from "@/app/constants/themes";

function touch(target: Element, type: string, y: number) {
  const event = createEvent[type === "touchend" ? "touchEnd" : type === "touchmove" ? "touchMove" : "touchStart"](target, {});
  Object.defineProperty(event, "touches", { value: type === "touchend" ? [] : [{ clientY: y }] });
  fireEvent(target, event);
}

function renderSheet(swipeToDismiss: boolean, onClose = vi.fn()) {
  render(
    <BottomSheet onClose={onClose} t={THEMES.warm} swipeToDismiss={swipeToDismiss} header={<h2>Title</h2>}>
      <div data-testid="scroll" style={{}}>
        <p>Body text</p>
      </div>
    </BottomSheet>,
  );
  const sheet = screen.getByText("Title").parentElement as HTMLElement;
  return { onClose, sheet, scroll: screen.getByTestId("scroll") };
}

describe("BottomSheet", () => {
  it("renders its header and children inside the sheet", () => {
    renderSheet(false);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("closes when the backdrop is clicked", () => {
    const { onClose, sheet } = renderSheet(false);
    fireEvent.click(sheet.previousElementSibling as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("dismisses on a downward drag past the threshold when swipe is enabled", () => {
    const { onClose, sheet } = renderSheet(true);
    touch(sheet, "touchstart", 100);
    touch(sheet, "touchmove", 260);
    touch(sheet, "touchend", 260);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("follows a short drag and snaps back without closing", () => {
    const { onClose, sheet } = renderSheet(true);
    touch(sheet, "touchstart", 100);
    touch(sheet, "touchmove", 150);
    expect(sheet.style.transform).toBe("translateY(50px)");
    touch(sheet, "touchend", 150);
    expect(onClose).not.toHaveBeenCalled();
    expect(sheet.style.transform).toBe("");
  });

  it("does not move or dismiss when swipe is disabled", () => {
    const { onClose, sheet } = renderSheet(false);
    touch(sheet, "touchstart", 100);
    touch(sheet, "touchmove", 300);
    touch(sheet, "touchend", 300);
    expect(sheet.style.transform).toBe("");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("ignores a drag that starts inside scrolled content (regression: sheet jumped while scrolling a list)", () => {
    const { onClose, sheet, scroll } = renderSheet(true);
    Object.defineProperty(scroll, "scrollTop", { value: 200, configurable: true });
    touch(scroll, "touchstart", 100);
    touch(scroll, "touchmove", 160);
    touch(scroll, "touchend", 160);
    expect(sheet.style.transform).toBe("");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("still drags when the scrolled container is at the top", () => {
    const { onClose, scroll } = renderSheet(true);
    Object.defineProperty(scroll, "scrollTop", { value: 0, configurable: true });
    touch(scroll, "touchstart", 100);
    touch(scroll, "touchmove", 260);
    touch(scroll, "touchend", 260);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
