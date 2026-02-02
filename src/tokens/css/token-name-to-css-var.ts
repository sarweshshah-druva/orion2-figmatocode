/**
 * Maps token names (e.g. bg.surface.default, spacer-4) to CSS variable names (e.g. --bg-surface-default, --spacing-4).
 * Aligns with figma-component-guidelines and design-tokens-summary.
 */

/** Token key (e.g. "bg.surface.default") -> CSS custom property name (e.g. "--bg-surface-default") */
export function tokenToCssVar(tokenKey: string): string {
  // Spacing: spacer-none -> --spacing-none, spacer-4 -> --spacing-4
  if (tokenKey.startsWith("spacer-")) {
    return `--spacing-${tokenKey.slice(7)}`;
  }
  if (tokenKey === "spacer-none") {
    return "--spacing-none";
  }
  // Radii: radius-md -> --radius-md
  if (tokenKey.startsWith("radius-")) {
    return `--radius-${tokenKey.slice(7)}`;
  }
  // Opacity: opacity-0 -> --opacity-0
  if (tokenKey.startsWith("opacity-")) {
    return `--opacity-${tokenKey.slice(8)}`;
  }
  // Elevation shadows: elevation.default.shadows.1 -> --elevation-default-shadows-1
  if (tokenKey.startsWith("elevation.")) {
    return `--${tokenKey.replace(/\./g, "-")}`;
  }
  // color.elevation.shadow -> --color-elevation-shadow
  if (tokenKey === "color.elevation.shadow") {
    return "--color-elevation-shadow";
  }
  // Semantic colors and dataviz: dots to hyphens, prefix with category for clarity
  // bg.surface.default -> --bg-surface-default, text.neutral.primary -> --text-neutral-primary
  return `--${tokenKey.replace(/\./g, "-")}`;
}

export function themeToCssVars(theme: Record<string, string>): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(theme)) {
    const varName = tokenToCssVar(key);
    const cssValue = typeof value === "number" ? String(value) : value;
    lines.push(`  ${varName}: ${cssValue};`);
  }
  return lines.join("\n");
}
