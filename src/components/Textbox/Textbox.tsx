import { forwardRef, useId, useCallback, useState } from "react";
import { X } from "lucide-react";
import type { TextboxProps } from "./Textbox.types";
import "./Textbox.css";

const TEXTBOX_ICON_SIZE = 16;

/**
 * Textbox – Orion v2.0 (Figma nodes 851-25000, 851-24737).
 * Single-line text input: no label; optional description/error; icon, endIcon, clear. States: default, focused, disabled, error.
 */
export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    {
      description,
      error,
      icon,
      endIcon,
      clearable = false,
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
    const hasError = error != null && error !== "";
    const descriptionId = description && !hasError ? `${id}-description` : undefined;
    const errorId = hasError ? `${id}-error` : undefined;
    const ariaDescribedby = [ariaDescribedbyProp, descriptionId, errorId]
      .filter(Boolean)
      .join(" ")
      || undefined;

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? ""
    );
    const effectiveValue = isControlled ? value : uncontrolledValue;
    const hasValue =
      typeof effectiveValue === "string"
        ? effectiveValue !== ""
        : effectiveValue != null && String(effectiveValue) !== "";
    const showClear = clearable && hasValue && !disabled && endIcon == null;

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
          {icon != null ? (
            <span className="orion-textbox__icon" aria-hidden>
              {icon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={id}
            className="orion-textbox__input"
            value={isControlled ? value : (clearable ? uncontrolledValue : undefined)}
            defaultValue={isControlled || clearable ? undefined : defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError}
            aria-describedby={ariaDescribedby}
            onChange={handleChange}
            {...rest}
          />
          <span className="orion-textbox__end-slot" aria-hidden={!showClear}>
            {showClear ? (
              <button
                type="button"
                className="orion-textbox__clear"
                onClick={handleClear}
                tabIndex={-1}
                aria-label="Clear"
              >
                <X size={TEXTBOX_ICON_SIZE} aria-hidden />
              </button>
            ) : (
              endIcon
            )}
          </span>
        </div>
        {hasError ? (
          <span className="orion-textbox__error" id={errorId} role="alert">
            {error}
          </span>
        ) : description != null ? (
          <span className="orion-textbox__description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </div>
    );
  }
);

Textbox.displayName = "Textbox";
