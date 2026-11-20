import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomSelect } from "../CustomSelect";
import { THEMES } from "@/app/constants/themes";

const options = [
  { value: "niv" as const, label: "NIV" },
  { value: "nlt" as const, label: "NLT" },
  { value: "csb" as const, label: "CSB" },
];

describe("CustomSelect", () => {
  it("shows the label of the selected value", () => {
    render(<CustomSelect value="nlt" options={options} onChange={vi.fn()} t={THEMES.warm} />);
    expect(screen.getByRole("button", { name: "NLT" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "CSB" })).not.toBeInTheDocument();
  });

  it("opens, then reports the chosen option (typed to the option's value) and closes", () => {
    const onChange = vi.fn();
    render(<CustomSelect value="niv" options={options} onChange={onChange} t={THEMES.warm} />);
    fireEvent.click(screen.getByRole("button", { name: "NIV" }));
    fireEvent.click(screen.getByRole("button", { name: "CSB" }));
    expect(onChange).toHaveBeenCalledWith("csb");
    expect(screen.queryByRole("button", { name: "NLT" })).not.toBeInTheDocument();
  });

  it("closes when the user clicks elsewhere", () => {
    render(
      <div>
        <span>outside</span>
        <CustomSelect value="niv" options={options} onChange={vi.fn()} t={THEMES.warm} />
      </div>,
    );
    fireEvent.click(screen.getByRole("button", { name: "NIV" }));
    expect(screen.getByRole("button", { name: "NLT" })).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("outside"));
    expect(screen.queryByRole("button", { name: "NLT" })).not.toBeInTheDocument();
  });

  it("does not close when clicking inside the select itself", () => {
    render(<CustomSelect value="niv" options={options} onChange={vi.fn()} t={THEMES.warm} />);
    fireEvent.click(screen.getByRole("button", { name: "NIV" }));
    fireEvent.mouseDown(screen.getByRole("button", { name: "NLT" }));
    expect(screen.getByRole("button", { name: "NLT" })).toBeInTheDocument();
  });
});
