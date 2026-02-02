import type { ReactNode } from "react";

/**
 * IconLabel – icon(s) with a text label in a horizontal row.
 * Matches Figma: Orion v2.0 icon-label (node 2830-997).
 * The design system uses Lucide React for icons (e.g. import { Layers } from "lucide-react").
 */
export interface IconLabelProps {
  /** Label text (required). */
  label: string;
  /** Optional icon before the label. Use Lucide React icons; size to match label (e.g. size={16} for body-small). */
  icon?: ReactNode;
  /** Optional icon after the label. Use Lucide React icons; size to match label. */
  endIcon?: ReactNode;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
