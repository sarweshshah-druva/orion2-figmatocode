/**
 * Primitive color tokens (✦)
 * Base color scales. Semantic tokens reference these; components use semantic tokens only.
 * Values in rgb/rgba notation where possible. Replace with Figma tokens-json export when available.
 */

export type ColorScale = Record<string, string>;

// Raw values
const blackValues: ColorScale = {
  50: "rgba(0, 0, 0, 0.05)",
  100: "rgba(0, 0, 0, 0.1)",
  200: "rgba(0, 0, 0, 0.2)",
  300: "rgba(0, 0, 0, 0.3)",
  400: "rgba(0, 0, 0, 0.4)",
  500: "rgba(0, 0, 0, 0.5)",
  600: "rgba(0, 0, 0, 0.6)",
  700: "rgba(0, 0, 0, 0.7)",
  800: "rgba(0, 0, 0, 0.8)",
  850: "rgba(0, 0, 0, 0.85)",
  900: "rgba(0, 0, 0, 0.9)",
  950: "rgba(0, 0, 0, 0.95)",
  full: "rgb(0, 0, 0)",
};

const whiteValues: ColorScale = {
  50: "rgba(255, 255, 255, 0.05)",
  100: "rgba(255, 255, 255, 0.1)",
  200: "rgba(255, 255, 255, 0.2)",
  300: "rgba(255, 255, 255, 0.3)",
  400: "rgba(255, 255, 255, 0.4)",
  500: "rgba(255, 255, 255, 0.5)",
  600: "rgba(255, 255, 255, 0.6)",
  700: "rgba(255, 255, 255, 0.7)",
  800: "rgba(255, 255, 255, 0.8)",
  850: "rgba(255, 255, 255, 0.85)",
  900: "rgba(255, 255, 255, 0.9)",
  950: "rgba(255, 255, 255, 0.95)",
  full: "rgb(255, 255, 255)",
};

const greyValues: ColorScale = {
  0: "rgb(255, 255, 255)",
  50: "rgb(245, 245, 245)",
  100: "rgb(230, 230, 231)",
  200: "rgb(212, 213, 214)",
  300: "rgb(192, 194, 196)",
  400: "rgb(171, 173, 176)",
  500: "rgb(149, 151, 154)",
  600: "rgb(126, 128, 132)",
  700: "rgb(101, 104, 109)",
  800: "rgb(76, 79, 85)",
  900: "rgb(49, 54, 60)",
  950: "rgb(22, 27, 34)",
  990: "rgb(13, 17, 23)",
};

const blueValues: ColorScale = {
  50: "rgb(244, 248, 251)",
  100: "rgb(211, 227, 240)",
  200: "rgb(166, 198, 225)",
  300: "rgb(122, 170, 211)",
  400: "rgb(77, 141, 196)",
  500: "rgb(33, 113, 181)",
  600: "rgb(30, 98, 155)",
  700: "rgb(26, 82, 130)",
  800: "rgb(23, 67, 104)",
  900: "rgb(19, 51, 78)",
  950: "rgb(16, 36, 53)",
  990: "rgb(12, 20, 27)",
};

const orangeValues: ColorScale = {
  50: "rgb(255, 250, 242)",
  100: "rgb(255, 235, 204)",
  200: "rgb(255, 214, 153)",
  300: "rgb(255, 194, 102)",
  400: "rgb(255, 173, 51)",
  500: "rgb(255, 153, 0)",
  600: "rgb(218, 132, 2)",
  700: "rgb(182, 110, 3)",
  800: "rgb(145, 89, 5)",
  900: "rgb(108, 67, 6)",
  950: "rgb(71, 46, 8)",
  990: "rgb(34, 24, 9)",
};

const greenValues: ColorScale = {
  50: "rgb(244, 251, 246)",
  100: "rgb(212, 237, 218)",
  200: "rgb(169, 220, 181)",
  300: "rgb(126, 202, 143)",
  400: "rgb(83, 185, 106)",
  500: "rgb(40, 167, 69)",
  600: "rgb(36, 143, 60)",
  700: "rgb(31, 120, 51)",
  800: "rgb(27, 96, 42)",
  900: "rgb(22, 73, 34)",
  950: "rgb(18, 49, 25)",
  990: "rgb(13, 26, 16)",
};

const redValues: ColorScale = {
  50: "rgb(253, 245, 246)",
  100: "rgb(248, 215, 218)",
  200: "rgb(241, 174, 181)",
  300: "rgb(234, 134, 143)",
  400: "rgb(227, 93, 106)",
  500: "rgb(220, 53, 69)",
  600: "rgb(189, 47, 60)",
  700: "rgb(157, 40, 51)",
  800: "rgb(126, 34, 42)",
  900: "rgb(94, 27, 34)",
  950: "rgb(63, 21, 25)",
  990: "rgb(31, 14, 16)",
};

const amberValues: ColorScale = {
  50: "rgb(255, 252, 243)",
  100: "rgb(255, 243, 205)",
  200: "rgb(255, 230, 156)",
  300: "rgb(255, 218, 106)",
  400: "rgb(255, 205, 57)",
  500: "rgb(255, 193, 7)",
  600: "rgb(218, 166, 7)",
  700: "rgb(182, 138, 8)",
  800: "rgb(145, 111, 8)",
  900: "rgb(108, 83, 9)",
  950: "rgb(71, 56, 9)",
  990: "rgb(34, 28, 10)",
};

// Helper to create var references
function createRefs(name: string, obj: Record<string, string>) {
  return Object.fromEntries(
    Object.keys(obj).map((k) => [k, `var(--${name}-${k})`]),
  ) as ColorScale;
}

/** Reference exports (used by semantic tokens) */
export const black = createRefs("black", blackValues);
export const white = createRefs("white", whiteValues);
export const grey = createRefs("grey", greyValues);
export const blue = createRefs("blue", blueValues);
export const orange = createRefs("orange", orangeValues);
export const green = createRefs("green", greenValues);
export const red = createRefs("red", redValues);
export const amber = createRefs("amber", amberValues);

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

/** Values export (used by generator) */
export const colorPrimitiveValues = {
  black: blackValues,
  white: whiteValues,
  grey: greyValues,
  blue: blueValues,
  orange: orangeValues,
  green: greenValues,
  red: redValues,
  amber: amberValues,
};
