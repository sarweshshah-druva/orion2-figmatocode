import { useId, useRef, useEffect, useCallback } from "react";
import type { CheckboxProps, CheckboxState } from "./Checkbox.types";
import "./Checkbox.css";

function toCheckedIndeterminate(state: CheckboxState): { checked: boolean; indeterminate: boolean } {
  return {
    checked: state === "checked",
    indeterminate: state === "indeterminate",
  };
}

function fromCheckedIndeterminate(checked: boolean, indeterminate: boolean): CheckboxState {
  if (indeterminate) return "indeterminate";
  return checked ? "checked" : "unchecked";
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M4 8h8" />
    </svg>
  );
}

/**
 * Checkbox – Orion v2.0 (Figma node 829-551).
 * Square indicator with label + optional description. States: unchecked, checked, indeterminate; enabled/disabled.
 * Uses design tokens only.
 */
export function Checkbox({
  label,
  showDescription = true,
  description,
  state: stateProp,
  onStateChange,
  checked: checkedProp,
  indeterminate = false,
  defaultChecked,
  onChange,
  disabled = false,
  className = "",
  testId,
  id: idProp,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasDescription = showDescription && description != null;
  const descriptionId = hasDescription ? `${id}-description` : undefined;
  const rootClass = ["orion-checkbox", className].filter(Boolean).join(" ");
  const inputRef = useRef<HTMLInputElement>(null);

  const { checked, indeterminate: isIndeterminate } =
    stateProp !== undefined
      ? toCheckedIndeterminate(stateProp)
      : { checked: checkedProp, indeterminate };

  useEffect(() => {
    const input = inputRef.current;
    if (input) input.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextState = fromCheckedIndeterminate(e.target.checked, false);
      onStateChange?.(nextState);
      onChange?.(e);
    },
    [onStateChange, onChange]
  );

  const showIcon = checked || isIndeterminate;
  const icon = isIndeterminate ? <MinusIcon /> : <CheckIcon />;

  return (
    <label className={rootClass} data-testid={testId}>
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className="orion-checkbox__input"
        checked={checked}
        defaultChecked={stateProp === undefined ? defaultChecked : undefined}
        onChange={stateProp !== undefined ? handleChange : onChange}
        disabled={disabled}
        aria-describedby={descriptionId}
        data-indeterminate={isIndeterminate ? "true" : undefined}
        {...rest}
      />
      <span className="orion-checkbox__indicator" aria-hidden>
        {showIcon ? (
          <span className="orion-checkbox__icon">{icon}</span>
        ) : null}
      </span>
      <span className="orion-checkbox__content">
        <span className="orion-checkbox__label">{label}</span>
        {hasDescription ? (
          <span className="orion-checkbox__description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
