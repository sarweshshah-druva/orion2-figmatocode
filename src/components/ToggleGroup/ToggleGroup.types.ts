import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Toggle Group – Orion v2.0, Figma node 20-612.
 * Prop names match Figma component properties (camelCase): variant, value, defaultValue, disabled, children, className, testId.
 * Horizontal strip of toggle options; rounded outer corners and thin border on the group only.
 * Selection: single (one at a time) or multiple (zero or more). Direct children must be ToggleGroupItem.
 */
export type ToggleGroupVariant = "single" | "multiple";

export interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  disabled?: boolean;
  registerItem: (value: string) => void;
  unregisterItem: (value: string) => void;
}

export interface ToggleGroupProps {
  /** Variant (Figma 20-612): single = one item at a time, multiple = zero or more selected. */
  variant?: ToggleGroupVariant;
  /** Accessible name for the group (required for radiogroup, recommended for group). */
  "aria-label"?: string;
  /** Controlled value. Single: string. Multiple: string[]. */
  value?: string | string[];
  /** Called when selection changes. */
  onValueChange?: (value: string | string[]) => void;
  /** Uncontrolled default value. Single: string. Multiple: string[]. */
  defaultValue?: string | string[];
  /** Disable all items in the group. */
  disabled?: boolean;
  /** Direct children: ToggleGroupItem only. */
  children: ReactNode;
  /** Optional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}

/**
 * Toggle Group Item – Orion v2.0, Figma node 2247-21795.
 * Prop names match Figma component properties (camelCase): value, size, icon, label, disabled, className, testId.
 * One option inside a ToggleGroup. No corner radius on the item (radius only on the group strip).
 * Sizes: small | medium | large. States: selected (primary bg), unselected (white bg, brand border), disabled (subtle bg).
 * Content: optional icon (left) + label.
 */
export type ToggleGroupItemSize = "small" | "medium" | "large";

export interface ToggleGroupItemProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "children" | "className"
  > {
  /** Value (Figma 2247-21795): unique value for this item (used for selection). */
  value: string;
  /** Size (Figma 2247-21795): small | medium (default) | large. */
  size?: ToggleGroupItemSize;
  /** Icon (Figma 2247-21795): optional icon before the label. Use Lucide React; size 12px/14px/16px for small/medium/large. Color follows state. */
  icon?: ReactNode;
  /** Label (Figma 2247-21795): visible text or content of the item. Use label or children. */
  label?: ReactNode;
  /** Idiomatic React: content of the item. Used when label is not provided. */
  children?: ReactNode;
  /** Optional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
