import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Textbox } from "./Textbox";

describe("Textbox", () => {
  it("renders input with placeholder", () => {
    render(<Textbox placeholder="Enter value" />);
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <Textbox description="Helper text" placeholder="Placeholder" />
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("renders without description (description is optional)", () => {
    const { container } = render(<Textbox placeholder="P" />);
    expect(screen.getByPlaceholderText("P")).toBeInTheDocument();
    expect(container.querySelector(".orion-textbox__description")).toBeNull();
  });

  it("renders error instead of description when error is set", () => {
    render(
      <Textbox
        description="Helper text"
        error="Invalid value"
        placeholder="Placeholder"
      />
    );
    expect(screen.getByText("Invalid value")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid value");
  });

  it("sets aria-invalid when error is set", () => {
    render(<Textbox error="Error" placeholder="P" />);
    expect(screen.getByPlaceholderText("P")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("renders icon (leading) when provided", () => {
    render(
      <Textbox
        icon={<span data-testid="leading-icon">Icon</span>}
        placeholder="P"
      />
    );
    expect(screen.getByTestId("leading-icon")).toBeInTheDocument();
  });

  it("renders endIcon (trailing) when provided", () => {
    render(
      <Textbox
        endIcon={<span data-testid="end-icon">End</span>}
        placeholder="P"
      />
    );
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("respects disabled state", () => {
    render(<Textbox placeholder="P" disabled />);
    expect(screen.getByPlaceholderText("P")).toBeDisabled();
  });

  it("respects readOnly state", () => {
    render(<Textbox placeholder="P" readOnly value="read only" />);
    const input = screen.getByDisplayValue("read only");
    expect(input).toHaveAttribute("readonly");
  });

  it("applies testId to root", () => {
    render(<Textbox placeholder="P" testId="textbox-1" />);
    expect(screen.getByTestId("textbox-1")).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const onChange = vi.fn();
    render(<Textbox placeholder="P" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("P"), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("shows clear button when clearable and value is not empty (controlled)", () => {
    render(
      <Textbox
        placeholder="P"
        clearable
        value="some value"
        onChange={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("does not show clear button when clearable but value is empty", () => {
    render(<Textbox placeholder="P" clearable value="" onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("calls onClear when clear button is clicked (controlled)", () => {
    const onClear = vi.fn();
    render(
      <Textbox
        placeholder="P"
        clearable
        value="x"
        onChange={() => {}}
        onClear={onClear}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("associates description with input via aria-describedby when no error", () => {
    render(
      <Textbox description="Help text" placeholder="P" id="tb" />
    );
    const input = screen.getByPlaceholderText("P");
    const descId = input.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent("Help text");
  });

  it("associates error with input via aria-describedby when error set", () => {
    render(<Textbox error="Error message" placeholder="P" id="tb" />);
    const input = screen.getByPlaceholderText("P");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      "Error message"
    );
  });
});
