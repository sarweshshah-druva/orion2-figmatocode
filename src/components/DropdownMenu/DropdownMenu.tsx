import { useCallback } from "react";
import { Search, X } from "lucide-react";
import type { DropdownMenuProps } from "./DropdownMenu.types";
import "./DropdownMenu.css";

const ICON_SIZE = 16;

/**
 * Dropdown Menu – Orion v2.0 (Figma node 180-7911).
 * Container for dropdown items with optional search bar and footer.
 * Compose with DropdownMenuItem, DropdownCategory, DropdownDivider as children.
 * Props match Figma: showDropdownSearch, showDropdownFooter.
 */
export function DropdownMenu({
  children,
  showDropdownSearch = false,
  showDropdownFooter = false,
  searchPlaceholder = "Search",
  searchValue = "",
  onSearchChange,
  footer,
  className = "",
  testId,
}: DropdownMenuProps) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(e.target.value);
    },
    [onSearchChange]
  );

  const handleSearchClear = useCallback(() => {
    onSearchChange?.("");
  }, [onSearchChange]);

  const rootClass = ["orion-dropdown-menu", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-testid={testId} role="menu">
      {showDropdownSearch ? (
        <div className="orion-dropdown-menu__search">
          <div className="orion-dropdown-menu__search-input-wrap">
            <span className="orion-dropdown-menu__search-icon" aria-hidden>
              <Search size={ICON_SIZE - 2} />
            </span>
            <input
              className="orion-dropdown-menu__search-input"
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              aria-label={searchPlaceholder}
            />
            {searchValue ? (
              <button
                type="button"
                className="orion-dropdown-menu__search-clear"
                onClick={handleSearchClear}
                aria-label="Clear search"
                tabIndex={-1}
              >
                <X size={ICON_SIZE} aria-hidden />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="orion-dropdown-menu__list">{children}</div>

      {showDropdownFooter && footer != null ? (
        <div className="orion-dropdown-menu__footer">{footer}</div>
      ) : null}
    </div>
  );
}
