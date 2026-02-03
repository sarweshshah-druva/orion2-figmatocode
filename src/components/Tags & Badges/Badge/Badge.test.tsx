import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Settings, Info } from "lucide-react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders label", () => {
    render(<Badge>Label text</Badge>);
    expect(screen.getByText("Label text")).toBeInTheDocument();
  });

  it("renders label prop", () => {
    render(<Badge label="Label prop" />);
    expect(screen.getByText("Label prop")).toBeInTheDocument();
  });

  it("renders numeric label", () => {
    render(<Badge label={99} />);
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(
      <Badge variant="success" testId="badge">
        Success
      </Badge>
    );
    const root = container.querySelector(".orion-badge");
    expect(root).toHaveClass("orion-badge--success");
  });

  it("applies disabled class when disabled", () => {
    const { container } = render(
      <Badge disabled testId="badge">
        Disabled
      </Badge>
    );
    expect(container.querySelector(".orion-badge")).toHaveClass(
      "orion-badge--disabled"
    );
  });

  it("applies testId when provided", () => {
    render(<Badge testId="my-badge">Test</Badge>);
    expect(screen.getByTestId("my-badge")).toBeInTheDocument();
  });

  it("has role status", () => {
    render(<Badge label="Status" testId="badge" />);
    expect(screen.getByRole("status", { name: "Status" })).toBeInTheDocument();
  });

  it("renders all five variants", () => {
    const variants = [
      "neutral",
      "success",
      "warning",
      "danger",
      "info",
    ] as const;
    const { container } = render(
      <>
        {variants.map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
      </>
    );
    variants.forEach((v) => {
      expect(container.querySelector(`.orion-badge--${v}`)).toBeInTheDocument();
    });
  });

  it("renders with optional start icon", () => {
    render(
      <Badge icon={<Settings data-testid="badge-start-icon" />} testId="badge">
        With icon
      </Badge>
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
    expect(screen.getByTestId("badge-start-icon")).toBeInTheDocument();
  });

  it("renders with optional end icon", () => {
    render(
      <Badge endIcon={<Info data-testid="badge-end-icon" />} testId="badge">
        With end icon
      </Badge>
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
    expect(screen.getByTestId("badge-end-icon")).toBeInTheDocument();
  });

  it("renders with both start and end icons", () => {
    const { container } = render(
      <Badge
        icon={<Settings data-testid="start" />}
        endIcon={<Info data-testid="end" />}
        label="Value"
        testId="badge"
      />
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
    const icons = container.querySelectorAll(
      ".orion-badge__icon, .orion-badge__end-icon"
    );
    expect(icons).toHaveLength(2);
  });
});
