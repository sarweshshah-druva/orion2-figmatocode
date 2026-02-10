import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { DropdownCategory } from "./DropdownCategory";
import { DropdownDivider } from "./DropdownDivider";

/* ── DropdownMenu ────────────────────────────────────────────────── */

describe("Dropdown Menu", () => {
  it("renders children", () => {
    render(
      <DropdownMenu>
        <DropdownMenuItem itemText="Item A" />
        <DropdownMenuItem itemText="Item B" />
      </DropdownMenu>
    );
    expect(screen.getByText("Item A")).toBeTruthy();
    expect(screen.getByText("Item B")).toBeTruthy();
  });

  it("has role=menu", () => {
    render(
      <DropdownMenu>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(screen.getByRole("menu")).toBeTruthy();
  });

  it("shows search when showDropdownSearch is true", () => {
    render(
      <DropdownMenu showDropdownSearch>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();
  });

  it("hides search when showDropdownSearch is false", () => {
    const { container } = render(
      <DropdownMenu showDropdownSearch={false}>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(
      container.querySelector(".orion-dropdown-menu__search")
    ).toBeNull();
  });

  it("calls onSearchChange when typing in search", () => {
    const onChange = vi.fn();
    render(
      <DropdownMenu showDropdownSearch searchValue="" onSearchChange={onChange}>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "test" },
    });
    expect(onChange).toHaveBeenCalledWith("test");
  });

  it("shows clear button when search has value", () => {
    render(
      <DropdownMenu showDropdownSearch searchValue="abc" onSearchChange={() => {}}>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(screen.getByLabelText("Clear search")).toBeTruthy();
  });

  it("clears search on clear button click", () => {
    const onChange = vi.fn();
    render(
      <DropdownMenu showDropdownSearch searchValue="abc" onSearchChange={onChange}>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("shows footer when showDropdownFooter is true and footer provided", () => {
    render(
      <DropdownMenu showDropdownFooter footer={<span>Footer content</span>}>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(screen.getByText("Footer content")).toBeTruthy();
  });

  it("hides footer when showDropdownFooter is false", () => {
    const { container } = render(
      <DropdownMenu showDropdownFooter={false} footer={<span>Footer</span>}>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(
      container.querySelector(".orion-dropdown-menu__footer")
    ).toBeNull();
  });

  it("hides footer when footer prop is not provided", () => {
    const { container } = render(
      <DropdownMenu showDropdownFooter>
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(
      container.querySelector(".orion-dropdown-menu__footer")
    ).toBeNull();
  });

  it("renders with custom testId", () => {
    render(
      <DropdownMenu testId="my-menu">
        <DropdownMenuItem />
      </DropdownMenu>
    );
    expect(screen.getByTestId("my-menu")).toBeTruthy();
  });
});

/* ── DropdownCategory ────────────────────────────────────────────── */

describe("Dropdown Category", () => {
  it("renders category text", () => {
    render(<DropdownCategory categoryText="Category A" />);
    expect(screen.getByText("Category A")).toBeTruthy();
  });

  it("has role=presentation", () => {
    const { container } = render(
      <DropdownCategory categoryText="Cat" />
    );
    expect(
      container.querySelector("[role='presentation']")
    ).not.toBeNull();
  });

  it("renders with custom testId", () => {
    render(<DropdownCategory categoryText="Cat" testId="my-cat" />);
    expect(screen.getByTestId("my-cat")).toBeTruthy();
  });
});

/* ── DropdownDivider ─────────────────────────────────────────────── */

describe("Dropdown Divider", () => {
  it("renders a separator", () => {
    render(<DropdownDivider />);
    expect(screen.getByRole("separator")).toBeTruthy();
  });

  it("has horizontal orientation", () => {
    render(<DropdownDivider />);
    expect(
      screen.getByRole("separator").getAttribute("aria-orientation")
    ).toBe("horizontal");
  });

  it("renders with custom testId", () => {
    render(<DropdownDivider testId="my-div" />);
    expect(screen.getByTestId("my-div")).toBeTruthy();
  });
});
