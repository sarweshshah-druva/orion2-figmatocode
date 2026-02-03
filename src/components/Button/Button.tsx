import type { ReactNode } from "react";
import type { ButtonProps } from "./Button.types";
import "./Button.css";

/**
 * Button – primary, secondary, link, icon, or danger CTA.
 * Structure: [optional icon] [label] [optional end icon]. Label optional for icon-only buttons.
 * Uses design tokens only; no hardcoded values.
 */
const hasLabel = (c: ReactNode): boolean =>
  c != null && c !== "" && (typeof c !== "string" || c.trim() !== "");

export function Button({
  label: labelProp,
  children,
  variant = "primary",
  size = "medium",
  icon,
  endIcon,
  className = "",
  testId,
  disabled = false,
  type = "button",
  ...rest
}: ButtonProps) {
  // Figma name: label; support children for idiomatic JSX (<Button>Text</Button>)
  const label = labelProp ?? children;
  const rootClass = [
    "orion-button",
    `orion-button--${variant}`,
    `orion-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showLabel = hasLabel(label);

  return (
    <button
      type={type}
      className={rootClass}
      disabled={disabled}
      data-testid={testId}
      {...rest}
    >
      {icon != null ? (
        <span className="orion-button__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {showLabel ? <span className="orion-button__label">{label}</span> : null}
      {endIcon != null ? (
        <span className="orion-button__icon" aria-hidden>
          {endIcon}
        </span>
      ) : null}
    </button>
  );
}
