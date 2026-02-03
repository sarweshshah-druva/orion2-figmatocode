import type { ReactNode } from "react";
import type { BadgeProps } from "./Badge.types";
import "./Badge.css";

/**
 * Badge – pill with optional start icon, label, and optional end icon.
 * Structure: [optional icon] [label] [optional endIcon]. Orion v2.0 (Figma node 35-1735). Uses design tokens only.
 */
const hasContent = (c: ReactNode): boolean =>
  c != null && c !== "" && (typeof c !== "string" || c.trim() !== "");

export function Badge({
  label: labelProp,
  children,
  variant = "neutral",
  icon,
  endIcon,
  disabled = false,
  className = "",
  testId,
}: BadgeProps) {
  const label = labelProp ?? children;
  const rootClass = [
    "orion-badge",
    `orion-badge--${variant}`,
    disabled ? "orion-badge--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showLabel = hasContent(label);
  const ariaLabel =
    typeof label === "string"
      ? label
      : typeof label === "number"
      ? String(label)
      : undefined;

  return (
    <span
      className={rootClass}
      data-testid={testId}
      role="status"
      aria-label={ariaLabel}
    >
      {icon != null ? (
        <span className="orion-badge__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {showLabel ? <span className="orion-badge__label">{label}</span> : null}
      {endIcon != null ? (
        <span className="orion-badge__end-icon" aria-hidden>
          {endIcon}
        </span>
      ) : null}
    </span>
  );
}
