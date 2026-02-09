import { useId, useRef, useEffect } from "react";
import type { RadioProps } from "./Radio.types";
import "./Radio.css";

const DEBUG_ENDPOINT =
  "http://127.0.0.1:7243/ingest/850360bf-e814-4d53-8536-04b3ddeea3de";

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
  const labelRef = useRef<HTMLLabelElement>(null);

  // #region agent log
  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    const indicator = el.querySelector(
      ".orion-radio__indicator"
    ) as HTMLElement | null;
    if (!indicator) return;
    const rect = indicator.getBoundingClientRect();
    const computed =
      typeof getComputedStyle !== "undefined"
        ? getComputedStyle(indicator)
        : null;
    const rootStyle =
      typeof getComputedStyle !== "undefined"
        ? getComputedStyle(document.documentElement)
        : null;
    const spacing5Resolved =
      rootStyle?.getPropertyValue("--spacing-5")?.trim() || "N/A";
    const spacing6Resolved =
      rootStyle?.getPropertyValue("--spacing-6")?.trim() || "N/A";
    const input = el.querySelector(
      ".orion-radio__input"
    ) as HTMLInputElement | null;
    const isChecked = input?.checked ?? false;
    const isDisabled = input?.disabled ?? false;
    fetch(DEBUG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "Radio.tsx:indicator-colors",
        message: "Radio indicator computed colors and state",
        data: {
          indicatorBorderColor: computed?.borderColor,
          indicatorBackgroundColor: computed?.backgroundColor,
          indicatorOpacity: computed?.opacity,
          state: { checked: isChecked, disabled: isDisabled },
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        hypothesisId: "colors",
      }),
    }).catch(() => {});
  }, []);
  // #endregion

  return (
    <label ref={labelRef} className={rootClass} data-testid={testId}>
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
