import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Textbox } from "./Textbox";

describe("Textbox", () => {
  it("renders input with placeholder", () => {
    render(<Textbox placeholder="Enter value" />);
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("renders descriptionText when showDescription is true", () => {
    render(
      <Textbox
        descriptionText="Helper text"
        showDescription
        placeholder="P"
      />
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("hides descriptionText when showDescription is false", () => {
    const { container } = render(
      <Textbox
        descriptionText="Helper text"
        showDescription={false}
        placeholder="P"
      />
    );
    expect(container.querySelector(".orion-textbox__description")).toBeNull();
  });

  it("renders errorText instead of description when errorText is set", () => {
    render(
      <Textbox
        descriptionText="Helper text"
        errorText="Invalid value"
        showDescription
        placeholder="P"
      />
    );
    expect(screen.getByText("Invalid value")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid value");
  });

  it("hides errorText when showDescription is false", () => {
    const { container } = render(
      <Textbox
        errorText="Invalid"
        showDescription={false}
        placeholder="P"
      />
    );
    expect(container.querySelector(".orion-textbox__error")).toBeNull();
  });

  it("sets aria-invalid when errorText is set", () => {
    render(<Textbox errorText="Error" placeholder="P" />);
    expect(screen.getByPlaceholderText("P")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("renders leftIcon when showLeftIcon is true", () => {
    render(
      <Textbox
        showLeftIcon
        leftIcon={<span data-testid="leading-icon">Icon</span>}
        placeholder="P"
      />
    );
    expect(screen.getByTestId("leading-icon")).toBeInTheDocument();
  });

  it("hides leftIcon when showLeftIcon is false", () => {
    render(
      <Textbox
        showLeftIcon={false}
        leftIcon={<span data-testid="leading-icon">Icon</span>}
        placeholder="P"
      />
    );
    expect(screen.queryByTestId("leading-icon")).not.toBeInTheDocument();
  });

  it("does not show clear button when input has no value", () => {
    const { container } = render(<Textbox placeholder="P" />);
    expect(container.querySelector(".orion-textbox__clear")).toBeNull();
  });

  it("shows clear X when input has value and not disabled/readOnly (Filled state)", () => {
    const { container } = render(
      <Textbox placeholder="P" value="hello" onChange={() => {}} />
    );
    expect(container.querySelector(".orion-textbox__clear")).not.toBeNull();
  });

  it("does not show clear button when disabled", () => {
    const { container } = render(
      <Textbox placeholder="P" value="text" disabled />
    );
    expect(container.querySelector(".orion-textbox__clear")).toBeNull();
  });

  it("does not show clear button when readOnly even with value", () => {
    const { container } = render(
      <Textbox placeholder="P" value="text" readOnly />
    );
    expect(container.querySelector(".orion-textbox__clear")).toBeNull();
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

  it("calls onClear when clear button is clicked (controlled)", () => {
    const onClear = vi.fn();
    render(
      <Textbox
        placeholder="P"
        value="x"
        onChange={() => {}}
        onClear={onClear}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("associates descriptionText with input via aria-describedby", () => {
    render(
      <Textbox
        descriptionText="Help text"
        showDescription
        placeholder="P"
        id="tb"
      />
    );
    const input = screen.getByPlaceholderText("P");
    const descId = input.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent("Help text");
  });

  it("associates errorText with input via aria-describedby", () => {
    render(
      <Textbox
        errorText="Error message"
        showDescription
        placeholder="P"
        id="tb"
      />
    );
    const input = screen.getByPlaceholderText("P");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      "Error message"
    );
  });
});
