/**
 * Effect tokens: elevation and shadows
 * Shadow colors reference semantic color tokens (e.g. text.neutral.primary with opacity).
 * CSS variables for shadow color will be set per theme.
 */

export type ShadowToken = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string; // CSS variable name, e.g. --color-elevation-shadow
};

/** Shadow color variable name used in CSS; theme sets the actual color */
export const ELEVATION_SHADOW_COLOR_VAR = "--color-elevation-shadow";

export const elevation = {
  sunken: {
    "inner-shadows.1": {
      x: 0,
      y: 1,
      blur: 2,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
    "shadows.1": {
      x: 0,
      y: 0,
      blur: 1,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
  },
  default: {
    "shadows.1": {
      x: 0,
      y: 1,
      blur: 3,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
    "shadows.2": {
      x: 0,
      y: 0,
      blur: 1,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
  },
  raised: {
    "shadows.1": {
      x: 0,
      y: 4,
      blur: 8,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
    "shadows.2": {
      x: 0,
      y: 2,
      blur: 4,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
  },
  overlay: {
    "shadows.1": {
      x: 0,
      y: 8,
      blur: 16,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
    "shadows.2": {
      x: 0,
      y: 4,
      blur: 6,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
  },
  overflow: {
    "inner-shadows.1": {
      x: 0,
      y: -2,
      blur: 4,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
    "shadows.1": {
      x: 0,
      y: 2,
      blur: 4,
      spread: 0,
      color: `var(${ELEVATION_SHADOW_COLOR_VAR})`,
    },
  },
} as const;

/** Flattened shadow definitions for CSS: key -> box-shadow value string */
export function getShadowCssValues(
  shadowColorHex: string
): Record<string, string> {
  const color = shadowColorHex;
  return {
    "elevation.sunken.inner-shadows.1": `inset 0 1px 2px 0 ${color}`,
    "elevation.sunken.shadows.1": `0 0 1px 0 ${color}`,
    "elevation.default.shadows.1": `0 1px 3px 0 ${color}`,
    "elevation.default.shadows.2": `0 0 1px 0 ${color}`,
    "elevation.raised.shadows.1": `0 4px 8px 0 ${color}`,
    "elevation.raised.shadows.2": `0 2px 4px 0 ${color}`,
    "elevation.overlay.shadows.1": `0 8px 16px 0 ${color}`,
    "elevation.overlay.shadows.2": `0 4px 6px 0 ${color}`,
    "elevation.overflow.inner-shadows.1": `inset 0 -2px 4px 0 ${color}`,
    "elevation.overflow.shadows.1": `0 2px 4px 0 ${color}`,
  };
}
