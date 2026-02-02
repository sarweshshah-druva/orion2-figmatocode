import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button – Orion v2.0 (Figma node 555-8049).
 * Variants: primary, secondary, link, icon, danger. Sizes: small, medium, large.
 * Uses design tokens only; supports optional start/end icon (e.g. Lucide React).
 * For icon-only buttons use variant="icon" and pass icon/endIcon with no (or empty) children; set aria-label for accessibility.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "link"
  | "icon"
  | "danger";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className"
  > {
  /** Button label (optional for icon-only buttons; use aria-label for accessibility). */
  children?: ReactNode;
  /** Visual style: primary, secondary, link (text link), icon (icon-only style), danger (destructive). */
  variant?: ButtonVariant;
  /** Size: small, medium (default), large. */
  size?: ButtonSize;
  /** Optional icon before the label. Use Lucide React; size is derived from button size. */
  icon?: ReactNode;
  /** Optional icon after the label. */
  endIcon?: ReactNode;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
