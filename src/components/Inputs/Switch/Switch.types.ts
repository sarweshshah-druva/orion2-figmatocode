import type { InputHTMLAttributes } from "react";

/**
 * Switch – Orion v2.0, Figma node 829-948.
 * Toggle control: oval track + thumb, with left/right label–description pairs.
 * In each pair, the description is optional. If a label is not provided, that
 * side’s text container (and its description) is not rendered. At least one
 * of leftLabel or rightLabel must be provided.
 */
export interface SwitchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "className"
  > {
  /** Label to the left of the switch. If not provided, the left text container (and left description) is hidden. */
  leftLabel?: React.ReactNode;
  /** Optional description below the left label. Only shown when leftLabel is provided. */
  leftDescription?: React.ReactNode;
  /** Label to the right of the switch. If not provided, the right text container (and right description) is hidden. */
  rightLabel?: React.ReactNode;
  /** Optional description below the right label. Only shown when rightLabel is provided. */
  rightDescription?: React.ReactNode;
  /** Controlled on/off state. */
  checked?: boolean;
  /** Uncontrolled default checked. */
  defaultChecked?: boolean;
  /** Called when toggled. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disabled state. */
  disabled?: boolean;
  /** Optional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
