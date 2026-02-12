import type { InputHTMLAttributes } from "react";

/**
 * Textbox – Orion v2.0 (Figma nodes 851-25000, 851-24737).
 * No dropdown icon. Trailing slot: clear X only when has value (and not disabled/read-only).
 * States: Default, Focused (blue border), Disabled, Read-Only, Error.
 * Use Lucide React for leftIcon (e.g. Search).
 */
export interface TextboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "className" | "aria-invalid"
> {
  /** descriptionText (Figma): optional helper text below the input. */
  descriptionText?: React.ReactNode;
  /** errorText (Figma): when set, shows error state and this message in red below. */
  errorText?: React.ReactNode;
  /** showDescription (Figma): whether to show description or error text below. Default true. */
  showDescription?: boolean;
  /** showLeftIcon (Figma): show the leading icon slot. Default true. */
  showLeftIcon?: boolean;
  /** leftIcon (Figma): optional leading icon. Use Lucide React (e.g. Search). */
  leftIcon?: React.ReactNode;
  /** Called when clear (X) button is clicked. */
  onClear?: () => void;
  /** Optional class name for the root wrapper. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
