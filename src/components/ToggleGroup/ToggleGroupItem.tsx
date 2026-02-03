import { useContext, useCallback, useEffect } from "react";
import { ToggleGroupContext } from "./ToggleGroupContext";
import type { ToggleGroupItemProps } from "./ToggleGroup.types";
import "./ToggleGroup.css";

/**
 * ToggleGroupItem – Orion v2.0 (Figma node 2247-21795).
 * Individual toggle option; must be used inside ToggleGroup.
 * Uses design tokens only; selected state from parent context.
 */
export function ToggleGroupItem({
  value,
  size = "medium",
  icon,
  label: labelProp,
  children,
  className = "",
  testId,
  disabled,
  ...rest
}: ToggleGroupItemProps) {
  // Figma name: label; support children for idiomatic JSX (<Item value="x">Text</Item>)
  const label = labelProp ?? children;
  const ctx = useContext(ToggleGroupContext);

  if (ctx == null) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }

  const {
    variant,
    value: groupValue,
    onValueChange,
    disabled: groupDisabled,
  } = ctx;
  const isSelected =
    variant === "single"
      ? groupValue === value
      : Array.isArray(groupValue) && groupValue.includes(value);
  const isDisabled = Boolean(groupDisabled || disabled);

  useEffect(() => {
    ctx.registerItem(value);
    return () => ctx.unregisterItem(value);
  }, [value, ctx]);

  const handleClick = useCallback(() => {
    if (isDisabled) return;
    if (variant === "single") {
      onValueChange(isSelected ? "" : value);
    } else {
      const arr = Array.isArray(groupValue) ? [...groupValue] : [];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(value);
      onValueChange(arr);
    }
  }, [variant, value, groupValue, isSelected, isDisabled, onValueChange]);

  const rootClass = [
    "orion-toggle-group-item",
    `orion-toggle-group-item--${size}`,
    isSelected ? "orion-toggle-group-item--selected" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role={variant === "single" ? "radio" : "checkbox"}
      aria-checked={isSelected}
      data-state={isSelected ? "on" : "off"}
      className={rootClass}
      disabled={isDisabled}
      data-testid={testId}
      onClick={handleClick}
      {...rest}
    >
      {icon != null ? (
        <span className="orion-toggle-group-item__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="orion-toggle-group-item__label">{label}</span>
    </button>
  );
}
