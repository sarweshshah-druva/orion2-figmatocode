import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./index";

describe("ToggleGroup", () => {
  it("renders items", () => {
    render(
      <ToggleGroup variant="single" aria-label="Options" defaultValue="left">
        <ToggleGroupItem value="left" label="Left" />
        <ToggleGroupItem value="center" label="Center" />
        <ToggleGroupItem value="right" label="Right" />
      </ToggleGroup>
    );
    expect(screen.getByRole("radio", { name: /left/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /center/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /right/i })).toBeInTheDocument();
  });

  it("single selection: calls onValueChange when item is clicked", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        variant="single"
        aria-label="Options"
        defaultValue="left"
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="left" label="Left" />
        <ToggleGroupItem value="center" label="Center" />
      </ToggleGroup>
    );
    fireEvent.click(screen.getByRole("radio", { name: /center/i }));
    expect(onValueChange).toHaveBeenCalledWith("center");
  });

  it("multiple selection: toggles items", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        variant="multiple"
        aria-label="Options"
        defaultValue={[]}
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="bold" label="Bold" />
        <ToggleGroupItem value="italic" label="Italic" />
      </ToggleGroup>
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /bold/i }));
    expect(onValueChange).toHaveBeenCalledWith(["bold"]);
  });

  it("disabled group prevents item clicks from firing onValueChange", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        variant="single"
        aria-label="Options"
        defaultValue="left"
        disabled
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="left" label="Left" />
        <ToggleGroupItem value="center" label="Center" />
      </ToggleGroup>
    );
    fireEvent.click(screen.getByRole("radio", { name: /center/i }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("applies group and item classes", () => {
    const { container } = render(
      <ToggleGroup variant="single" aria-label="Options" defaultValue="left">
        <ToggleGroupItem value="left" label="Left" />
      </ToggleGroup>
    );
    expect(container.querySelector(".orion-toggle-group")).toBeInTheDocument();
    expect(
      container.querySelector(".orion-toggle-group-item")
    ).toBeInTheDocument();
  });
});
