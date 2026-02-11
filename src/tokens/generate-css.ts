/**
 * Generates src/tokens/css-variables.css from theme tokens.
 * Run: npx tsx src/tokens/generate-css.ts
 */

import { buildTheme } from "./themes/build-theme";
import { themeToCssVars } from "./css/token-name-to-css-var";
import { getTypographyCssVars } from "./css/typography-vars";
import { colorPrimitiveValues } from "./primitives/colors";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lightVars = themeToCssVars(buildTheme("light"));
const darkVars = themeToCssVars(buildTheme("dark"));
const typographyVars = getTypographyCssVars();

function getPrimitiveCssVars(): string {
  const lines: string[] = [];
  for (const [colorName, scale] of Object.entries(colorPrimitiveValues)) {
    for (const [step, value] of Object.entries(scale)) {
      lines.push(`  --${colorName}-${step}: ${value};`);
    }
  }
  return lines.join("\n");
}

const primitiveVars = getPrimitiveCssVars();

const css = `/**
 * Orion v2.0 design tokens – CSS custom properties
 * Generated from src/tokens. Light theme on :root, dark on [data-theme="dark"].
 * Typography vars are theme-agnostic (on :root only).
 * Do not edit by hand; run: npx tsx src/tokens/generate-css.ts
 */

:root {
/* Primitives */
${primitiveVars}

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
