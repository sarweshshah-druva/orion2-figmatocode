import type { ReactNode } from "react";

/**
 * SimpleLabelValue – label on top, value below in a vertical stack.
 * Matches Figma: Orion v2.0 simple-label-value (node 59-2641).
 * Optional icons can flank the value (e.g. for data/summary context).
 */
export interface SimpleLabelValueProps {
  /** Label text shown above the value (required). */
  label: string;
  /** Value text shown below the label (required). */
  value: string;
  /** Optional icon before the value. Use Lucide React icons; size to match value text. */
  valueIcon?: ReactNode;
  /** Optional icon after the value. Use Lucide React icons; size to match value text. */
  valueEndIcon?: ReactNode;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
