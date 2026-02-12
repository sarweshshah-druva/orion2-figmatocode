import type { ReactNode } from "react";

/**
 * Select – Orion v2.0 (Figma node 1994-16022).
 * Textbox variant: no left icon, with dropdown. Same description/error/disabled/read-only behaviour.
 * Button-based for full styling control.
 * States: Default, Focused (blue border), Disabled, Read-Only, Error.
 */
export interface SelectProps {
  /** Selected value text displayed in the select. */
  value?: string;
  /** Placeholder text shown when no value is selected. */
  placeholder?: string;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Whether the select is read-only. */
  readOnly?: boolean;
  /** Error text. When set, enables error state (red border). */
  errorText?: string;
  /** Optional description/helper text below the select. */
  descriptionText?: ReactNode;
  /** Whether to show description or error text below. Default true. */
  showDescription?: boolean;
  /** Callback when the select button is clicked. */
  onClick?: () => void;
  /** Callback when the select receives focus. */
  onFocus?: () => void;
  /** Callback when the select loses focus. */
  onBlur?: () => void;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
  /** Optional id for the select button. */
  id?: string;
  /** ARIA label for accessibility. */
  "aria-label"?: string;
  /** ARIA describedby for accessibility. */
  "aria-describedby"?: string;
  /** Simple dropdown options */
  options?: Array<{ label: string; value: string }>;
  /** Callback when an option is selected */
  onSelect?: (value: string) => void;
}
