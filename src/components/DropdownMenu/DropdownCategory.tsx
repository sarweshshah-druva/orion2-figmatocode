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
  const rootClass = ["orion-dropdown-category", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-testid={testId} role="presentation">
      <span className="orion-dropdown-category__text">{categoryText}</span>
    </div>
  );
}
