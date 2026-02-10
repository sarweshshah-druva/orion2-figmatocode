import type { ReactNode } from "react";

/**
 * Dropdown Menu – Orion v2.0.
 * Composed of: Dropdown Menu Item (13-367), Dropdown Category (13-266),
 * Dropdown Divider (16-370), Dropdown Menu (180-7911).
 * All prop names match Figma.
 */

/* ── Dropdown Menu Item (Figma 13-367) ────────────────────────────── */

export interface DropdownMenuItemProps {
  /** state (Figma): visual state. */
  state?: "Default" | "Hover" | "Selected" | "Disabled";
  /** itemText (Figma): label text. */
  itemText?: string;
  /** subText (Figma): secondary text below the label. */
  subText?: string;
  /** showSubText (Figma): show the sub-text. Default false. */
  showSubText?: boolean;
  /** leftIcon (Figma): optional leading icon (Lucide React). */
  leftIcon?: ReactNode;
  /** showLeftIcon (Figma): show the leading icon slot. Default false. */
  showLeftIcon?: boolean;
  /** nestedList (Figma): show a nested-list chevron (›). Default false. */
  nestedList?: boolean;
  /** Content rendered as a flyout submenu when nestedList is true and the item is hovered. */
  nestedContent?: ReactNode;
  /** showBadgeStatus (Figma): show a badge/status element. Default false. */
  showBadgeStatus?: boolean;
  /** status (Figma): custom badge/status ReactNode. */
  status?: ReactNode;
  /** Click handler. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Optional class name. */
  className?: string;
  /** Optional data-testid. */
  testId?: string;
}

/* ── Dropdown Category (Figma 13-266) ────────────────────────────── */

export interface DropdownCategoryProps {
  /** categoryText (Figma): category header text. */
  categoryText: string;
  /** Optional class name. */
  className?: string;
  /** Optional data-testid. */
  testId?: string;
}

/* ── Dropdown Divider (Figma 16-370) ─────────────────────────────── */

export interface DropdownDividerProps {
  /** Optional class name. */
  className?: string;
  /** Optional data-testid. */
  testId?: string;
}

/* ── Dropdown Menu (Figma 180-7911) ──────────────────────────────── */

export interface DropdownMenuProps {
  /** Menu content – compose with DropdownMenuItem, DropdownCategory, DropdownDivider. */
  children: ReactNode;
  /** showDropdownSearch (Figma): show the search bar. Default false. */
  showDropdownSearch?: boolean;
  /** showDropdownFooter (Figma): show the footer area. Default false. */
  showDropdownFooter?: boolean;
  /** Placeholder for the search input. Default "Search". */
  searchPlaceholder?: string;
  /** Current search value (controlled). */
  searchValue?: string;
  /** Called when search value changes. */
  onSearchChange?: (value: string) => void;
  /** Custom footer content (rendered when showDropdownFooter is true). */
  footer?: ReactNode;
  /** Optional class name for the root. */
  className?: string;
  /** Optional data-testid. */
  testId?: string;
}
