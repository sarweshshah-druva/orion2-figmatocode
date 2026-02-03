import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Settings } from "lucide-react";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders label", () => {
    render(<Tag>Label text</Tag>);
    expect(screen.getByText("Label text")).toBeInTheDocument();
  });

  it("renders label prop", () => {
    render(<Tag label="Label prop" />);
    expect(screen.getByText("Label prop")).toBeInTheDocument();
  });

  it("renders with optional icon", () => {
    render(
      <Tag icon={<Settings data-testid="tag-icon" />} testId="tag">
        With icon
      </Tag>
    );
    expect(screen.getByTestId("tag")).toBeInTheDocument();
    expect(screen.getByTestId("tag-icon")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove} testId="tag">
        Removable
      </Tag>
    );
    const removeBtn = screen.getByRole("button", { name: /remove tag/i });
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not call onRemove when disabled", () => {
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove} disabled testId="tag">
        Disabled
      </Tag>
    );
    const removeBtn = screen.getByRole("button", { name: /remove tag/i });
    expect(removeBtn).toBeDisabled();
    fireEvent.click(removeBtn);
    expect(onRemove).not.toHaveBeenCalled();
  });

  it("applies variant class", () => {
    const { container } = render(
      <Tag variant="success" testId="tag">
        Success
      </Tag>
    );
    const root = container.querySelector(".orion-tag");
    expect(root).toHaveClass("orion-tag--success");
  });

  it("shows remove button when dismissable is true without onRemove", () => {
    render(
      <Tag dismissable testId="tag">
        Dismissable
      </Tag>
    );
    expect(
      screen.getByRole("button", { name: /remove tag/i })
    ).toBeInTheDocument();
  });

  it("shows remove button when both dismissable and onRemove", () => {
    const onRemove = vi.fn();
    render(
      <Tag dismissable onRemove={onRemove} testId="tag">
        Both
      </Tag>
    );
    const btn = screen.getByRole("button", { name: /remove tag/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("applies disabled class when disabled", () => {
    const { container } = render(
      <Tag disabled testId="tag">
        Disabled
      </Tag>
    );
    expect(container.querySelector(".orion-tag")).toHaveClass(
      "orion-tag--disabled"
    );
  });

  it("applies testId when provided", () => {
    render(<Tag testId="my-tag">Test</Tag>);
    expect(screen.getByTestId("my-tag")).toBeInTheDocument();
  });

  it("does not render remove button when neither dismissable nor onRemove", () => {
    render(<Tag>No remove</Tag>);
    expect(screen.queryByRole("button", { name: /remove tag/i })).toBeNull();
  });

  it("renders with optional label and value", () => {
    const { container } = render(
      <Tag label="Key" value="Value" testId="tag" />
    );
    const labelEl = container.querySelector(".orion-tag__label");
    expect(labelEl).toHaveTextContent("Key: Value");
  });

  it("renders with only icon and dismiss when label and value are empty", () => {
    render(
      <Tag
        icon={<Settings data-testid="only-icon" />}
        dismissable
        onRemove={() => {}}
        testId="tag"
      />
    );
    expect(screen.getByTestId("tag")).toBeInTheDocument();
    expect(screen.getByTestId("only-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /remove tag/i })
    ).toBeInTheDocument();
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
          <Tag key={v} variant={v}>
            {v}
          </Tag>
        ))}
      </>
    );
    variants.forEach((v) => {
      expect(container.querySelector(`.orion-tag--${v}`)).toBeInTheDocument();
    });
  });
});
