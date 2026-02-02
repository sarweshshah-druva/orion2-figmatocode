import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Layers } from "lucide-react";
import { KPILabelValue } from "./KPILabelValue";

describe("KPILabelValue", () => {
  it("renders label and value", () => {
    render(<KPILabelValue label="Label name" value="0.00" />);
    expect(screen.getByText("Label name")).toBeInTheDocument();
    expect(screen.getByText("0.00")).toBeInTheDocument();
  });

  it("renders value and unit when unit is provided", () => {
    render(<KPILabelValue label="Label" value="42.5" unit="%" />);
    expect(screen.getByText("42.5")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("does not render unit element when unit is omitted", () => {
    const { container } = render(<KPILabelValue label="Label" value="100" />);
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(container.querySelector(".orion-kpi-label-value__unit")).toBeNull();
  });

  it("does not render unit element when unit is empty string", () => {
    render(<KPILabelValue label="Label" value="100" unit="" />);
    expect(document.querySelector(".orion-kpi-label-value__unit")).toBeNull();
  });

  it("renders with optional icon as sibling of content block (Figma hierarchy)", () => {
    const { container } = render(
      <KPILabelValue
        label="Label"
        value="0.00"
        icon={<Layers data-testid="kpi-icon" />}
      />
    );
    expect(screen.getByText("0.00")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-icon")).toBeInTheDocument();
    const root = container.querySelector(".orion-kpi-label-value");
    const icon = root?.querySelector(".orion-kpi-label-value__icon");
    const content = root?.querySelector(".orion-kpi-label-value__content");
    expect(icon).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(root?.firstElementChild).toBe(icon);
  });

  it("applies testId to root element", () => {
    render(
      <KPILabelValue label="Label" value="0.00" testId="kpi-label-value-root" />
    );
    expect(screen.getByTestId("kpi-label-value-root")).toBeInTheDocument();
  });

  it("applies className to root element", () => {
    const { container } = render(
      <KPILabelValue label="Label" value="0.00" className="custom-class" />
    );
    const root = container.querySelector(".orion-kpi-label-value.custom-class");
    expect(root).toBeInTheDocument();
  });

  it("uses semantic structure: label and value have correct classes", () => {
    render(<KPILabelValue label="Structural label" value="123" unit="kg" />);
    expect(screen.getByText("Structural label")).toHaveClass(
      "orion-kpi-label-value__label"
    );
    expect(screen.getByText("123")).toHaveClass("orion-kpi-label-value__value");
    expect(screen.getByText("kg")).toHaveClass("orion-kpi-label-value__unit");
  });

  it("applies primary size modifier by default", () => {
    const { container } = render(<KPILabelValue label="Label" value="0.00" />);
    const root = container.querySelector(".orion-kpi-label-value--primary");
    expect(root).toBeInTheDocument();
  });

  it("applies secondary size modifier when size=secondary", () => {
    const { container } = render(
      <KPILabelValue label="Label" value="0.00" size="secondary" />
    );
    const root = container.querySelector(".orion-kpi-label-value--secondary");
    expect(root).toBeInTheDocument();
  });

  it("applies tertiary size modifier when size=tertiary", () => {
    const { container } = render(
      <KPILabelValue label="Label" value="0.00" size="tertiary" />
    );
    const root = container.querySelector(".orion-kpi-label-value--tertiary");
    expect(root).toBeInTheDocument();
  });
});
