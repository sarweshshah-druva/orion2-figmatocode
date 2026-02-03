import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Split Button – Orion v2.0 (Figma node 67-2932).
 * Two segments: main action (label) and dropdown trigger (chevron).
 * Variants: primary (filled), secondary (outlined). Sizes: small, medium, large.
 * Uses design tokens only; main and dropdown clicks are separate handlers.
 */
export type SplitButtonVariant = "primary" | "secondary";
export type SplitButtonSize = "small" | "medium" | "large";

export interface SplitButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "onClick"
  > {
  /** Label (Figma 67-2932): main action text. */
  label: ReactNode;
  /** Variant (Figma 67-2932): primary (filled), secondary (outlined). */
  variant?: SplitButtonVariant;
  /** Size (Figma 67-2932): small, medium (default), large. */
  size?: SplitButtonSize;
  /** Called when the main action segment is clicked. */
  onMainClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Called when the dropdown trigger segment is clicked. */
  onDropdownClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional additional class name for the root wrapper. */
  className?: string;
  /** Optional data attribute for the root (e.g. data-testid). */
  testId?: string;
  /** Accessible label for the dropdown trigger button (e.g. "Open menu"). */
  dropdownAriaLabel?: string;
}
