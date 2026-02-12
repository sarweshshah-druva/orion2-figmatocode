import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./SimpleDropdown.css";

export interface SimpleDropdownOption {
  label: string;
  value: string;
}

export interface SimpleDropdownProps {
  /** Options to display in the dropdown */
  options: SimpleDropdownOption[];
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Callback when an option is selected */
  onSelect: (value: string) => void;
  /** Callback when dropdown should close */
  onClose: () => void;
  /** Reference to the trigger element for positioning */
  triggerRef: React.RefObject<HTMLElement>;
  /** Trigger's bottom border width in px so the dropdown can overlap and avoid a double-line gap. E.g. 1 when default, 2 when focused. */
  triggerBorderWidth?: number;
  /** When true, render dropdown inline (no portal) so it is positioned relative to parent and scrolls with the page. */
  attachToParent?: boolean;
  /** Optional id for the listbox (for aria-controls) */
  id?: string;
  /** Optional test id */
  testId?: string;
}

/**
 * SimpleDropdown – Simple dropdown menu that positions below a trigger element.
 * Used by Textbox and Select components.
 */
export function SimpleDropdown({
  options,
  isOpen,
  onSelect,
  onClose,
  triggerRef,
  triggerBorderWidth = 0,
  attachToParent = false,
  id,
  testId,
}: SimpleDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const overlap = triggerBorderWidth + 1;

  /* When attachToParent: use CSS relative to parent. Otherwise: viewport coords for body portal. */
  const effectivePosition =
    attachToParent
      ? null
      : isOpen && triggerRef.current
        ? (() => {
            const rect = triggerRef.current!.getBoundingClientRect();
            return {
              top: rect.bottom - overlap,
              left: rect.left,
              width: rect.width,
            };
          })()
        : position;

  useLayoutEffect(() => {
    if (attachToParent || !isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom - overlap,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [attachToParent, isOpen, triggerRef, triggerBorderWidth, overlap]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Use a small delay to ensure dropdown is rendered and click events are processed
    const timeoutId = setTimeout(() => {
      // Use click with capture phase to catch events after they've bubbled
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("keydown", handleEscape);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const dropdownContent = (
    <div
      ref={dropdownRef}
      id={id}
      className="orion-simple-dropdown"
      role="listbox"
      style={
        attachToParent
          ? {
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              width: "100%",
              minWidth: "100%",
              maxWidth: "100%",
              marginTop: -overlap + 2,
            }
          : {
              position: "absolute",
              top: `${effectivePosition!.top}px`,
              left: `${effectivePosition!.left}px`,
              width: `${effectivePosition!.width}px`,
              minWidth: `${effectivePosition!.width}px`,
              maxWidth: `${effectivePosition!.width}px`,
            }
      }
      data-testid={testId}
    >
      {options.length === 0 ? (
        <div className="orion-simple-dropdown__empty" role="status">
          No results
        </div>
      ) : (
        options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="orion-simple-dropdown__item"
            onClick={() => {
              onSelect(option.value);
              onClose();
            }}
            role="option"
          >
            {option.label}
          </button>
        ))
      )}
    </div>
  );

  if (attachToParent) return dropdownContent;

  return createPortal(dropdownContent, document.body);
}
