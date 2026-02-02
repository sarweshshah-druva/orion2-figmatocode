import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tag } from "lucide-react";
import { IconLabel } from "./IconLabel";

describe("IconLabel", () => {
  it("renders label text", () => {
    render(<IconLabel label="Test label" />);
    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  it("renders with optional icon before label", () => {
    render(
      <IconLabel label="With icon" icon={<Tag data-testid="lucide-icon" />} />
    );
    expect(screen.getByText("With icon")).toBeInTheDocument();
    expect(screen.getByTestId("lucide-icon")).toBeInTheDocument();
  });

  it("renders with optional endIcon after label", () => {
    render(
      <IconLabel
        label="With end icon"
        endIcon={<Tag data-testid="lucide-icon" />}
      />
    );
    expect(screen.getByText("With end icon")).toBeInTheDocument();
    expect(screen.getByTestId("lucide-icon")).toBeInTheDocument();
  });

  it("applies testId to root element", () => {
    render(<IconLabel label="Label" testId="icon-label-root" />);
    expect(screen.getByTestId("icon-label-root")).toBeInTheDocument();
  });

  it("applies className to root element", () => {
    const { container } = render(
      <IconLabel label="Label" className="custom-class" />
    );
    const root = container.querySelector(".orion-icon-label.custom-class");
    expect(root).toBeInTheDocument();
  });

  it("uses semantic structure: label has correct class", () => {
    render(<IconLabel label="Structural test" />);
    const label = screen.getByText("Structural test");
    expect(label).toHaveClass("orion-icon-label__label");
  });
});
