import type { ReactNode } from "react";

/**
 * IconLabel – Orion v2.0 (Figma node 2830-997).
 * Prop names match Figma component properties (camelCase): label, icon, endIcon, className, testId.
 * Icon(s) with a text label in a horizontal row. The design system uses Lucide React for icons.
 */
export interface IconLabelProps {
  /** Label (Figma 2830-997): text (required). */
  label: string;
  /** Icon (Figma 2830-997): optional icon before the label. Use Lucide React; size to match label (e.g. size={16} for body-small). */
  icon?: ReactNode;
  /** Optional icon after the label. Use Lucide React; size to match label. */
  endIcon?: ReactNode;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
