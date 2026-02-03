import type { ReactNode } from "react";

/**
 * Badge – Orion v2.0 (Figma node 35-1735).
 * Pill with optional start icon, label, and optional end icon.
 * Prop names match Figma: variant, label, icon (start), endIcon.
 */

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface BadgeProps {
  /** Label: text or number shown in the badge (or use children). */
  label?: ReactNode;
  /** Idiomatic React: same as label. Use label or children. */
  children?: ReactNode;
  /** Variant (Figma 35-1735): neutral (default), success, warning, danger, info. */
  variant?: BadgeVariant;
  /** Icon (Figma 35-1735): optional icon before the label. Use Lucide React. */
  icon?: ReactNode;
  /** End icon (Figma 35-1735): optional icon after the label. Use Lucide React. */
  endIcon?: ReactNode;
  /** Disabled state: subdued appearance. */
  disabled?: boolean;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
