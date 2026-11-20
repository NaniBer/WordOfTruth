import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectionBar } from "../SelectionBar";
import { Toast } from "../Toast";
import { StatusBanner } from "../StatusBanner";
import { LoadingScreen } from "../LoadingScreen";
import { THEMES } from "@/app/constants/themes";

describe("SelectionBar", () => {
  it("prompts for a tap when nothing is selected and disables Copy", () => {
    render(<SelectionBar t={THEMES.warm} count={0} onCopy={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText("Tap verses to select")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeDisabled();
  });

  it("shows the count and fires copy and cancel", () => {
    const onCopy = vi.fn();
    const onCancel = vi.fn();
    render(<SelectionBar t={THEMES.warm} count={3} onCopy={onCopy} onCancel={onCancel} />);
    expect(screen.getByText("3 selected")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

describe("Toast", () => {
  it("renders nothing when hidden and the message when visible", () => {
    const { rerender, container } = render(<Toast visible={false} message="Hi" t={THEMES.warm} />);
    expect(container.textContent).toBe("");
    rerender(<Toast visible message="Hi" t={THEMES.warm} />);
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });
});

describe("StatusBanner", () => {
  it("shows the offline notice only when offline", () => {
    const { rerender, container } = render(<StatusBanner type="offline" isOnline />);
    expect(container.textContent).toBe("");
    rerender(<StatusBanner type="offline" isOnline={false} />);
    expect(screen.getByText(/Offline Mode/)).toBeInTheDocument();
  });

  it("shows a caching message only when there is one", () => {
    const { rerender, container } = render(<StatusBanner type="caching" />);
    expect(container.textContent).toBe("");
    rerender(<StatusBanner type="caching" message="Caching Bible data..." />);
    expect(screen.getByText("Caching Bible data...")).toBeInTheDocument();
  });
});

describe("LoadingScreen", () => {
  it("shows a loading label", () => {
    render(<LoadingScreen t={THEMES.warm} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
