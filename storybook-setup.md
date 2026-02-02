# Storybook Setup and Conventions

This document defines how Storybook is integrated into the Orion v2.0 design system: purpose, configuration, file structure, and conventions for stories and documentation.

## 1. Purpose and Role

### Why Storybook

Storybook is the **primary component documentation and development environment** for Orion v2.0. It provides:

- **Isolated component development** – Build and test components in isolation
- **Interactive documentation** – Live examples with prop controls (no custom app needed)
- **Theme support** – Light/dark theme switching via `data-theme` (matches design tokens)
- **Accessibility testing** – Built-in a11y addon aligned with Accessibility First principle
- **Figma integration** – Embed design specs alongside live components
- **Shareable URLs** – Link to specific component states for review and specs
- **Design system as single source of truth** – One place for components, tokens, and docs

### Relationship to Other Planning Docs

| Doc | Relationship |
|-----|--------------|
| **component-page-pattern.md** | Component page content (Hero, Overview, Specs, Examples, Guidelines) is implemented **inside Storybook** via stories and MDX. Use the same sections and design tokens; Storybook provides the shell and controls. |
| **figma-component-guidelines.md** | Components built from Figma are documented in Storybook. Stories show variants, sizes, states; addon-designs can embed Figma. |
| **design-tokens-summary.md** | Storybook preview loads global styles and CSS variables. Theme addon toggles `data-theme` so tokens work in both themes. |
| **documentation-naming.md** | Story and config file naming is defined there and referenced here. |

## 2. Installation and Stack

### When to Add Storybook

Add Storybook **after** the base app exists (Vite + React + TypeScript, design tokens, global styles). Order:

1. Project scaffold (package.json, vite, tsconfig, index.html)
2. Design tokens and global CSS (so Storybook can import them)
3. Storybook init and config
4. First component + stories

### Commands

```bash
# After project exists
npx storybook@latest init
```

Choose React, and Vite if prompted. This adds:

- `.storybook/` config
- Example stories (remove or replace with Orion components)
- Scripts in `package.json`: `storybook`, `build-storybook`

### Addons to Install

```bash
npm install --save-dev @storybook/addon-themes @storybook/addon-a11y @storybook/addon-designs
```

- **addon-themes** – Toolbar toggle for `data-theme="light"` / `data-theme="dark"` (required for tokens)
- **addon-a11y** – Accessibility checks (contrast, ARIA, etc.)
- **addon-designs** – Embed Figma (or other design tools) in the docs tab
- **addon-essentials** – Usually included by init (controls, actions, viewport, docs)

## 3. Configuration

### Directory Layout

```
.storybook/
├── main.ts              # Storybook config (stories paths, addons, framework)
├── preview.ts           # Global decorators, parameters, CSS imports
├── preview-head.html    # Optional: fonts, meta
└── manager.ts           # Optional: custom theme, sidebar
```

### main.ts

- **stories**: `['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)']`
- **addons**: essentials, a11y, themes, designs
- **framework**: `@storybook/react-vite`
- **docs**: `autodocs: 'tag'` so components with `tags: ['autodocs']` get generated docs

### preview.ts

- **Import global styles and tokens**  
  `import '../src/styles/global.css'` and token CSS (e.g. `../src/tokens/css-variables.css`) so all stories use Orion tokens.
- **Theme decorator**  
  Use `withThemeByDataAttribute` from `@storybook/addon-themes`:
  - `attributeName: 'data-theme'`
  - `themes: { light: 'light', dark: 'dark' }`
  - `defaultTheme: 'light'`
- **parameters**  
  Set defaults for layout (`centered`), controls, and optionally disable default backgrounds (rely on theme instead).

### Design Tokens and Themes

- Components already use CSS variables and `data-theme`; no change required.
- Storybook’s theme addon only switches `data-theme` on the preview container; token CSS must be loaded in `preview.ts` so variables resolve correctly in both themes.

## 4. File and Naming Conventions

### Story Files

- **Name**: `ComponentName.stories.tsx` (or `.stories.ts`), colocated with the component.
- **Location**: Same folder as the component, e.g. `src/components/Button/Button.stories.tsx`.
- **Docs**: See **documentation-naming.md** for full rules (e.g. `*.stories.tsx`, MDX).

