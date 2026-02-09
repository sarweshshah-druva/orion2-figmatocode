import type { InputHTMLAttributes } from "react";

/**
 * Textbox – Orion v2.0, Figma nodes 851-25000, 851-24737.
 * No label in Figma. Prop names: description (optional), error, icon, endIcon, placeholder, disabled, value.
 * States: default, focused, disabled, error, read-only. Use Lucide React for icon and endIcon.
 */
export interface TextboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "className" | "aria-invalid" | "aria-describedby"
  > {
  /** Description (Figma): optional helper text below the input. */
  description?: React.ReactNode;
  /** Error (Figma): when set, shows error state and this message below. */
  error?: React.ReactNode;
  /** Icon (Figma): optional leading icon. Use Lucide React (e.g. Search). */
  icon?: React.ReactNode;
  /** End icon (Figma): optional trailing icon (e.g. ChevronDown). Use Lucide React. */
  endIcon?: React.ReactNode;
  /** When true and input has value, show clear (X) and call onClear when clicked. */
  clearable?: boolean;
  /** Called when clear button is clicked. */
  onClear?: () => void;
  /** Optional class name for the root wrapper. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
