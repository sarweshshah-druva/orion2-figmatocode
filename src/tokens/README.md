# Orion v2.0 Design Tokens

Design tokens for the Orion UI design system. Tokens mirror the structure in the Figma **`tokens-json`** variable (collections: colours, typography, effects, spacings, opacity). Use **semantic tokens** in components; do not reference primitives directly.

## Structure

- **Primitives (✦)** – `primitives/` – Base colors, typography scales, spacers, radii, opacity.
- **Semantic (❖)** – `themes/semantic-colors-*.ts`, `semantic/typography-styles.ts` – Context-specific tokens that reference primitives.
- **Effects** – `effects.ts` – Elevation and shadows (reference color tokens).
- **Themes** – `themes/` – Light and dark theme aggregation; used to generate CSS variables.

## Usage

### CSS variables (recommended for styling)

1. Import the generated CSS in your app or Storybook:

   ```css
   @import "../tokens/css-variables.css";
   ```

   Or in JS/TS:

   ```ts
   import "./tokens/css-variables.css";
   ```

2. Set the theme on a root element:

   ```html
   <html data-theme="light"></html>
   ```

   Or switch at runtime:

   ```ts
   document.documentElement.setAttribute("data-theme", "dark");
   ```

3. Use variables in your CSS:

   ```css
   .card {
     background: var(--bg-surface-card);
     color: var(--text-neutral-primary);
     padding: var(--spacing-4);
     border-radius: var(--radius-md);
     box-shadow: var(--elevation-default-shadows-1);
   }

   .title {
     font-family: var(--font-title-display-family);
     font-size: var(--font-title-display-size);
     font-weight: var(--font-title-display-weight);
     line-height: var(--font-title-display-line-height);
     letter-spacing: var(--font-title-display-letter-spacing);
   }
   ```

### TypeScript/JavaScript

When you need token values in code (e.g. for inline styles or tooling):

```ts
import { buildTheme, typographyStyles, spacers, radii } from "./tokens";

const light = buildTheme("light");
const primaryBg = light["bg.action.primary"];

const bodyMedium = typographyStyles["body.medium"];
// { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }
```

## Regenerating CSS

After changing primitives or semantic tokens, regenerate the CSS file:

```bash
npx tsx src/tokens/generate-css.ts
```

This updates `src/tokens/css-variables.css` (light on `:root`, dark on `[data-theme="dark"]`, typography on `:root`).

## Naming

- **Figma** uses `color.bg.surface`, `headings/small`, `spacer-4`, `radius-md`.
- **CSS variables** use hyphens: `--bg-surface-default`, `--font-headings-small-size`, `--spacing-4`, `--radius-md`.
- **TypeScript** uses dots for semantic keys: `bg.surface.default`, `headings.medium`.

See **design-tokens-summary.md** (project root) for the full token reference and **figma-component-guidelines.md** for component usage.
