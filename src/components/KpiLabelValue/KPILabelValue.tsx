import type { KPILabelValueProps } from "./KPILabelValue.types";
import "./KPILabelValue.css";

/**
 * KPILabelValue – value (and optional unit) on top, label below.
 * Structure: [value row: optional icon + value + optional unit] [label].
 * Uses design tokens only.
 */
export function KPILabelValue({
  label,
  value,
  unit,
  icon,
  size = "primary",
  className = "",
  testId,
}: KPILabelValueProps) {
  const rootClass = [
    "orion-kpi-label-value",
    `orion-kpi-label-value--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-testid={testId}>
      {icon != null ? (
        <span className="orion-kpi-label-value__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <div className="orion-kpi-label-value__content">
        <span className="orion-kpi-label-value__value-row">
          <span className="orion-kpi-label-value__value">{value}</span>
          {unit != null && unit !== "" ? (
            <span className="orion-kpi-label-value__unit">{unit}</span>
          ) : null}
        </span>
        <span className="orion-kpi-label-value__label">{label}</span>
      </div>
    </div>
  );
}
