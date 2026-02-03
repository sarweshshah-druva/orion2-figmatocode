import type { ReactNode } from "react";

/**
 * Tag – Orion v2.0 (Figma node 35-467).
 * Prop names match Figma: variant, label, value, icon, dismissable, onRemove, disabled.
 * No size prop. Label and value are optional. When dismissable is true, shows remove (X) and calls onRemove on click.
 */

export type TagVariant = "neutral" | "success" | "warning" | "danger" | "info";

export interface TagProps {
  /** Label: optional tag text (or use children). */
  label?: ReactNode;
  /** Idiomatic React: same as label. Use label or children. */
  children?: ReactNode;
  /** Value: optional secondary text; when both label and value exist, rendered as "Label: Value". */
  value?: ReactNode;
  /** Variant (Figma 35-467): neutral (default), success, warning, danger, info. */
  variant?: TagVariant;
  /** Icon (Figma 35-467): optional icon before the label. Use Lucide React. */
  icon?: ReactNode;
  /** When true, shows the remove (X) button. Click calls onRemove if provided. */
  dismissable?: boolean;
  /** Called when the remove (X) button is clicked. Show X when dismissable or onRemove is set. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Disabled state: no interaction, subdued appearance. */
  disabled?: boolean;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
