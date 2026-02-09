import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("renders label and description", () => {
    render(
      <Radio
        label="Option one"
        description="Helper text"
        value="one"
        name="test"
      />
    );
    expect(screen.getByText("Option one")).toBeInTheDocument();
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("renders label only when description is omitted", () => {
    render(<Radio label="Only label" value="x" name="test" />);
    expect(screen.getByText("Only label")).toBeInTheDocument();
    expect(screen.queryByRole("radio")).toBeInTheDocument();
  });

  it("uses native radio input", () => {
    render(<Radio label="Pick me" value="v" name="g" />);
    const input = screen.getByRole("radio", { name: /pick me/i });
    expect(input).toHaveAttribute("name", "g");
    expect(input).toHaveAttribute("value", "v");
  });

  it("respects checked state", () => {
    render(
      <Radio label="Checked" value="c" name="g" checked onChange={() => {}} />
    );
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("respects disabled state", () => {
    render(<Radio label="Disabled" value="d" name="g" disabled />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<Radio label="Click me" value="v" name="g" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("applies testId to root", () => {
    render(<Radio label="Test" value="t" name="g" testId="radio-1" />);
    expect(screen.getByTestId("radio-1")).toBeInTheDocument();
  });

  it("associates description with input via aria-describedby when description present", () => {
    render(<Radio label="Option" description="Help text" value="o" name="g" />);
    const input = screen.getByRole("radio");
    const descId = input.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent("Help text");
  });
});
