import type { ReactNode } from "react";

/**
 * KPI size variant. Matches Figma: Primary (largest), Secondary, Tertiary (smallest).
 */
export type KPILabelValueSize = "primary" | "secondary" | "tertiary";

/**
 * KPILabelValue – KPI metric: value (and optional unit) on top, label below.
 * Matches Figma: Orion v2.0 kpi-label-value (node 59-2551).
 *
 * Prop relationships:
 * - label: always shown below (required).
 * - value: main number/text, shown in metrics typography (required).
 * - unit: when provided, shown immediately after value in smaller style; when omitted, only value is shown.
 * - icon: when provided, shown before value (and unit); uses tertiary hierarchy so value reads as primary.
 * - size: Primary (metrics xx-large), Secondary (metrics x-large), Tertiary (metrics large). Default Primary.
 */
export interface KPILabelValueProps {
  /** Label text shown below the value (required). */
  label: string;
  /** Main KPI value, e.g. "0.00" or "1,234" (required). */
  value: string;
  /** Optional unit shown after the value in smaller text, e.g. "Unit", "%", "kg". Omit to show value only. */
  unit?: string;
  /** Optional icon before the value. Use Lucide React icons; size aligns with value row; icon uses tertiary hierarchy. */
  icon?: ReactNode;
  /** Size variant: primary (largest), secondary, tertiary (smallest). Default primary. */
  size?: KPILabelValueSize;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
