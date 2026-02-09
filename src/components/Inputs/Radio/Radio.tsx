import { useId } from "react";
import type { RadioProps } from "./Radio.types";
import "./Radio.css";

/**
 * Radio – Orion v2.0 (Figma node 62-5884).
 * Single radio option: circle indicator + label + optional description.
 * Use with same name for a group; supports controlled and uncontrolled.
 * Uses design tokens only; no hardcoded values.
 */
export function Radio({
  label,
  description,
  value,
  name,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = "",
  testId,
  id: idProp,
  ...rest
}: RadioProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const rootClass = ["orion-radio", className].filter(Boolean).join(" ");

  return (
    <label className={rootClass} data-testid={testId}>
      <input
        id={id}
        type="radio"
        className="orion-radio__input"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={descriptionId}
        {...rest}
      />
      <span className="orion-radio__indicator" aria-hidden />
      <span className="orion-radio__content">
        <span className="orion-radio__label">{label}</span>
        {description != null ? (
          <span className="orion-radio__description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
