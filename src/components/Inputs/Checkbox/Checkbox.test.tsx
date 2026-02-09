import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders label and description", () => {
    render(
      <Checkbox
        label="Accept terms"
        description="Required to continue"
      />
    );
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
    expect(screen.getByText("Required to continue")).toBeInTheDocument();
  });

  it("renders label only when description is omitted", () => {
    render(<Checkbox label="Only label" />);
    expect(screen.getByText("Only label")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("uses native checkbox input", () => {
    render(<Checkbox label="Pick me" />);
    const input = screen.getByRole("checkbox", { name: /pick me/i });
    expect(input).toHaveAttribute("type", "checkbox");
  });

  it("respects checked state", () => {
    render(
      <Checkbox label="Checked" checked onChange={() => {}} />
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("respects disabled state", () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Click me" onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("applies testId to root", () => {
    render(<Checkbox label="Test" testId="checkbox-1" />);
    expect(screen.getByTestId("checkbox-1")).toBeInTheDocument();
  });

  it("sets indeterminate on input when indeterminate prop is true", () => {
    render(<Checkbox label="Indeterminate" indeterminate />);
    const input = screen.getByRole("checkbox");
    expect((input as HTMLInputElement).indeterminate).toBe(true);
  });

  it("associates description with input via aria-describedby when description present", () => {
    render(
      <Checkbox label="Option" description="Help text" />
    );
    const input = screen.getByRole("checkbox");
    const descId = input.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent("Help text");
  });
});
