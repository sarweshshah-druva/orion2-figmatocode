import { useId } from "react";
import type { SwitchProps } from "./Switch.types";
import "./Switch.css";

/**
 * Switch – Orion v2.0 (Figma node 829-948).
 * Toggle: oval track + thumb, left/right label–description pairs. In each pair,
 * description is optional. If a label is not provided, that side’s text container
 * is not rendered. Uses design tokens only.
 */
export function Switch({
  leftLabel,
  leftDescription,
  rightLabel,
  rightDescription,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = "",
  testId,
  id: idProp,
  ...rest
}: SwitchProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const leftDescId = leftDescription != null ? `${id}-left-description` : undefined;
  const rightDescId = rightDescription != null ? `${id}-right-description` : undefined;
  const describedBy = [leftDescId, rightDescId].filter(Boolean).join(" ") || undefined;
  const rootClass = ["orion-switch", className].filter(Boolean).join(" ");

  if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV && leftLabel == null && rightLabel == null) {
    console.error(
      "Switch: At least one of leftLabel or rightLabel must be provided."
    );
  }

  return (
    <label className={rootClass} data-testid={testId} htmlFor={id}>
      <span className="orion-switch__row">
        {leftLabel != null ? (
          <span className="orion-switch__label-block">
            <span className="orion-switch__label">{leftLabel}</span>
            {leftDescription != null ? (
              <span className="orion-switch__description" id={leftDescId}>
                {leftDescription}
              </span>
            ) : null}
          </span>
        ) : null}
        <span className="orion-switch__control">
          <input
            id={id}
            type="checkbox"
            role="switch"
            className="orion-switch__input"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            aria-describedby={describedBy}
            {...rest}
          />
          <span className="orion-switch__track" aria-hidden>
            <span className="orion-switch__thumb" />
          </span>
        </span>
        {rightLabel != null ? (
          <span className="orion-switch__label-block">
            <span className="orion-switch__label">{rightLabel}</span>
            {rightDescription != null ? (
              <span className="orion-switch__description" id={rightDescId}>
                {rightDescription}
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
    </label>
  );
}
