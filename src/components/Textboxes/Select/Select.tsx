import { useId, useCallback, useState, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import type { SelectProps } from "./Select.types";
import { SimpleDropdown } from "./SimpleDropdown";
import "./Select.css";

const ICON_SIZE = 16;

/**
 * Select – Orion v2.0 (Figma 1994-16022).
 * Textbox variant: no left icon. The label/value area acts as a search input that filters dropdown options.
 * Dropdown chevron always visible. States: Default, Focused, Disabled, Read-Only, Error.
 */
export function Select({
  value,
  placeholder = "Label Text",
  disabled = false,
  readOnly = false,
  errorText,
  descriptionText,
  showDescription = true,
  onClick,
  onFocus,
  onBlur,
  className = "",
  testId,
  id: idProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedbyProp,
  options = [],
  onSelect,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = errorText != null && errorText !== "";
  const hasValue = value != null && value !== "";
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const descriptionId =
    showDescription && descriptionText && !hasError
      ? `${id}-description`
      : undefined;
  const errorId = showDescription && hasError ? `${id}-error` : undefined;
  const ariaDescribedby =
    [ariaDescribedbyProp, descriptionId, errorId].filter(Boolean).join(" ") ||
    undefined;

  const filteredOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q),
    );
  }, [options, searchQuery]);

  const openDropdown = useCallback(() => {
    if (disabled || readOnly || options.length === 0) return;
    setIsDropdownOpen(true);
    setSearchQuery(value ?? "");
  }, [disabled, readOnly, options.length, value]);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
    setSearchQuery("");
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    openDropdown();
    onFocus?.();
  }, [openDropdown, onFocus]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleChevronClick = useCallback(() => {
    if (disabled || readOnly) return;
    onClick?.();
    if (options.length > 0) {
      if (isDropdownOpen) {
        closeDropdown();
      } else {
        openDropdown();
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  }, [disabled, readOnly, options.length, isDropdownOpen, openDropdown, closeDropdown, onClick]);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      onSelect?.(selectedValue);
      closeDropdown();
    },
    [onSelect, closeDropdown],
  );

  const displayValue = isDropdownOpen ? searchQuery : (value ?? "");

  const rootClass = [
    "orion-select",
    hasError && "orion-select--error",
    disabled && "orion-select--disabled",
    readOnly && "orion-select--read-only",
    isFocused && "orion-select--focused",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} data-testid={testId} data-focused={isFocused || undefined}>
      <div className="orion-select__dropdown-anchor">
        <div ref={buttonWrapRef} className="orion-select__button-wrap">
          <input
          ref={inputRef}
          type="text"
          id={id}
          className={`orion-select__input ${!hasValue && !searchQuery ? "orion-select__input--placeholder" : ""}`}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-expanded={isDropdownOpen}
          aria-autocomplete="list"
          aria-controls={isDropdownOpen ? `${id}-listbox` : undefined}
          role="combobox"
        />
        <button
          type="button"
          className="orion-select__chevron-btn"
          disabled={disabled || readOnly}
          onClick={handleChevronClick}
          tabIndex={-1}
          aria-hidden
        >
          <ChevronDown
            size={ICON_SIZE}
            className="orion-select__chevron"
            aria-hidden
          />
        </button>
        </div>
        {options.length > 0 && (
          <SimpleDropdown
            id={`${id}-listbox`}
            options={filteredOptions}
            isOpen={isDropdownOpen}
            onSelect={handleSelect}
            onClose={closeDropdown}
            triggerRef={buttonWrapRef}
            triggerBorderWidth={isFocused ? 2 : 1}
            attachToParent
          />
        )}
      </div>
      {showDescription && hasError ? (
        <span className="orion-select__error" id={errorId} role="alert">
          {errorText}
        </span>
      ) : showDescription && descriptionText != null ? (
        <span className="orion-select__description" id={descriptionId}>
          {descriptionText}
        </span>
      ) : null}
    </div>
  );
}

Select.displayName = "Select";
