import type { IconLabelProps } from "./IconLabel.types";
import "./IconLabel.css";

/**
 * IconLabel – icon(s) with a text label in a horizontal row.
 * Structure: [optional icon] [label] [optional end icon].
 * Uses design tokens only; no hardcoded values.
 */
export function IconLabel({
  label,
  icon,
  endIcon,
  className = "",
  testId,
}: IconLabelProps) {
  const rootClass = ["orion-icon-label", className].filter(Boolean).join(" ");

  return (
    <span className={rootClass} data-testid={testId}>
      {icon != null ? (
        <span className="orion-icon-label__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="orion-icon-label__label">{label}</span>
      {endIcon != null ? (
        <span className="orion-icon-label__icon" aria-hidden>
          {endIcon}
        </span>
      ) : null}
    </span>
  );
}
