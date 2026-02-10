import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, Check } from "lucide-react";
import type { DropdownMenuItemProps } from "./DropdownMenu.types";

const ICON_SIZE = 16;

/** Grace period (ms) when moving between the trigger item and the flyout. */
const SUBMENU_CLOSE_DELAY = 150;

/**
 * Dropdown Menu Item – Orion v2.0 (Figma node 13-367).
 * States: Default, Hover, Selected, Disabled.
 * Selected → check icon + accent text. Hover → subtle bg.
 * Supports leftIcon, subText, nestedList chevron, badge/status.
 * When nestedList=true and nestedContent is provided, a flyout submenu
 * appears on hover positioned to the right of the item via a React portal
 * (so it escapes any overflow clipping on ancestor containers).
 */
export function DropdownMenuItem({
  state = "Default",
  itemText = "Label",
  subText = "SubText",
  showSubText = false,
  leftIcon,
  showLeftIcon = false,
  nestedList = false,
  nestedContent,
  showBadgeStatus = false,
  status,
  onClick,
  className = "",
  testId,
}: DropdownMenuItemProps) {
  const isSelected = state === "Selected";
  const isDisabled = state === "Disabled";

  const hasNestedContent = nestedList && nestedContent != null && !isDisabled;

  /* ── Nested submenu hover state (portal-based) ──────────────── */
  const itemRef = useRef<HTMLDivElement>(null);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [nestedPos, setNestedPos] = useState({ top: 0, left: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const openNested = useCallback(() => {
    if (!hasNestedContent) return;
    clearTimeout(closeTimer.current);
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setNestedPos({ top: rect.top, left: rect.right });
    }
    setNestedOpen(true);
  }, [hasNestedContent]);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(
      () => setNestedOpen(false),
      SUBMENU_CLOSE_DELAY,
    );
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  // Clean up timer on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const rootClass = [
    "orion-dropdown-item",
    `orion-dropdown-item--${state.toLowerCase()}`,
    hasNestedContent && "orion-dropdown-item--has-nested",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div
        ref={itemRef}
        className={rootClass}
        data-testid={testId}
        role="menuitem"
        aria-disabled={isDisabled || undefined}
        aria-haspopup={hasNestedContent ? "menu" : undefined}
        onClick={isDisabled ? undefined : onClick}
        tabIndex={isDisabled ? -1 : 0}
        onMouseEnter={hasNestedContent ? openNested : undefined}
        onMouseLeave={hasNestedContent ? scheduleClose : undefined}
        onKeyDown={
          isDisabled
            ? undefined
            : (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }
        }
      >
        {/* Selected state: check icon */}
        {isSelected ? (
          <span className="orion-dropdown-item__check" aria-hidden>
            <Check size={ICON_SIZE} />
          </span>
        ) : null}

        {/* Content: icon + label + subtext */}
        <div className="orion-dropdown-item__content">
          <div className="orion-dropdown-item__icon-label">
            {showLeftIcon && leftIcon != null ? (
              <span className="orion-dropdown-item__left-icon" aria-hidden>
                {leftIcon}
              </span>
            ) : null}
            <div className="orion-dropdown-item__text-container">
              <span className="orion-dropdown-item__label">{itemText}</span>
              {showSubText ? (
                <span className="orion-dropdown-item__sub-text">{subText}</span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Badge / status */}
        {showBadgeStatus && status != null ? (
          <div className="orion-dropdown-item__badge-container">{status}</div>
        ) : null}

        {/* Nested-list chevron (not shown in Selected state) */}
        {nestedList && !isSelected ? (
          <span className="orion-dropdown-item__chevron" aria-hidden>
            <ChevronRight size={ICON_SIZE} />
          </span>
        ) : null}
      </div>

      {/* Flyout submenu – rendered via portal to escape overflow clipping */}
      {hasNestedContent && nestedOpen
        ? createPortal(
            <div
              className="orion-dropdown-item__nested orion-dropdown-item__nested--open"
              role="menu"
              style={{ top: nestedPos.top, left: nestedPos.left }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {nestedContent}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
