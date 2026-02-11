import type { InputHTMLAttributes } from "react";

/**
 * Textbox – Orion v2.0, Figma nodes 851-25000, 851-24737.
 * Prop names match Figma: descriptionText, errorText, showDescription, showDropdown, showLeftIcon, leftIcon.
 * States: Default, Filled, Focused, Disabled, Read-Only, Error.
 * Use Lucide React for leftIcon (e.g. Search).
 * Trailing slot is built-in: dropdown chevron (Default/Disabled/Read-Only) or clear X (Filled/Focused/Error).
 */
export interface TextboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "className" | "aria-invalid"
  > {
  /** descriptionText (Figma): optional helper text below the input. */
  descriptionText?: React.ReactNode;
  /** errorText (Figma): when set, shows error state and this message in red below. */
  errorText?: React.ReactNode;
  /** showDescription (Figma): whether to show description or error text below. Default true. */
  showDescription?: boolean;
  /** showDropdown (Figma): show trailing dropdown chevron in Default/Disabled/Read-Only states. Default true. */
  showDropdown?: boolean;
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