### Storybook Config Files

- **Directory**: `.storybook/` (hidden directory at repo root).
- **Files**: `main.ts`, `preview.ts` (and optional `preview-head.html`, `manager.ts`).
- **Naming**: Lowercase with hyphen if adding custom files (e.g. `custom-theme.ts`).

### MDX Documentation

- **Naming**: Can match component (e.g. `Button.mdx`) or be a standalone doc (e.g. `Introduction.mdx`).
- **Placement**: Under `src/` so they’re picked up by the stories glob, or in a dedicated `src/docs/` with path in `main.ts` if preferred.

## 5. Story Structure and Content

### One Meta, Multiple Stories

- **Default export**: `Meta<typeof Component>` with `title`, `component`, `parameters`, `argTypes`, `tags: ['autodocs']`.
- **Named exports**: One export per “state” or “example” (e.g. `Primary`, `Secondary`, `AllSizes`, `Disabled`).
- **Title hierarchy**: `title: 'Components/Button'` (category/component). Keep categories consistent (e.g. Components, Tokens, Layout).

### Aligning with Component Page Pattern

The **component-page-pattern.md** describes: Hero, Overview, Specifications, Detailed Examples, Usage Guidelines. In Storybook:

- **Hero / description** – In MDX or in the meta `parameters.docs.description.component`.
- **Overview** – One story per variant (e.g. Primary, Secondary, Tertiary) showing the main use.
- **Specifications** – Table-like content in MDX or a dedicated “Specs” story; optionally auto from `argTypes`.
- **Detailed examples** – Stories for size × state matrix (e.g. Default / Disabled for each size).
- **Usage guidelines** – Do’s and Don’ts in MDX or a guidelines story.

Stories should use **design tokens only** (same as component-page-pattern): spacing, typography, colors via CSS variables, no hardcoded values in story UIs.

### Figma and addon-designs

- In meta `parameters.design` set `type: 'figma'` and the Figma URL (with node id if needed).
- This embeds the design in the Docs tab and keeps implementation aligned with Figma.

### ArgTypes

- Define `argTypes` for props that should be controllable (variant, size, disabled, etc.).
- Use `control: 'select'` with `options` for enums; `control: 'boolean'` for booleans.
- Add short `description` where it helps; autodocs will surface them.

## 6. Implementation Order (Rebuild)

When rebuilding the project, Storybook is part of the plan as follows:

1. **Scaffold** – Vite + React + TypeScript, entry point, basic `index.html`.
2. **Design tokens** – Token source (e.g. JSON/TS) and generated CSS variables; optional theme provider.
3. **Global styles** – `global.css` (and any base layout) that use tokens.
4. **Storybook** – Run `npx storybook@latest init`, add addons (themes, a11y, designs), configure `preview.ts` (import tokens + global CSS, theme decorator).
5. **First component** – e.g. Button: types, CSS (tokens only), component, then `Button.stories.tsx` covering variants/sizes/states.
6. **Docs** – Add MDX for that component (or expand autodocs) to mirror component-page-pattern sections.
7. **Further components** – Same pattern: build from Figma → component + stories + MDX.

## 7. What Lives Where

| Item | Location |
|------|----------|
| Storybook config | `.storybook/main.ts`, `preview.ts` |
| Global styles / tokens | `src/styles/`, `src/tokens/` (imported in `preview.ts`) |
| Component code | `src/components/ComponentName/` |
| Stories | `src/components/ComponentName/ComponentName.stories.tsx` |
| Component docs (MDX) | `src/components/ComponentName/ComponentName.mdx` or `src/docs/` |
| Standalone docs | `src/docs/*.mdx` (if glob includes them) |

## 8. Out of Scope (For This Doc)

- Visual regression (e.g. Chromatic) – plan separately if needed.
- Publishing Storybook (e.g. static build to CDN) – deployment doc.
- Custom Storybook theme (branding) – optional; can be added in `.storybook/manager.ts` / theme file.

---

**Summary:** Storybook is the main place for component documentation and development. Config lives in `.storybook/`; stories and MDX live next to components and follow the component-page-pattern content and design-token usage. Add Storybook after tokens and global styles exist, then add components and their stories in order.
