/**
 * Orion v2.0 design tokens
 *
 * Use semantic tokens in components; do not reference primitives directly.
 * Import this module when you need token values in TypeScript.
 * For styling, use CSS variables from css-variables.css (data-theme="light" | "dark").
 */

// Primitives (for reference; prefer semantic tokens in components)
export {
  colorPrimitives,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  spacers,
  radii,
  opacity,
} from "./primitives";

// Semantic typography styles
export { typographyStyles } from "./semantic/typography-styles";
export type { TextStyle } from "./semantic/typography-styles";

// Effects (shadows)
export {
  elevation,
  getShadowCssValues,
  ELEVATION_SHADOW_COLOR_VAR,
} from "./effects";

// Themes (semantic colors + full theme builder)
export {
  buildTheme,
  semanticColorsLight,
  semanticColorsDark,
  datavizLight,
  datavizDark,
} from "./themes";
export type { ThemeMode } from "./themes";
