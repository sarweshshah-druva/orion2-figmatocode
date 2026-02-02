/**
 * Typography token names to CSS variables (theme-agnostic).
 * Each semantic style (title.display, body.medium, etc.) becomes --font-{style}-{property}.
 */

import { typographyStyles } from "../semantic/typography-styles";

function styleKeyToCssPrefix(key: string): string {
  return key.replace(/\./g, "-");
}

export function getTypographyCssVars(): string {
  const lines: string[] = [];
  for (const [key, style] of Object.entries(typographyStyles)) {
    const prefix = `--font-${styleKeyToCssPrefix(key)}`;
    lines.push(`  ${prefix}-family: ${style.fontFamily};`);
    lines.push(`  ${prefix}-size: ${style.fontSize};`);
    lines.push(`  ${prefix}-weight: ${style.fontWeight};`);
    lines.push(`  ${prefix}-line-height: ${style.lineHeight};`);
    lines.push(`  ${prefix}-letter-spacing: ${style.letterSpacing};`);
  }
  return lines.join("\n");
}
