import { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { Tag } from "../../Tags & Badges/Tag";
import type { MultiTagTextboxProps } from "./MultiTagTextbox.types";
import "./MultiTagTextbox.css";

const ICON_SIZE = 16;

/**
 * Multi-tag Textbox – Orion v2.0 (Figma node 145-7349).
 * Container showing multiple dismissable tags in a wrapping layout,
 * a trailing dropdown chevron, and optional description text.
 * Uses design tokens only.
 */
export function MultiTagTextbox({
  tags,
  onRemove,
  descriptionText,
  showDescription = true,
  showDropdown = true,
  disabled = false,
  className = "",
  testId,
}: MultiTagTextboxProps) {
  const handleRemove = useCallback(
    (index: number) => () => {
      onRemove?.(index);
    },
    [onRemove]
  );

  const rootClass = [
    "orion-multi-tag-textbox",
    disabled && "orion-multi-tag-textbox--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-testid={testId}>
      <div className="orion-multi-tag-textbox__container">
        <div className="orion-multi-tag-textbox__tags">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag.label}
              value={tag.value}
              dismissable
              onRemove={handleRemove(index)}
              disabled={disabled}
            />
          ))}
        </div>
        {showDropdown ? (
          <span className="orion-multi-tag-textbox__dropdown" aria-hidden>
            <ChevronDown size={ICON_SIZE} />
          </span>
        ) : null}
      </div>
      {showDescription && descriptionText != null ? (
        <span className="orion-multi-tag-textbox__description">
          {descriptionText}
        </span>
      ) : null}
    </div>
  );
}
