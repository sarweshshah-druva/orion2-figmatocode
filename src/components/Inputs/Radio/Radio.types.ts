import type { InputHTMLAttributes } from "react";

/**
 * Radio – Orion v2.0, Figma node 62-5884.
 * Prop names match Figma component properties (camelCase): label, description, value, name, checked, disabled.
 * Single radio option: circle indicator + label + optional description. Use with same name for a group.
 */
export interface RadioProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "className"
  > {
  /** Label (Figma 62-5884): primary text next to the radio circle. */
  label: React.ReactNode;
  /** Description (Figma 62-5884): optional secondary text below the label. */
  description?: React.ReactNode;
  /** Value for this option (required when used in a group). */
  value: string;
  /** Name of the radio group (same for all options in the group). */
  name?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled default checked. */
  defaultChecked?: boolean;
  /** Called when selection changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state. */
  disabled?: boolean;
  /** Optional class name for the root label element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
