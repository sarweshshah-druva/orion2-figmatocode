import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownMenuItem } from "./DropdownMenuItem";

describe("Dropdown Menu Item", () => {
  it("renders itemText", () => {
    render(<DropdownMenuItem itemText="Click me" />);
    expect(screen.getByText("Click me")).toBeTruthy();
  });

  it("has role=menuitem", () => {
    render(<DropdownMenuItem />);
    expect(screen.getByRole("menuitem")).toBeTruthy();
  });

  it("calls onClick when clicked in Default state", () => {
    const onClick = vi.fn();
    render(<DropdownMenuItem onClick={onClick} />);
    fireEvent.click(screen.getByRole("menuitem"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when Disabled", () => {
    const onClick = vi.fn();
    render(<DropdownMenuItem state="Disabled" onClick={onClick} />);
    fireEvent.click(screen.getByRole("menuitem"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets aria-disabled when Disabled", () => {
    render(<DropdownMenuItem state="Disabled" />);
    expect(
      screen.getByRole("menuitem").getAttribute("aria-disabled")
    ).toBe("true");
  });

  it("renders check icon and accent class in Selected state", () => {
    const { container } = render(<DropdownMenuItem state="Selected" />);
    expect(
      container.querySelector(".orion-dropdown-item--selected")
    ).not.toBeNull();
    expect(
      container.querySelector(".orion-dropdown-item__check")
    ).not.toBeNull();
  });

  it("renders Hover class", () => {
    const { container } = render(<DropdownMenuItem state="Hover" />);
    expect(
      container.querySelector(".orion-dropdown-item--hover")
    ).not.toBeNull();
  });

  it("shows sub-text when showSubText is true", () => {
    render(<DropdownMenuItem showSubText subText="Description" />);
    expect(screen.getByText("Description")).toBeTruthy();
  });

  it("hides sub-text when showSubText is false", () => {
    const { container } = render(
      <DropdownMenuItem showSubText={false} subText="Description" />
    );
    expect(
      container.querySelector(".orion-dropdown-item__sub-text")
    ).toBeNull();
  });

  it("renders left icon when showLeftIcon is true", () => {
    render(
      <DropdownMenuItem
        showLeftIcon
        leftIcon={<span data-testid="icon">★</span>}
      />
    );
    expect(screen.getByTestId("icon")).toBeTruthy();
  });

  it("hides left icon when showLeftIcon is false", () => {
    const { container } = render(
      <DropdownMenuItem
        showLeftIcon={false}
        leftIcon={<span data-testid="icon">★</span>}
      />
    );
    expect(
      container.querySelector(".orion-dropdown-item__left-icon")
    ).toBeNull();
  });

  it("shows nested-list chevron when nestedList is true", () => {
    const { container } = render(<DropdownMenuItem nestedList />);
    expect(
      container.querySelector(".orion-dropdown-item__chevron")
    ).not.toBeNull();
  });

  it("hides chevron when nestedList is false", () => {
    const { container } = render(<DropdownMenuItem nestedList={false} />);
    expect(
      container.querySelector(".orion-dropdown-item__chevron")
    ).toBeNull();
  });

  it("hides chevron in Selected state even when nestedList is true", () => {
    const { container } = render(
      <DropdownMenuItem nestedList state="Selected" />
    );
    expect(
      container.querySelector(".orion-dropdown-item__chevron")
    ).toBeNull();
  });

  it("shows badge when showBadgeStatus is true", () => {
    render(
      <DropdownMenuItem
        showBadgeStatus
        status={<span data-testid="badge">Badge</span>}
      />
    );
    expect(screen.getByTestId("badge")).toBeTruthy();
  });

  it("hides badge when showBadgeStatus is false", () => {
    const { container } = render(
      <DropdownMenuItem
        showBadgeStatus={false}
        status={<span>Badge</span>}
      />
    );
    expect(
      container.querySelector(".orion-dropdown-item__badge-container")
    ).toBeNull();
  });

  it("renders with custom testId", () => {
    render(<DropdownMenuItem testId="my-item" />);
    expect(screen.getByTestId("my-item")).toBeTruthy();
  });

  it("triggers onClick on Enter key", () => {
    const onClick = vi.fn();
    render(<DropdownMenuItem onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole("menuitem"), { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders nestedContent on hover when nestedList is true and nestedContent is provided", () => {
    render(
      <DropdownMenuItem
        nestedList
        nestedContent={<div data-testid="submenu">Sub items</div>}
      />
    );
    // Nested content is rendered via portal on hover
    fireEvent.mouseEnter(screen.getByRole("menuitem"));
    expect(screen.getByTestId("submenu")).toBeTruthy();
  });

  it("adds has-nested class when nestedContent is provided", () => {
    const { container } = render(
      <DropdownMenuItem
        nestedList
        nestedContent={<div>Sub</div>}
      />
    );
    expect(
      container.querySelector(".orion-dropdown-item--has-nested")
    ).not.toBeNull();
  });

  it("sets aria-haspopup=menu when nestedContent is provided", () => {
    render(
      <DropdownMenuItem
        nestedList
        nestedContent={<div>Sub</div>}
      />
    );
    expect(
      screen.getByRole("menuitem").getAttribute("aria-haspopup")
    ).toBe("menu");
  });

  it("does not render nestedContent when disabled even if provided", () => {
    render(
      <DropdownMenuItem
        nestedList
        nestedContent={<div data-testid="submenu">Sub</div>}
        state="Disabled"
      />
    );
    // Even after hover attempt, disabled items should not show nested content
    fireEvent.mouseEnter(screen.getByRole("menuitem"));
    expect(screen.queryByTestId("submenu")).toBeNull();
  });

  it("does not render nestedContent when nestedList is false", () => {
    render(
      <DropdownMenuItem
        nestedList={false}
        nestedContent={<div data-testid="no-submenu">Sub</div>}
      />
    );
    fireEvent.mouseEnter(screen.getByRole("menuitem"));
    expect(screen.queryByTestId("no-submenu")).toBeNull();
  });
});
