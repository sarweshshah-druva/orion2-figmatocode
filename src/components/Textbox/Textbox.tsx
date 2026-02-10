import { forwardRef, useId, useCallback, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import type { TextboxProps } from "./Textbox.types";
import "./Textbox.css";

const ICON_SIZE = 16;

/**
 * Textbox – Orion v2.0 (Figma nodes 851-25000, 851-24737).
 * Single-line text input. Trailing slot is built-in per Figma states:
 *   - Default / Disabled / Read-Only → dropdown chevron (if showDropdown)
 *   - Filled / Focused / Error (has value) → clear X button
 * Uses design tokens only. Use Lucide React for leftIcon.
 */
export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    {
      descriptionText,
      errorText,
      showDescription = true,
      showDropdown = true,
      showLeftIcon = true,
      leftIcon,
      onClear,
      className = "",
      testId,
      id: idProp,
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      onChange,
      "aria-describedby": ariaDescribedbyProp,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hasError = errorText != null && errorText !== "";
    const descriptionId =
      showDescription && descriptionText && !hasError
        ? `${id}-description`
        : undefined;
    const errorId =
      showDescription && hasError ? `${id}-error` : undefined;
    const ariaDescribedby =
      [ariaDescribedbyProp, descriptionId, errorId]
        .filter(Boolean)
        .join(" ") || undefined;

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? ""
    );
    const effectiveValue = isControlled ? value : uncontrolledValue;
    const hasValue =
      typeof effectiveValue === "string"
        ? effectiveValue !== ""
        : effectiveValue != null && String(effectiveValue) !== "";

    // Figma: clear X shows in Filled/Focused/Error (has value + not disabled + not readOnly)
    const showClear = hasValue && !disabled && !readOnly;
    // Figma: dropdown chevron shows in Default/Disabled/Read-Only (no value or disabled/readOnly)
    const showChevron = showDropdown && !showClear;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setUncontrolledValue(e.target.value);
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isControlled) setUncontrolledValue("");
        onClear?.();
      },
      [isControlled, onClear]
    );

    const rootClass = [
      "orion-textbox",
      hasError && "orion-textbox--error",
      disabled && "orion-textbox--disabled",
      readOnly && "orion-textbox--read-only",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={rootClass} data-testid={testId}>
        <div className="orion-textbox__input-wrap">
          {showLeftIcon && leftIcon != null ? (
            <span className="orion-textbox__icon" aria-hidden>
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={id}
            className="orion-textbox__input"
            value={isControlled ? value : uncontrolledValue}
            defaultValue={undefined}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError}
            aria-describedby={ariaDescribedby}
            onChange={handleChange}
            {...rest}
          />
          {showClear ? (
            <button
              type="button"
              className="orion-textbox__clear"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear"
            >
              <X size={ICON_SIZE} aria-hidden />
            </button>
          ) : showChevron ? (
            <span className="orion-textbox__dropdown" aria-hidden>
              <ChevronDown size={ICON_SIZE} />
            </span>
          ) : null}
        </div>
        {showDescription && hasError ? (
          <span className="orion-textbox__error" id={errorId} role="alert">
            {errorText}
          </span>
        ) : showDescription && descriptionText != null ? (
          <span className="orion-textbox__description" id={descriptionId}>
            {descriptionText}
          </span>
        ) : null}
      </div>
    );
  }
);

Textbox.displayName = "Textbox";
