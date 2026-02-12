import { forwardRef, useId, useCallback, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import type { InputGroupProps } from "./InputGroup.types";
import "./InputGroup.css";

const ICON_SIZE = 16;

/**
 * InputGroup – Orion v2.0 (Figma node 94-4794).
 *
 * Compound text input with optional leading and trailing dropdown segments.
 * All three segments share a single border container.
 *
 * States: Default, Focused, Disabled, Read-Only, Error.
 *   - Default / Disabled / Read-Only → clear X hidden
 *   - Focused / Filled / Error (has value) → clear X shown
 */
export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      leadingDropdownLabel = "Dropdown",
      showLeadingDropdown = true,
      onLeadingDropdownClick,
      trailingDropdownLabel = "Dropdown",
      showTrailingDropdown = true,
      onTrailingDropdownClick,
      showClear = true,
      onClear,
      errorText,
      className = "",
      testId,
      id: idProp,
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hasError = errorText != null && errorText !== "";

    /* ── Controlled / uncontrolled value ── */
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? "",
    );
    const effectiveValue = isControlled ? value : uncontrolledValue;
    const hasValue =
      typeof effectiveValue === "string"
        ? effectiveValue !== ""
        : effectiveValue != null && String(effectiveValue) !== "";

    /* ── Trailing slot logic (mirrors Figma states) ── */
    const showClearButton = showClear && hasValue && !disabled && !readOnly;

    /* ── Handlers ── */
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setUncontrolledValue(e.target.value);
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isControlled) setUncontrolledValue("");
        onClear?.();
      },
      [isControlled, onClear],
    );

    /* ── Root class names ── */
    const rootClass = [
      "orion-input-group",
      hasError && "orion-input-group--error",
      disabled && "orion-input-group--disabled",
      readOnly && "orion-input-group--read-only",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={rootClass} data-testid={testId}>
        <div className="orion-input-group__container">
          {/* ── Leading dropdown ── */}
          {showLeadingDropdown && (
            <button
              type="button"
              className="orion-input-group__dropdown orion-input-group__dropdown--leading"
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onClick={onLeadingDropdownClick}
              aria-haspopup="listbox"
            >
              <span className="orion-input-group__dropdown-label">
                {leadingDropdownLabel}
              </span>
              <ChevronDown size={ICON_SIZE} aria-hidden />
            </button>
          )}

          {/* ── Divider ── */}
          {showLeadingDropdown && (
            <span className="orion-input-group__divider" aria-hidden />
          )}

          {/* ── Input area ── */}
          <div className="orion-input-group__input-wrap">
            <input
              ref={ref}
              id={id}
              className="orion-input-group__input"
              value={isControlled ? value : uncontrolledValue}
              defaultValue={undefined}
              disabled={disabled}
              readOnly={readOnly}
              aria-invalid={hasError}
              onChange={handleChange}
              {...rest}
            />
            {showClearButton && (
              <button
                type="button"
                className="orion-input-group__clear"
                onClick={handleClear}
                tabIndex={-1}
                aria-label="Clear"
              >
                <X size={ICON_SIZE} aria-hidden />
              </button>
            )}
          </div>

          {/* ── Divider ── */}
          {showTrailingDropdown && (
            <span className="orion-input-group__divider" aria-hidden />
          )}

          {/* ── Trailing dropdown ── */}
          {showTrailingDropdown && (
            <button
              type="button"
              className="orion-input-group__dropdown orion-input-group__dropdown--trailing"
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onClick={onTrailingDropdownClick}
              aria-haspopup="listbox"
            >
              <span className="orion-input-group__dropdown-label">
                {trailingDropdownLabel}
              </span>
              <ChevronDown size={ICON_SIZE} aria-hidden />
            </button>
          )}
        </div>

        {/* ── Error text ── */}
        {hasError && (
          <span
            className="orion-input-group__error"
            id={`${id}-error`}
            role="alert"
          >
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

InputGroup.displayName = "Input Group";
