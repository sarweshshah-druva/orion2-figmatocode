/**
 * Primitive color tokens (✦)
 * Base color scales. Semantic tokens reference these; components use semantic tokens only.
 * Values in rgb/rgba notation where possible. Replace with Figma tokens-json export when available.
 */

export type ColorScale = Record<string, string>;

/** Base: black (opacity-based scale) */
export const black: ColorScale = {
  40: "rgba(0, 0, 0, 0.04)",
  50: "rgba(0, 0, 0, 0.05)",
  100: "rgba(0, 0, 0, 0.08)",
  200: "rgba(0, 0, 0, 0.12)",
  250: "rgba(0, 0, 0, 0.2)",
  300: "rgba(0, 0, 0, 0.18)",
  500: "rgba(0, 0, 0, 0.36)",
  800: "rgba(0, 0, 0, 0.72)",
  850: "rgba(0, 0, 0, 0.82)",
  900: "rgba(0, 0, 0, 0.88)",
  950: "rgba(0, 0, 0, 0.94)",
  full: "rgb(0, 0, 0)",
};

/** Base: white (opacity-based scale) */
export const white: ColorScale = {
  50: "rgba(255, 255, 255, 0.05)",
  100: "rgba(255, 255, 255, 0.08)",
  200: "rgba(255, 255, 255, 0.12)",
  400: "rgba(255, 255, 255, 0.24)",
  700: "rgba(255, 255, 255, 0.56)",
  800: "rgba(255, 255, 255, 0.72)",
  850: "rgba(255, 255, 255, 0.82)",
  900: "rgba(255, 255, 255, 0.88)",
  950: "rgba(255, 255, 255, 0.94)",
  full: "rgb(255, 255, 255)",
};

/** Neutral grey scale */
export const grey: ColorScale = {
  0: "rgb(255, 255, 255)",
  50: "rgb(245, 245, 245)",
  100: "rgb(234, 238, 242)",
  200: "rgb(230, 230, 231)",
  300: "rgb(212, 213, 214)",
  400: "rgb(149, 151, 154)",
  500: "rgb(126, 128, 132)",
  600: "rgb(76, 79, 85)",
  700: "rgb(66, 74, 83)",
  800: "rgb(50, 56, 63)",
  850: "rgb(33, 38, 45)",
  900: "rgb(22, 27, 34)",
  950: "rgb(13, 17, 23)",
  990: "rgb(1, 4, 9)",
};

/** Brand: blue (primary) */
export const blue: ColorScale = {
  50: "rgb(244, 248, 251)",
  100: "rgb(218, 232, 255)",
  200: "rgb(184, 212, 255)",
  300: "rgb(140, 184, 255)",
  400: "rgb(92, 150, 255)",
  500: "rgb(33, 113, 181)",
  600: "rgb(26, 82, 130)",
  700: "rgb(20, 67, 105)",
  800: "rgb(13, 45, 74)",
  900: "rgb(6, 24, 42)",
  950: "rgb(3, 12, 21)",
  990: "rgb(1, 5, 8)",
};

/** Brand: orange (secondary) */
export const orange: ColorScale = {
  50: "rgb(255, 248, 240)",
  100: "rgb(255, 236, 212)",
  200: "rgb(255, 212, 168)",
  300: "rgb(255, 184, 112)",
  400: "rgb(255, 150, 64)",
  500: "rgb(232, 106, 16)",
  600: "rgb(194, 84, 14)",
  700: "rgb(154, 63, 11)",
  800: "rgb(107, 44, 8)",
  900: "rgb(61, 25, 4)",
  950: "rgb(31, 12, 2)",
  990: "rgb(10, 5, 1)",
};

/** Status: green (success) */
export const green: ColorScale = {
  50: "rgb(232, 245, 233)",
  100: "rgb(200, 230, 201)",
  200: "rgb(165, 214, 167)",
  300: "rgb(129, 199, 132)",
  400: "rgb(102, 187, 106)",
  500: "rgb(40, 167, 69)",
  600: "rgb(35, 140, 58)",
  700: "rgb(30, 113, 47)",
  800: "rgb(25, 86, 36)",
  900: "rgb(20, 59, 25)",
  950: "rgb(15, 42, 18)",
  990: "rgb(5, 16, 8)",
};

/** Status: red (danger/error) */
export const red: ColorScale = {
  50: "rgb(255, 235, 238)",
  100: "rgb(255, 205, 210)",
  200: "rgb(239, 154, 154)",
  300: "rgb(229, 115, 115)",
  400: "rgb(239, 83, 80)",
  500: "rgb(220, 53, 69)",
  600: "rgb(166, 30, 40)",
  700: "rgb(128, 31, 34)",
  800: "rgb(90, 28, 28)",
  900: "rgb(61, 22, 22)",
  950: "rgb(42, 16, 16)",
  990: "rgb(13, 6, 6)",
};

/** Status: amber (warning) */
export const amber: ColorScale = {
  50: "rgb(255, 248, 225)",
  100: "rgb(255, 236, 179)",
  200: "rgb(255, 224, 130)",
  300: "rgb(255, 213, 79)",
  400: "rgb(255, 202, 40)",
  500: "rgb(212, 160, 5)",
  600: "rgb(179, 134, 0)",
  700: "rgb(140, 107, 0)",
  800: "rgb(102, 80, 0)",
  900: "rgb(64, 51, 0)",
  950: "rgb(43, 34, 0)",
  990: "rgb(13, 10, 0)",
};

export const primitives = {
  black,
  white,
  grey,
  blue,
  orange,
  green,
  red,
  amber,
} as const;
