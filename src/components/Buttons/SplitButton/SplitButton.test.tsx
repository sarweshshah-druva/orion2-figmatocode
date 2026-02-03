import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SplitButton } from "./SplitButton";

describe("SplitButton", () => {
  it("renders label", () => {
    render(<SplitButton label="Save" onMainClick={() => {}} />);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("renders dropdown trigger with aria-label", () => {
    render(
      <SplitButton
        label="Save"
        onMainClick={() => {}}
        dropdownAriaLabel="More options"
      />
    );
    expect(
      screen.getByRole("button", { name: /more options/i })
    ).toBeInTheDocument();
  });

  it("calls onMainClick when main segment is clicked", () => {
    const onMainClick = vi.fn();
    render(<SplitButton label="Submit" onMainClick={onMainClick} />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onMainClick).toHaveBeenCalledTimes(1);
  });

  it("calls onDropdownClick when trigger is clicked", () => {
    const onDropdownClick = vi.fn();
    render(
      <SplitButton
        label="Actions"
        onMainClick={() => {}}
        onDropdownClick={onDropdownClick}
        dropdownAriaLabel="Open menu"
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(onDropdownClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onMainClick when disabled", () => {
    const onMainClick = vi.fn();
    render(<SplitButton label="Submit" onMainClick={onMainClick} disabled />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onMainClick).not.toHaveBeenCalled();
  });

  it("does not call onDropdownClick when disabled", () => {
    const onDropdownClick = vi.fn();
    render(
      <SplitButton
        label="Actions"
        onDropdownClick={onDropdownClick}
        dropdownAriaLabel="Open menu"
        disabled
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(onDropdownClick).not.toHaveBeenCalled();
  });

  it("applies variant and size classes", () => {
    const { container } = render(
      <SplitButton
        label="Label"
        variant="secondary"
        size="small"
        onMainClick={() => {}}
      />
    );
    const root = container.querySelector(".orion-split-button");
    expect(root).toHaveClass("orion-split-button--secondary");
    expect(root).toHaveClass("orion-split-button--small");
  });

  it("applies disabled class when disabled", () => {
    const { container } = render(
      <SplitButton label="Label" onMainClick={() => {}} disabled />
    );
    expect(container.querySelector(".orion-split-button")).toHaveClass(
      "orion-split-button--disabled"
    );
  });

  it("applies testId to root", () => {
    const { container } = render(
      <SplitButton label="Label" onMainClick={() => {}} testId="split-1" />
    );
    expect(
      container.querySelector("[data-testid='split-1']")
    ).toBeInTheDocument();
  });

  it("dropdown trigger has aria-haspopup", () => {
    render(
      <SplitButton
        label="Label"
        onMainClick={() => {}}
        dropdownAriaLabel="Menu"
      />
    );
    expect(screen.getByRole("button", { name: /menu/i })).toHaveAttribute(
      "aria-haspopup",
      "true"
    );
  });
});
