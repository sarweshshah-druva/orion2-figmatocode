import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Plus } from "lucide-react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders label", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("renders with optional icon before label", () => {
    render(<Button icon={<Plus data-testid="start-icon" />}>Add</Button>);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("renders with optional endIcon after label", () => {
    render(<Button endIcon={<Plus data-testid="end-icon" />}>Next</Button>);
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Submit
      </Button>
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant and size classes", () => {
    const { container } = render(
      <Button variant="secondary" size="small">
        Small secondary
      </Button>
    );
    const btn = container.querySelector(".orion-button");
    expect(btn).toHaveClass("orion-button--secondary");
    expect(btn).toHaveClass("orion-button--small");
  });

  it("applies large size class", () => {
    const { container } = render(<Button size="large">Large</Button>);
    expect(container.querySelector(".orion-button")).toHaveClass(
      "orion-button--large"
    );
  });

  it("applies testId when provided", () => {
    render(<Button testId="submit-btn">Submit</Button>);
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  it("renders as type=submit when type is submit", () => {
    render(<Button type="submit">Submit</Button>);
    const btn = screen.getByRole("button", { name: /submit/i });
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("applies link variant class", () => {
    const { container } = render(<Button variant="link">Link</Button>);
    expect(container.querySelector(".orion-button")).toHaveClass(
      "orion-button--link"
    );
  });

  it("applies icon variant class", () => {
    const { container } = render(
      <Button variant="icon" aria-label="Delete">
        <Plus data-testid="icon" />
      </Button>
    );
    expect(container.querySelector(".orion-button")).toHaveClass(
      "orion-button--icon"
    );
  });

  it("applies danger variant class", () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.querySelector(".orion-button")).toHaveClass(
      "orion-button--danger"
    );
  });

  it("renders icon-only when children is empty and icon is provided", () => {
    const { container } = render(
      <Button
        variant="icon"
        icon={<Plus data-testid="only-icon" />}
        aria-label="Add"
      />
    );
    expect(screen.getByTestId("only-icon")).toBeInTheDocument();
    expect(container.querySelector(".orion-button__label")).toBeNull();
  });
});
