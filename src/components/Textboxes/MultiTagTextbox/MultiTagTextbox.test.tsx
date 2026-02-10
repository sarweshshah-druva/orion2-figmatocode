import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MultiTagTextbox } from "./MultiTagTextbox";
import type { TagItem } from "./MultiTagTextbox.types";

const TAGS: TagItem[] = [
  { label: "type", value: "folder" },
  { label: "status", value: "active" },
  { label: "priority", value: "high" },
];

describe("Multi-tag Textbox", () => {
  it("renders all tags", () => {
    const { container } = render(<MultiTagTextbox tags={TAGS} />);
    const tagElements = container.querySelectorAll(".orion-tag");
    expect(tagElements.length).toBe(3);
  });

  it("renders tag labels and values", () => {
    render(<MultiTagTextbox tags={TAGS} />);
    expect(screen.getByText(/type/)).toBeTruthy();
    expect(screen.getByText(/folder/)).toBeTruthy();
    expect(screen.getByText(/status/)).toBeTruthy();
    expect(screen.getByText(/active/)).toBeTruthy();
  });

  it("renders description when showDescription is true", () => {
    render(
      <MultiTagTextbox
        tags={TAGS}
        showDescription
        descriptionText="Helper text"
      />
    );
    expect(screen.getByText("Helper text")).toBeTruthy();
  });

  it("hides description when showDescription is false", () => {
    const { container } = render(
      <MultiTagTextbox
        tags={TAGS}
        showDescription={false}
        descriptionText="Helper text"
      />
    );
    expect(
      container.querySelector(".orion-multi-tag-textbox__description")
    ).toBeNull();
  });

  it("hides description when descriptionText is not provided", () => {
    const { container } = render(
      <MultiTagTextbox tags={TAGS} showDescription />
    );
    expect(
      container.querySelector(".orion-multi-tag-textbox__description")
    ).toBeNull();
  });

  it("renders dropdown chevron when showDropdown is true", () => {
    const { container } = render(
      <MultiTagTextbox tags={TAGS} showDropdown />
    );
    expect(
      container.querySelector(".orion-multi-tag-textbox__dropdown")
    ).not.toBeNull();
  });

  it("hides dropdown chevron when showDropdown is false", () => {
    const { container } = render(
      <MultiTagTextbox tags={TAGS} showDropdown={false} />
    );
    expect(
      container.querySelector(".orion-multi-tag-textbox__dropdown")
    ).toBeNull();
  });

  it("calls onRemove with tag index when X is clicked", () => {
    const onRemove = vi.fn();
    render(<MultiTagTextbox tags={TAGS} onRemove={onRemove} />);
    const removeButtons = screen.getAllByRole("button", {
      name: /remove tag/i,
    });
    fireEvent.click(removeButtons[1]);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("applies disabled class and disables tag remove buttons", () => {
    const { container } = render(
      <MultiTagTextbox tags={TAGS} disabled />
    );
    expect(
      container
        .querySelector(".orion-multi-tag-textbox")!
        .classList.contains("orion-multi-tag-textbox--disabled")
    ).toBe(true);
    const removeButtons = screen.getAllByRole("button", {
      name: /remove tag/i,
    });
    removeButtons.forEach((btn) => {
      expect(btn).toHaveProperty("disabled", true);
    });
  });

  it("renders with custom testId", () => {
    render(
      <MultiTagTextbox tags={TAGS} testId="my-multi-tag" />
    );
    expect(screen.getByTestId("my-multi-tag")).toBeTruthy();
  });

  it("renders empty when tags array is empty", () => {
    const { container } = render(<MultiTagTextbox tags={[]} />);
    expect(
      container.querySelectorAll(".orion-tag").length
    ).toBe(0);
  });
});
