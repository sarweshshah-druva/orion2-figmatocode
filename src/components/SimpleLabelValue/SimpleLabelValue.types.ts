import type { ReactNode } from "react";

/**
 * SimpleLabelValue – Orion v2.0 (Figma node 59-2641).
 * Prop names match Figma component properties (camelCase): label, value, valueIcon, valueEndIcon, className, testId.
 * Label on top, value below in a vertical stack. Optional icons can flank the value.
 */
export interface SimpleLabelValueProps {
  /** Label (Figma 59-2641): text shown above the value (required). */
  label: string;
  /** Value (Figma 59-2641): text shown below the label (required). */
  value: string;
  /** Optional icon before the value. Use Lucide React; size to match value text. */
  valueIcon?: ReactNode;
  /** Optional icon after the value. Use Lucide React; size to match value text. */
  valueEndIcon?: ReactNode;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
