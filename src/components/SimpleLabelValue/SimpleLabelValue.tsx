import type { SimpleLabelValueProps } from "./SimpleLabelValue.types";
import "./SimpleLabelValue.css";

/**
 * SimpleLabelValue – label on top, value below in a vertical stack.
 * Structure: [label] [value row: optional icon + value + optional end icon].
 * Uses design tokens only; no hardcoded values.
 */
export function SimpleLabelValue({
  label,
  value,
  valueIcon,
  valueEndIcon,
  className = "",
  testId,
}: SimpleLabelValueProps) {
  const rootClass = ["orion-simple-label-value", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-testid={testId}>
      <span className="orion-simple-label-value__label">{label}</span>
      <span className="orion-simple-label-value__value-row">
        {valueIcon != null ? (
          <span className="orion-simple-label-value__value-icon" aria-hidden>
            {valueIcon}
          </span>
        ) : null}
        <span className="orion-simple-label-value__value">{value}</span>
        {valueEndIcon != null ? (
          <span className="orion-simple-label-value__value-icon" aria-hidden>
            {valueEndIcon}
          </span>
        ) : null}
      </span>
    </div>
  );
}
