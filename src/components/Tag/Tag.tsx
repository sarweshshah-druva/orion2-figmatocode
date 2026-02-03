import type { ReactNode } from "react";
import { X } from "lucide-react";
import type { TagProps } from "./Tag.types";
import "./Tag.css";

/**
 * Tag – label with optional icon and optional remove (X) button.
 * Structure: [optional icon] [label] [optional remove button].
 * Orion v2.0 (Figma node 35-467). Uses design tokens only.
 */
const hasContent = (c: ReactNode): boolean =>
  c != null && c !== "" && (typeof c !== "string" || c.trim() !== "");

export function Tag({
  label: labelProp,
  children,
  value,
  variant = "neutral",
  icon,
  dismissable = false,
  onRemove,
  disabled = false,
  className = "",
  testId,
}: TagProps) {
  const label = labelProp ?? children;
  const showRemoveButton = dismissable || onRemove != null;

  const rootClass = [
    "orion-tag",
    `orion-tag--${variant}`,
    disabled ? "orion-tag--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showLabel = hasContent(label);
  const showValue = hasContent(value);
  const ariaLabel =
    typeof label === "string" && typeof value === "string"
      ? `${label}: ${value}`
      : typeof label === "string"
      ? label
      : typeof value === "string"
      ? value
      : undefined;

  return (
    <span
      className={rootClass}
      data-testid={testId}
      role={showRemoveButton ? "group" : undefined}
      aria-label={ariaLabel}
    >
      {icon != null ? (
        <span className="orion-tag__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {showLabel || showValue ? (
        <span className="orion-tag__label">
          {showLabel ? label : null}
          {showLabel && showValue ? ": " : null}
          {showValue ? value : null}
        </span>
      ) : null}
      {showRemoveButton ? (
        <button
          type="button"
          className="orion-tag__remove"
          onClick={(e) => onRemove?.(e)}
          disabled={disabled}
          aria-label="Remove tag"
          tabIndex={disabled ? -1 : 0}
        >
          <X size={14} aria-hidden />
        </button>
      ) : null}
    </span>
  );
}
