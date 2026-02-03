import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button – Orion v2.0 (Figma node 555-8049).
 * Prop names match Figma component properties (camelCase): variant, size, label, icon, endIcon, disabled, className, testId.
 * Variants: primary, secondary, link, icon, danger. Sizes: small, medium, large.
 * Uses design tokens only; supports optional start/end icon (e.g. Lucide React).
 * For icon-only buttons use variant="icon" and pass icon/endIcon with no (or empty) label/children; set aria-label for accessibility.
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
  /** Label (Figma 555-8049): button text. Optional for icon-only; use aria-label for accessibility. */
  label?: ReactNode;
  /** Idiomatic React: same as label. Use label or children. */
  children?: ReactNode;
  /** Variant (Figma 555-8049): primary, secondary, link (text link), icon (icon-only style), danger (destructive). */
  variant?: ButtonVariant;
  /** Size (Figma 555-8049): small, medium (default), large. */
  size?: ButtonSize;
  /** Icon (Figma 555-8049): optional icon before the label. Use Lucide React; size derived from button size. */
  icon?: ReactNode;
  /** Optional icon after the label. */
  endIcon?: ReactNode;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
