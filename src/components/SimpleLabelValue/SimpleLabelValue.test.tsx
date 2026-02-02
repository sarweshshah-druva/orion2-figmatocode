import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Layers } from "lucide-react";
import { SimpleLabelValue } from "./SimpleLabelValue";

describe("SimpleLabelValue", () => {
  it("renders label and value", () => {
    render(
      <SimpleLabelValue
        label="Label name"
        value="Summary text will come here"
      />
    );
    expect(screen.getByText("Label name")).toBeInTheDocument();
    expect(screen.getByText("Summary text will come here")).toBeInTheDocument();
  });

  it("renders with optional valueIcon before value", () => {
    render(
      <SimpleLabelValue
        label="Label"
        value="Value"
        valueIcon={<Layers data-testid="value-icon" />}
      />
    );
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByTestId("value-icon")).toBeInTheDocument();
  });

  it("renders with optional valueEndIcon after value", () => {
    render(
      <SimpleLabelValue
        label="Label"
        value="Value"
        valueEndIcon={<Layers data-testid="value-end-icon" />}
      />
    );
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByTestId("value-end-icon")).toBeInTheDocument();
  });

  it("applies testId to root element", () => {
    render(
      <SimpleLabelValue
        label="Label"
        value="Value"
        testId="simple-label-value-root"
      />
    );
    expect(screen.getByTestId("simple-label-value-root")).toBeInTheDocument();
  });

  it("applies className to root element", () => {
    const { container } = render(
      <SimpleLabelValue label="Label" value="Value" className="custom-class" />
    );
    const root = container.querySelector(
      ".orion-simple-label-value.custom-class"
    );
    expect(root).toBeInTheDocument();
  });

  it("uses semantic structure: label and value have correct classes", () => {
    render(
      <SimpleLabelValue label="Structural label" value="Structural value" />
    );
    expect(screen.getByText("Structural label")).toHaveClass(
      "orion-simple-label-value__label"
    );
    expect(screen.getByText("Structural value")).toHaveClass(
      "orion-simple-label-value__value"
    );
  });
});
