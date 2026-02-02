/**
 * Builds a full theme object (semantic colors + dataviz + spacing + opacity + effects).
 * Used to generate CSS variables.
 */

import { semanticColorsLight } from "./semantic-colors-light";
import { semanticColorsDark } from "./semantic-colors-dark";
import { datavizLight, datavizDark } from "./dataviz";
import { spacers, radii } from "../primitives/spacing";
import { opacity } from "../primitives/opacity";
import { getShadowCssValues } from "../effects";

export type ThemeMode = "light" | "dark";

/** Elevation shadow color per theme (used for --color-elevation-shadow) */
const elevationShadowColor: Record<ThemeMode, string> = {
  light: "rgba(0, 0, 0, 0.15)",
  dark: "rgba(0, 0, 0, 0.4)",
};

export function buildTheme(mode: ThemeMode): Record<string, string> {
  const semantic = mode === "light" ? semanticColorsLight : semanticColorsDark;
  const dataviz = mode === "light" ? datavizLight : datavizDark;
  const shadowColor = elevationShadowColor[mode];
  const shadows = getShadowCssValues(shadowColor);

  const opacityStrings = Object.fromEntries(
    Object.entries(opacity).map(([k, v]) => [k, String(v)])
  ) as Record<string, string>;

  return {
    ...Object.fromEntries(Object.entries(semantic).map(([k, v]) => [k, v])),
    ...Object.fromEntries(Object.entries(dataviz).map(([k, v]) => [k, v])),
    ...spacers,
    ...radii,
    ...opacityStrings,
    ...shadows,
    "color.elevation.shadow": shadowColor,
  };
}
