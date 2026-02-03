import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { SplitButtonProps } from "./SplitButton.types";
import "./SplitButton.css";

/**
 * Split Button – main action + dropdown trigger.
 * Orion v2.0 (Figma node 67-2932).
 * Structure: [main button with label] [divider] [trigger button with chevron].
 */
export function SplitButton({
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  onMainClick,
  onDropdownClick,
  className = "",
  testId,
  dropdownAriaLabel = "Open menu",
  type = "button",
  ...rest
}: SplitButtonProps) {
  const rootClass = [
    "orion-split-button",
    `orion-split-button--${variant}`,
    `orion-split-button--${size}`,
    disabled ? "orion-split-button--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      role="group"
      data-testid={testId}
      aria-disabled={disabled}
    >
      <button
        type={type}
        className="orion-split-button__main"
        disabled={disabled}
        onClick={onMainClick}
        aria-label={typeof label === "string" ? label : undefined}
        {...rest}
      >
        <span className="orion-split-button__label">{label}</span>
      </button>
      <span className="orion-split-button__divider" aria-hidden />
      <button
        type="button"
        className="orion-split-button__trigger"
        disabled={disabled}
        onClick={onDropdownClick}
        aria-label={dropdownAriaLabel}
        aria-haspopup="true"
      >
        <span className="orion-split-button__icon" aria-hidden>
          <ChevronDown />
        </span>
      </button>
    </div>
  );
}
