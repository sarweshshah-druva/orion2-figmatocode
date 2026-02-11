import { useCallback, useMemo, useState, useRef, type ReactNode } from "react";
import { ToggleGroupContext } from "./ToggleGroupContext";
import type { ToggleGroupProps } from "./ToggleGroup.types";
import "./ToggleGroup.css";

/**
 * ToggleGroup – Orion v2.0 (Figma node 20-612).
 * Container for ToggleGroupItem; supports single or multiple selection.
 * Uses design tokens only; no hardcoded values.
 */
export function ToggleGroup({
  variant = "single",
  "aria-label": ariaLabel,
  value: controlledValue,
  onValueChange,
  defaultValue,
  disabled = false,
  children,
  className = "",
  testId,
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    () =>
      variant === "single"
        ? (defaultValue as string | undefined) ?? ""
        : (defaultValue as string[] | undefined) ?? []
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = useCallback(
    (next: string | string[]) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const registeredRef = useRef<Set<string>>(new Set());
  const registerItem = useCallback((v: string) => {
    registeredRef.current.add(v);
  }, []);
  const unregisterItem = useCallback((v: string) => {
    registeredRef.current.delete(v);
  }, []);

  const contextValue = useMemo(
    () => ({
      variant,
      value,
      onValueChange: handleValueChange,
      disabled,
      registerItem,
      unregisterItem,
    }),
    [variant, value, disabled, handleValueChange, registerItem, unregisterItem]
  );

  const rootClass = ["orion-toggle-group", className].filter(Boolean).join(" ");

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        className={rootClass}
        role={variant === "single" ? "radiogroup" : "group"}
        data-testid={testId}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}
