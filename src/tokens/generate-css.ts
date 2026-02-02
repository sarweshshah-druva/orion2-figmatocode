/**
 * Generates src/tokens/css-variables.css from theme tokens.
 * Run: npx tsx src/tokens/generate-css.ts
 */

import { buildTheme } from "./themes/build-theme";
import { themeToCssVars } from "./css/token-name-to-css-var";
import { getTypographyCssVars } from "./css/typography-vars";
import * as fs from "fs";
import * as path from "path";

const lightVars = themeToCssVars(buildTheme("light"));
const darkVars = themeToCssVars(buildTheme("dark"));
const typographyVars = getTypographyCssVars();

const css = `/**
 * Orion v2.0 design tokens – CSS custom properties
 * Generated from src/tokens. Light theme on :root, dark on [data-theme="dark"].
 * Typography vars are theme-agnostic (on :root only).
 * Do not edit by hand; run: npx tsx src/tokens/generate-css.ts
 */

:root {
/* Typography (semantic styles) */
${typographyVars}

/* Colors, spacing, effects – light theme */
${lightVars}
}

[data-theme="dark"] {
${darkVars}
}
`;

const outPath = path.join(__dirname, "css-variables.css");
fs.writeFileSync(outPath, css, "utf-8");
console.log("Wrote", outPath);
