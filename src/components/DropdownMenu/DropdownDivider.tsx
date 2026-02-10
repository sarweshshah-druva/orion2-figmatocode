import type { DropdownDividerProps } from "./DropdownMenu.types";

/**
 * Dropdown Divider – Orion v2.0 (Figma node 16-370).
 * Horizontal separator line for dropdown menus.
 */
export function DropdownDivider({
  className = "",
  testId,
}: DropdownDividerProps) {
  const rootClass = ["orion-dropdown-divider", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      data-testid={testId}
      role="separator"
      aria-orientation="horizontal"
    >
      <div className="orion-dropdown-divider__line" />
    </div>
  );
}
