import type { InputHTMLAttributes } from "react";

/**
 * Checkbox – Orion v2.0, Figma node 829-551.
 * Prop names match Figma: label, description, checked, indeterminate, disabled.
 * Square indicator with label + optional description. Supports unchecked, checked, and indeterminate.
 */

/** Single prop for the three visual states; use with a 3-option dropdown. */
export type CheckboxState = "unchecked" | "checked" | "indeterminate";

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "className"
  > {
  /** Label (Figma 829-551): primary text next to the checkbox. */
  label: React.ReactNode;
  /** When true, show the description below the label. Use with description. */
  showDescription?: boolean;
  /** Description (Figma 829-551): optional secondary text below the label. Shown when showDescription is true. */
  description?: React.ReactNode;
  /**
   * Combined state (3 options). When set, overrides checked/indeterminate.
   * Use for a single dropdown control in Storybook or forms.
   */
  state?: CheckboxState;
  /** Called when state changes (use with controlled state prop). */
  onStateChange?: (state: CheckboxState) => void;
  /** Controlled checked state. Ignored when state is set. */
  checked?: boolean;
  /** Indeterminate state (e.g. "some selected"). Ignored when state is set. */
  indeterminate?: boolean;
  /** Uncontrolled default checked. */
  defaultChecked?: boolean;
  /** Called when state changes (native change event). */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state. */
  disabled?: boolean;
  /** Optional class name for the root label element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
