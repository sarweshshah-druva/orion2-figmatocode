import type { ReactNode } from "react";

/**
 * KPI size variant. Matches Figma 59-2551: Primary (largest), Secondary, Tertiary (smallest).
 */
export type KPILabelValueSize = "primary" | "secondary" | "tertiary";

/**
 * KPILabelValue – Orion v2.0 (Figma node 59-2551).
 * Prop names match Figma component properties (camelCase): label, value, unit, icon, size, className, testId.
 * KPI metric: value (and optional unit) on top, label below.
 * - label: shown below (required). value: main number/text (required). unit: optional after value.
 * - icon: optional before value; tertiary hierarchy. size: primary | secondary | tertiary. Default primary.
 */
export interface KPILabelValueProps {
  /** Label (Figma 59-2551): text shown below the value (required). */
  label: string;
  /** Value (Figma 59-2551): main KPI value, e.g. "0.00" or "1,234" (required). */
  value: string;
  /** Unit (Figma 59-2551): optional unit after the value, e.g. "%", "kg". Omit to show value only. */
  unit?: string;
  /** Icon (Figma 59-2551): optional icon before the value. Use Lucide React; size aligns with value row. */
  icon?: ReactNode;
  /** Size (Figma 59-2551): primary (largest), secondary, tertiary (smallest). Default primary. */
  size?: KPILabelValueSize;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
