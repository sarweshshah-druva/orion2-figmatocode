import type { ReactNode } from "react";

/**
 * Multi-tag Textbox – Orion v2.0, Figma node 145-7349.
 * Prop names match Figma: descriptionText, showDescription.
 * Container showing multiple dismissable tags with a trailing dropdown chevron.
 * Uses the Tag component internally.
 */

export interface TagItem {
  /** Tag label text (e.g. "type"). */
  label?: string;
  /** Tag value text (e.g. "folder"). Rendered as "label: value". */
  value?: string;
}

export interface MultiTagTextboxProps {
  /** Array of tag items to display. */
  tags: TagItem[];
  /** Called when a tag's remove (X) is clicked, with the tag index. */
  onRemove?: (index: number) => void;
  /** descriptionText (Figma): optional helper text below the container. */
  descriptionText?: ReactNode;
  /** showDescription (Figma): whether to show description text below. Default true. */
  showDescription?: boolean;
  /** showDropdown (Figma): show trailing dropdown chevron. Default true. */
  showDropdown?: boolean;
  /** Disabled state: tags not dismissable, subdued appearance. */
  disabled?: boolean;
  /** Optional class name for the root wrapper. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
