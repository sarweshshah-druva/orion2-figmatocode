import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * InputGroup – Orion v2.0, Figma node 94-4794.
 *
 * Compound text input with optional leading and trailing dropdown segments.
 * The three segments (leading dropdown, text input, trailing dropdown) share
 * a single border container.
 *
 * States: Default, Focused, Disabled, Read-Only, Error.
 */
export interface InputGroupProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "className" | "aria-invalid"
  > {
  /** Text shown in the leading (left) dropdown segment. */
  leadingDropdownLabel?: string;
  /** Whether to show the leading dropdown segment. Default true. */
  showLeadingDropdown?: boolean;
  /** Callback when the leading dropdown is clicked. */
  onLeadingDropdownClick?: () => void;

  /** Text shown in the trailing (right) dropdown segment. */
  trailingDropdownLabel?: string;
  /** Whether to show the trailing dropdown segment. Default true. */
  showTrailingDropdown?: boolean;
  /** Callback when the trailing dropdown is clicked. */
  onTrailingDropdownClick?: () => void;

  /** Whether to show the clear (X) button when the input has a value. Default true. */
  showClear?: boolean;
  /** Called when the clear (X) button is clicked. */
  onClear?: () => void;

  /** Error text. When set, enables error state (red border). */
  errorText?: string;

  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
