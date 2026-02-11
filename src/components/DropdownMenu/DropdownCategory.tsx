import { useId } from "react";
import type { DropdownCategoryProps } from "./DropdownMenu.types";

/**
 * Dropdown Category – Orion v2.0 (Figma node 13-266).
 * Category header text for grouped dropdown menus.
 */
export function DropdownCategory({
  categoryText,
  className = "",
  testId,
}: DropdownCategoryProps) {
  const headingId = useId();
  const rootClass = ["orion-dropdown-category", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      data-testid={testId}
      role="group"
      aria-labelledby={headingId}
    >
      <span id={headingId} className="orion-dropdown-category__text">
        {categoryText}
      </span>
    </div>
  );
}
