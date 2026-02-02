# Building Components from Figma - Guidelines

This document outlines the process and rules for creating React components from Figma designs in the Orion v2.0 design system. Component demos and documentation live in **Storybook** (stories and optional MDX). See **storybook-setup.md** for Storybook conventions and **component-page-pattern.md** for doc content structure.

## Core Principles

### 1. **Build ONLY What's Defined in Figma**

- Do NOT add extra features, styling, or functionality
- Do NOT add backgrounds, borders, padding, or cards unless explicitly shown in Figma
- Stick to the exact specifications - no assumptions or enhancements

### 2. **Use Figma Desktop Tools**

Always access Figma specifications programmatically:

```typescript
// Get design context
mcp_Figma_Desktop_get_design_context({
  clientFrameworks: "react",
  clientLanguages: "typescript",
  nodeId: "59:2551", // Extract from Figma URL
});

// Get screenshot for visual reference
mcp_Figma_Desktop_get_screenshot({
  clientFrameworks: "react",
  clientLanguages: "typescript",
  nodeId: "59:2551",
});
```

### 3. **Use Design Tokens - Never Hardcode Values**

Always use design tokens for ALL styling properties. NEVER hardcode values when tokens are available.

The token system supports:

- **Light/Dark themes** - Automatic theme switching via `data-theme` attribute
- **TypeScript imports** - Import tokens directly in JS/TS files
- **CSS variables** - Use CSS custom properties for maximum flexibility
- **Complete typography** - Every text style includes all 5 properties (font-family, font-size, line-height, font-weight, letter-spacing)
- **Semantic colors** - Context-specific color tokens that automatically adapt to themes

**Typography Tokens:**

Title Styles (for large headings):

- `title/display-large`: 48px/48px (semibold)
- `title/display`: 40px/40px (semibold)
- `title/title`: 36px/36px (semibold)
- `title/subtitle`: 30px/30px (semibold)

Heading Styles:

- `headings/xx-large`: 24px/25px (semibold)
- `headings/x-large`: 18px/22px (semibold)
- `headings/large`: 16px/20px (semibold)
- `headings/medium`: 14px/18px (semibold)
- `headings/small`: 13px/18px (semibold)

Body Text Styles:

- `body/x-large`: 18px/23px (regular)
- `body/large`: 16px/21px (regular)
- `body/medium`: 14px/18px (regular)
- `body/small`: 12px/16px (regular)

Caption Styles:

- `captions/x-small`: 11px/14px (regular)
- `captions/xx-small`: 10px/13px (regular)

Metrics/Data Styles:

- `metrics/display`: 38px/38px (regular)
- `metrics/xx-large`: 28px/28px (regular)
- `metrics/x-large`: 24px/25px (regular)
- `metrics/large`: 20px/20px (regular)
- `metrics/medium`: 18px/18px (regular)
- `metrics/small`: 14px/14px (regular)

**Color Tokens:**

Text Colors:

- Neutral: `--text-neutral-primary`, `--text-neutral-secondary`, `--text-neutral-tertiary`, `--text-neutral-ghost`, `--text-neutral-disabled`, `--text-neutral-inverse`, `--text-neutral-inverse-secondary`
- Links: `--text-link-default`, `--text-link-visited`, `--text-link-subtle`
- Colored: `--text-colored-brand`, `--text-colored-accent`, `--text-colored-error`, `--text-colored-success-bold`, `--text-colored-warning-bold`, `--text-colored-danger-bold`, `--text-colored-info-bold`

Background Colors:

- Surface: `--bg-surface-default`, `--bg-surface-hover`, `--bg-surface-subtle`, `--bg-surface-subtle-hover`, `--bg-surface-section`, `--bg-surface-card`, `--bg-surface-card-hover`, `--bg-surface-overlay`, `--bg-surface-overlay-dark`, `--bg-surface-sidebar`, `--bg-surface-header`
- Fill Input: `--bg-fill-input-primary`, `--bg-fill-input-secondary`, `--bg-fill-input-tertiary`, `--bg-fill-input-disabled`, `--bg-fill-input-inset`
- Fill Action: `--bg-fill-action-primary`, `--bg-fill-action-primary-hover`, `--bg-fill-action-secondary`, `--bg-fill-action-secondary-hover`, `--bg-fill-action-tertiary`, `--bg-fill-action-tertiary-hover`
- Fill Interactive: `--bg-fill-interactive-default`, `--bg-fill-interactive-hover`, `--bg-fill-interactive-selected`, `--bg-fill-interactive-selected-hover`
- Fill Element: `--bg-fill-element-default`, `--bg-fill-element-hover`, `--bg-fill-element-subtle`, `--bg-fill-element-subtle-hover`
- Status: `--bg-status-success-subtle`, `--bg-status-success-solid`, `--bg-status-success-solid-hover`, `--bg-status-warning-subtle`, `--bg-status-danger-subtle`, `--bg-status-danger-solid`, `--bg-status-danger-solid-hover`, `--bg-status-info-subtle`

Icon Colors:

- Neutral: `--icon-neutral-primary`, `--icon-neutral-secondary`, `--icon-neutral-tertiary`, `--icon-neutral-disabled`, `--icon-neutral-inverse`
- Colored: `--icon-colored-accent`, `--icon-colored-link`, `--icon-colored-success`, `--icon-colored-success-solid`, `--icon-colored-danger`, `--icon-colored-danger-solid`, `--icon-colored-warning`, `--icon-colored-warning-solid`, `--icon-colored-info`, `--icon-colored-info-solid`

Border Colors:

- Neutral: `--border-neutral-input`, `--border-neutral-input-bold`, `--border-neutral-disabled`, `--border-neutral-subtle`, `--border-neutral-auxillary`, `--border-neutral-overlay`
- Colored: `--border-colored-brand`, `--border-colored-accent`, `--border-colored-focused`, `--border-colored-selected`, `--border-colored-success-subtle`, `--border-colored-warning-subtle`, `--border-colored-danger-subtle`, `--border-colored-info-subtle`

Data Visualization:

- Categorical: `--dataviz-categorical-1` through `--dataviz-categorical-12`

**Spacing Tokens:**

- `--spacing-none` (0px)
- `--spacing-1` through `--spacing-20` (2px to 256px)
  - `--spacing-1`: 2px
  - `--spacing-2`: 4px
  - `--spacing-3`: 6px
  - `--spacing-4`: 8px
  - `--spacing-5`: 12px
  - `--spacing-6`: 16px
  - `--spacing-7`: 20px
  - `--spacing-8`: 24px
  - `--spacing-9`: 28px
  - `--spacing-10`: 32px
  - ... up to `--spacing-20`: 256px

**Border Radius Tokens:**

- `--radius-none`: 0px
- `--radius-2xs`: 1px
- `--radius-xs`: 2px
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-2xl`: 20px
- `--radius-3xl`: 24px
- `--radius-full`: 9999px (pill shape)

**Opacity Tokens:**

- `--opacity-0` through `--opacity-full`
  - `--opacity-0`: 0
  - `--opacity-1`: 0.1
  - `--opacity-2`: 0.2
  - `--opacity-3`: 0.3
  - `--opacity-4`: 0.4
  - `--opacity-5`: 0.5
  - `--opacity-6`: 0.6
  - `--opacity-7`: 0.7
  - `--opacity-8`: 0.8
  - `--opacity-9`: 0.9
  - `--opacity-full`: 1

**Quick Reference - Common Token Patterns:**

```css
/* For body text */
font-family: var(--body-medium-font-family);
font-size: var(--body-medium-font-size);
line-height: var(--body-medium-line-height);
font-weight: var(--body-medium-font-weight);
letter-spacing: var(--body-medium-letter-spacing);

/* For headings */
font-family: var(--headings-large-font-family);
font-size: var(--headings-large-font-size);
line-height: var(--headings-large-line-height);
font-weight: var(--headings-large-font-weight);

/* For numbers/metrics */
font-family: var(--metrics-large-font-family);
font-size: var(--metrics-large-font-size);
line-height: var(--metrics-large-line-height);

/* For labels/small text */
font-size: var(--body-small-font-size);
line-height: var(--body-small-line-height);
color: var(--text-neutral-secondary);

/* For interactive elements */
background-color: var(--bg-fill-interactive-default);
border: 1px solid var(--border-neutral-input);
border-radius: var(--radius-sm);

&:hover {
  background-color: var(--bg-fill-interactive-hover);
}

&:focus-visible {
  border-color: var(--border-colored-focused);
  box-shadow: var(--focus-ring);
}

/* For action buttons */
background-color: var(--bg-fill-action-primary);
color: var(--text-neutral-inverse);

&:hover {
  background-color: var(--bg-fill-action-primary-hover);
}
```

**Effects Tokens:**

- Elevation (shadows):
  - `--elevation-default`: subtle shadow
  - `--elevation-raised`: cards, floating elements
  - `--elevation-overlay`: modals, dropdowns, popovers
  - `--elevation-sunken`: input fields, depressed surfaces
  - `--elevation-overflow`: scrollable containers
- Focus rings:
  - `--focus-ring`: standard focus ring
  - `--focus-ring-error`: error state focus ring

**CSS Usage:**

```css
/* Typography - Use complete text styles */
font-family: var(--body-medium-font-family);
font-size: var(--body-medium-font-size);
line-height: var(--body-medium-line-height);
font-weight: var(--body-medium-font-weight);
letter-spacing: var(--body-medium-letter-spacing);

/* Headings */
font-size: var(--headings-large-font-size);
line-height: var(--headings-large-line-height);
font-weight: var(--headings-large-font-weight);

/* Metrics/Numbers */
font-size: var(--metrics-large-font-size);
line-height: var(--metrics-large-line-height);
font-weight: var(--metrics-large-font-weight);

/* Colors - Theme-aware */
color: var(--text-neutral-primary);
background-color: var(--bg-surface-card);
border-color: var(--border-neutral-input);

/* Interactive States */
background-color: var(--bg-fill-interactive-default);
&:hover {
  background-color: var(--bg-fill-interactive-hover);
}
&:focus {
  border-color: var(--border-colored-focused);
}

/* Spacing */
gap: var(--spacing-2);
padding: var(--spacing-5);
margin: var(--spacing-4);

/* Border Radius */
border-radius: var(--radius-sm);

/* Opacity */
opacity: var(--opacity-6);

/* Elevation/Shadows */
box-shadow: var(--elevation-raised);

/* Focus Ring */
box-shadow: var(--focus-ring);
```

### 4. **Respect Layer Hierarchy**

Pay close attention to the layer hierarchy in Figma:

- Parent-child relationships matter
- Description text belongs to its parent label, not the root container
- Use nested divs to match the Figma structure

**Example hierarchy:**

```
Container
├── Label (optional)
├── Control Element
└── Content Group (optional)
    ├── Primary Text
    └── Secondary Text (child of Content Group)
```

## Component Structure

### Basic File Structure

```
src/components/ComponentName/
├── ComponentName.types.ts   # TypeScript types only
├── ComponentName.css        # Styles with design tokens
├── ComponentName.tsx        # React component
├── index.ts                 # Exports
└── README.md               # Documentation (optional)
```

### Component Template

**Types File:**

```typescript
export interface ComponentProps {
  // Only props that exist in Figma
  label: string;
  value: string | number;
  disabled?: boolean;
  className?: string;
  testId?: string;
}
```

**CSS File:**

```css
.orion-component {
  /* Use design tokens for typography */
  font-family: var(--body-medium-font-family);
  font-size: var(--body-medium-font-size);
  line-height: var(--body-medium-line-height);
  font-weight: var(--body-medium-font-weight);
  letter-spacing: var(--body-medium-letter-spacing);

  /* Use semantic color tokens (theme-aware) */
  color: var(--text-neutral-primary);
  background-color: var(--bg-surface-card);
  border-color: var(--border-neutral-input);

  /* Use spacing tokens */
  gap: var(--spacing-2);
  padding: var(--spacing-4);
}

/* Interactive states */
.orion-component:hover {
  background-color: var(--bg-fill-interactive-hover);
}

.orion-component:focus-visible {
  border-color: var(--border-colored-focused);
  box-shadow: var(--focus-ring);
  outline: none;
}

.orion-component:disabled {
  color: var(--text-neutral-disabled);
  background-color: var(--bg-fill-input-disabled);
  cursor: not-allowed;
}
```

**Component File:**

```typescript
import type { ComponentProps } from "./Component.types";
import "./Component.css";

export function Component({ label, value }: ComponentProps) {
  return (
    <div className="orion-component">{/* Match Figma hierarchy exactly */}</div>
  );
}
```

## Common Mistakes to Avoid

### ❌ DON'T: Add Extra Styling

```css
/* WRONG - Adding card styling not in Figma */
.orion-component {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 12px;
  border-radius: 6px;
}
```

```css
/* CORRECT - Simple as defined */
.orion-component {
  display: inline-flex;
  flex-direction: column;
  gap: var(--spacing-2, 4px);
}
```

### ❌ DON'T: Hardcode Any Values

```css
/* WRONG - Hardcoded typography */
.component__label {
  font-size: 12px;
  line-height: 16px;
}

/* WRONG - Hardcoded colors */
.component {
  color: #6b7280;
  background-color: #ffffff;
  border: 1px solid #9ca3af;
}

/* WRONG - Hardcoded spacing */
.component {
  gap: 4px;
  padding: 12px;
  margin: 8px;
}

/* WRONG - Hardcoded border radius */
.component {
  border-radius: 4px;
}

/* WRONG - Hardcoded opacity */
.component {
  opacity: 0.6;
}
```

```css
/* CORRECT - Use design tokens for everything */
.component__label {
  font-size: var(--body-small-font-size);
  line-height: var(--body-small-line-height);
  font-weight: var(--body-small-font-weight);
  letter-spacing: var(--body-small-letter-spacing);
}

.component {
  color: var(--text-neutral-secondary);
  background-color: var(--bg-surface-card);
  border: 1px solid var(--border-neutral-input);
  gap: var(--spacing-2);
  padding: var(--spacing-5);
  margin: var(--spacing-4);
  border-radius: var(--radius-sm);
  opacity: var(--opacity-6);
}
```

### ❌ DON'T: Add Size Variants Not in Figma

```typescript
// WRONG - If Figma only shows one size
export type ComponentSize = "sm" | "md" | "lg";
```

```typescript
// CORRECT - No size prop if only one size exists
export interface ComponentProps {
  label: string;
  value: string;
  // No size prop
}
```

### ❌ DON'T: Ignore Hierarchy

```jsx
// WRONG - All elements as siblings
<div>
  <Label />
  <Control />
  <PrimaryText />
  <SecondaryText /> {/* Wrong level */}
</div>
```

```jsx
// CORRECT - Nested according to Figma hierarchy
<div>
  <Label />
  <Control />
  <ContentGroup>
    <PrimaryText />
    <SecondaryText /> {/* Nested correctly */}
  </ContentGroup>
</div>
```

### ❌ DON'T: Create Elaborate Demos

Only create minimal examples showing:

- Different sizes (if they exist in Figma)
- States (default, disabled, checked, etc.)
- Basic usage

The user will provide more examples later if needed.

## Step-by-Step Process

### 1. Access Figma Design

```typescript
// Extract node ID from URL
// https://www.figma.com/design/.../Orion-v2.0?node-id=59-2551
const nodeId = "59:2551"; // Replace : with -

// Get design context
await mcp_Figma_Desktop_get_design_context({
  clientFrameworks: "react",
  clientLanguages: "typescript",
  nodeId: nodeId,
});

// Get screenshot
await mcp_Figma_Desktop_get_screenshot({
  clientFrameworks: "react",
  clientLanguages: "typescript",
  nodeId: nodeId,
});
```

### 2. Analyze the Design

From the Figma response, identify:

- **Typography tokens** used (e.g., `body/small`, `metrics/large`)
- **Layer hierarchy** (parent-child relationships)
- **Variants** (sizes, states)
- **Behavior** (static vs interactive)
- **Optional elements** (descriptions, icons, etc.)

### 3. Create Types

Define ONLY the props that exist in Figma:

```typescript
export interface ComponentProps {
  // Required props from Figma
  label: string;
  value: string | number;

  // Optional props from Figma variants
  size?: "sm" | "md" | "lg"; // Only if variants exist
  disabled?: boolean;

  // Standard props
  className?: string;
  testId?: string;
}
```

### 4. Create CSS

Use design tokens for EVERYTHING - never hardcode values:

```css
.orion-component {
  /* Typography - use complete text style tokens */
  font-family: var(--body-medium-font-family);
  font-size: var(--body-medium-font-size);
  line-height: var(--body-medium-line-height);
  font-weight: var(--body-medium-font-weight);
  letter-spacing: var(--body-medium-letter-spacing);

  /* Colors - use theme-aware semantic tokens */
  color: var(--text-neutral-primary);
  background-color: var(--bg-surface-card);

  /* Spacing - use tokens */
  gap: var(--spacing-2);
  padding: var(--spacing-5);

  /* Border - use tokens */
  border: 1px solid var(--border-neutral-input);
  border-radius: var(--radius-md);

  /* Transitions */
  transition: all 0.2s ease;
}

/* Hover/Focus states - use semantic state tokens */
.orion-component:hover {
  background-color: var(--bg-fill-interactive-hover);
}

.orion-component:focus-visible {
  border-color: var(--border-colored-focused);
  box-shadow: var(--focus-ring);
  outline: none;
}

.orion-component:disabled {
  color: var(--text-neutral-disabled);
  background-color: var(--bg-fill-input-disabled);
  border-color: var(--border-neutral-disabled);
  cursor: not-allowed;
}
```

### 5. Build Component

Match the Figma hierarchy exactly:

```tsx
export function Component({ label, value }: ComponentProps) {
  return (
    <div className="orion-component">
      {/* Match Figma structure exactly */}
      <p className="orion-component__label">{label}</p>
      <span className="orion-component__value">{value}</span>
    </div>
  );
}
```

### 6. Create Minimal Demo

Show basic usage only:

```tsx
// Sizes (if they exist)
<Component value={1234} label="Label" size="sm" />
<Component value={1234} label="Label" size="md" />
<Component value={1234} label="Label" size="lg" />

// States
<Component value={1234} label="Label" disabled />
```

## Design Token Reference

### Typography

```css
/* Font Families */
--font-family-text: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, sans-serif;
--font-family-metric: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, sans-serif;

/* Title Styles (for large headings) */
--title-display-large-font-size: 48px;
--title-display-large-line-height: 48px;
--title-display-large-font-weight: 600;
--title-display-font-size: 40px;
--title-display-line-height: 40px;
--title-display-font-weight: 600;
--title-title-font-size: 36px;
--title-title-line-height: 36px;
--title-title-font-weight: 600;
--title-subtitle-font-size: 30px;
--title-subtitle-line-height: 30px;
--title-subtitle-font-weight: 600;

/* Heading Styles */
--headings-xx-large-font-size: 24px;
--headings-xx-large-line-height: 25px;
--headings-xx-large-font-weight: 600;
--headings-x-large-font-size: 18px;
--headings-x-large-line-height: 22px;
--headings-x-large-font-weight: 600;
--headings-large-font-size: 16px;
--headings-large-line-height: 20px;
--headings-large-font-weight: 600;
--headings-medium-font-size: 14px;
--headings-medium-line-height: 18px;
--headings-medium-font-weight: 600;
--headings-small-font-size: 13px;
--headings-small-line-height: 18px;
--headings-small-font-weight: 600;

/* Body Styles */
--body-x-large-font-size: 18px;
--body-x-large-line-height: 23px;
--body-x-large-font-weight: 400;
--body-large-font-size: 16px;
--body-large-line-height: 21px;
--body-large-font-weight: 400;
--body-medium-font-size: 14px;
--body-medium-line-height: 18px;
--body-medium-font-weight: 400;
--body-small-font-size: 12px;
--body-small-line-height: 16px;
--body-small-font-weight: 400;

/* Caption Styles */
--captions-x-small-font-size: 11px;
--captions-x-small-line-height: 14px;
--captions-x-small-font-weight: 400;
--captions-xx-small-font-size: 10px;
--captions-xx-small-line-height: 13px;
--captions-xx-small-font-weight: 400;

/* Metrics Styles (for numbers and data) */
--metrics-display-font-size: 38px;
--metrics-display-line-height: 38px;
--metrics-display-font-weight: 400;
--metrics-xx-large-font-size: 28px;
--metrics-xx-large-line-height: 28px;
--metrics-xx-large-font-weight: 400;
--metrics-x-large-font-size: 24px;
--metrics-x-large-line-height: 25px;
--metrics-x-large-font-weight: 400;
--metrics-large-font-size: 20px;
--metrics-large-line-height: 20px;
--metrics-large-font-weight: 400;
--metrics-medium-font-size: 18px;
--metrics-medium-line-height: 18px;
--metrics-medium-font-weight: 400;
--metrics-small-font-size: 14px;
--metrics-small-line-height: 14px;
--metrics-small-font-weight: 400;
```

### Colors

All color tokens are theme-aware and automatically switch between light and dark modes.

```css
/* Text Colors - Neutral */
--text-neutral-primary: [theme-specific];
--text-neutral-secondary: [theme-specific];
--text-neutral-tertiary: [theme-specific];
--text-neutral-ghost: [theme-specific];
--text-neutral-disabled: [theme-specific];
--text-neutral-inverse: [theme-specific];
--text-neutral-inverse-secondary: [theme-specific];

/* Text Colors - Links */
--text-link-default: [theme-specific];
--text-link-visited: [theme-specific];
--text-link-subtle: [theme-specific];

/* Text Colors - Colored */
--text-colored-brand: [theme-specific];
--text-colored-accent: [theme-specific];
--text-colored-error: [theme-specific];
--text-colored-success-bold: [theme-specific];
--text-colored-warning-bold: [theme-specific];
--text-colored-danger-bold: [theme-specific];
--text-colored-info-bold: [theme-specific];

/* Background Colors - Surface */
--bg-surface-default: [theme-specific];
--bg-surface-hover: [theme-specific];
--bg-surface-subtle: [theme-specific];
--bg-surface-subtle-hover: [theme-specific];
--bg-surface-section: [theme-specific];
--bg-surface-card: [theme-specific];
--bg-surface-card-hover: [theme-specific];
--bg-surface-overlay: [theme-specific];
--bg-surface-overlay-dark: [theme-specific];
--bg-surface-sidebar: [theme-specific];
--bg-surface-header: [theme-specific];

/* Background Colors - Fill Input */
--bg-fill-input-primary: [theme-specific];
--bg-fill-input-secondary: [theme-specific];
--bg-fill-input-tertiary: [theme-specific];
--bg-fill-input-disabled: [theme-specific];
--bg-fill-input-inset: [theme-specific];

/* Background Colors - Fill Action */
--bg-fill-action-primary: [theme-specific];
--bg-fill-action-primary-hover: [theme-specific];
--bg-fill-action-secondary: [theme-specific];
--bg-fill-action-secondary-hover: [theme-specific];
--bg-fill-action-tertiary: [theme-specific];
--bg-fill-action-tertiary-hover: [theme-specific];

/* Background Colors - Fill Interactive */
--bg-fill-interactive-default: [theme-specific];
--bg-fill-interactive-hover: [theme-specific];
--bg-fill-interactive-selected: [theme-specific];
--bg-fill-interactive-selected-hover: [theme-specific];

/* Background Colors - Fill Element */
--bg-fill-element-default: [theme-specific];
--bg-fill-element-hover: [theme-specific];
--bg-fill-element-subtle: [theme-specific];
--bg-fill-element-subtle-hover: [theme-specific];

/* Background Colors - Status */
--bg-status-success-subtle: [theme-specific];
--bg-status-success-solid: [theme-specific];
--bg-status-success-solid-hover: [theme-specific];
--bg-status-warning-subtle: [theme-specific];
--bg-status-danger-subtle: [theme-specific];
--bg-status-danger-solid: [theme-specific];
--bg-status-danger-solid-hover: [theme-specific];
--bg-status-info-subtle: [theme-specific];

/* Icon Colors - Neutral */
--icon-neutral-primary: [theme-specific];
--icon-neutral-secondary: [theme-specific];
--icon-neutral-tertiary: [theme-specific];
--icon-neutral-disabled: [theme-specific];
--icon-neutral-inverse: [theme-specific];

/* Icon Colors - Colored */
--icon-colored-accent: [theme-specific];
--icon-colored-link: [theme-specific];
--icon-colored-success: [theme-specific];
--icon-colored-success-solid: [theme-specific];
--icon-colored-danger: [theme-specific];
--icon-colored-danger-solid: [theme-specific];
--icon-colored-warning: [theme-specific];
--icon-colored-warning-solid: [theme-specific];
--icon-colored-info: [theme-specific];
--icon-colored-info-solid: [theme-specific];

/* Border Colors - Neutral */
--border-neutral-input: [theme-specific];
--border-neutral-input-bold: [theme-specific];
--border-neutral-disabled: [theme-specific];
--border-neutral-subtle: [theme-specific];
--border-neutral-auxillary: [theme-specific];
--border-neutral-overlay: [theme-specific];

/* Border Colors - Colored */
--border-colored-brand: [theme-specific];
--border-colored-accent: [theme-specific];
--border-colored-focused: [theme-specific];
--border-colored-selected: [theme-specific];
--border-colored-success-subtle: [theme-specific];
--border-colored-warning-subtle: [theme-specific];
--border-colored-danger-subtle: [theme-specific];
--border-colored-info-subtle: [theme-specific];

/* Data Visualization - Categorical */
--dataviz-categorical-1: [theme-specific];
--dataviz-categorical-2: [theme-specific];
--dataviz-categorical-3: [theme-specific];
--dataviz-categorical-4: [theme-specific];
--dataviz-categorical-5: [theme-specific];
--dataviz-categorical-6: [theme-specific];
--dataviz-categorical-7: [theme-specific];
--dataviz-categorical-8: [theme-specific];
--dataviz-categorical-9: [theme-specific];
--dataviz-categorical-10: [theme-specific];
--dataviz-categorical-11: [theme-specific];
--dataviz-categorical-12: [theme-specific];
```

**Note:** Colors automatically adapt based on the `data-theme` attribute (light/dark) or system preferences. Always use CSS variables to ensure theme compatibility.

### Spacing

```css
--spacing-none: 0px;
--spacing-1: 2px;
--spacing-2: 4px;
--spacing-3: 6px;
--spacing-4: 8px;
--spacing-5: 12px;
--spacing-6: 16px;
--spacing-7: 20px;
--spacing-8: 24px;
--spacing-9: 28px;
--spacing-10: 32px;
--spacing-11: 36px;
--spacing-12: 40px;
--spacing-13: 48px;
--spacing-14: 56px;
--spacing-15: 64px;
--spacing-16: 72px;
--spacing-17: 96px;
--spacing-18: 128px;
--spacing-19: 192px;
--spacing-20: 256px;
```

### Border Radius

```css
--radius-none: 0px;
--radius-2xs: 1px;
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-3xl: 24px;
--radius-full: 9999px;
```

### Opacity

```css
--opacity-0: 0;
--opacity-1: 0.1;
--opacity-2: 0.2;
--opacity-3: 0.3;
--opacity-4: 0.4;
--opacity-5: 0.5;
--opacity-6: 0.6;
--opacity-7: 0.7;
--opacity-8: 0.8;
--opacity-9: 0.9;
--opacity-full: 1;
```

### Effects

```css
/* Elevation (Shadows) */
--elevation-default: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.05);
--elevation-raised: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.06);
--elevation-overlay: 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08);
--elevation-sunken: inset 0px 1px 2px rgba(0, 0, 0, 0.05);
--elevation-overflow: inset 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05);

/* Focus Rings */
--focus-ring: 0 0 0 3px rgba(33, 113, 181, 0.3);
--focus-ring-error: 0 0 0 3px rgba(220, 53, 69, 0.3);
```

**Usage:**

```css
/* Apply elevation to cards and floating elements */
.card {
  box-shadow: var(--elevation-raised);
}

.modal {
  box-shadow: var(--elevation-overlay);
}

/* Apply focus rings for accessibility */
.button:focus-visible {
  box-shadow: var(--focus-ring);
  outline: none;
}

.input:focus-visible {
  box-shadow: var(--focus-ring);
  border-color: var(--border-colored-focused);
}

.input.error:focus-visible {
  box-shadow: var(--focus-ring-error);
}
```

## Checklist Before Finalizing

- [ ] Accessed Figma design programmatically
- [ ] Reviewed screenshot for visual accuracy
- [ ] Used design tokens for typography (not hardcoded sizes)
- [ ] Used design tokens for colors (not hardcoded hex values)
- [ ] Used design tokens for spacing (not hardcoded pixels)
- [ ] Used design tokens for border radius (not hardcoded values)
- [ ] Matched layer hierarchy exactly
- [ ] No extra styling or features added
- [ ] Only includes props that exist in Figma
- [ ] Stories added in Storybook (variants, sizes, states); minimal demo = stories (see **storybook-setup.md**)
- [ ] No linter errors
- [ ] Component exports added to index files

## Theming Support

The design system includes built-in theme support for light and dark modes.

### Theme Structure

Themes are automatically applied via the `data-theme` attribute:

```html
<!-- Light theme (default) -->
<div data-theme="light">...</div>

<!-- Dark theme -->
<div data-theme="dark">...</div>

<!-- System preference (auto-detects) -->
<div>...</div>
```

### Using Themes in Components

Components should ALWAYS use CSS variables for colors. The theme system automatically swaps these values:

```css
.orion-button {
  /* ✅ CORRECT - Theme-aware colors */
  background-color: var(--bg-fill-action-primary);
  color: var(--text-neutral-inverse);
  border-color: var(--border-neutral-default);
}

.orion-button:hover {
  background-color: var(--bg-fill-action-primary-hover);
}
```

```css
/* ❌ WRONG - Hardcoded colors don't respect themes */
.orion-button {
  background-color: #2171b5;
  color: #ffffff;
}
```

### Importing Tokens in TypeScript

You can also import tokens directly in TypeScript/JavaScript files:

```typescript
import { colors, spacing, radius, textStyles, effects } from "../tokens";

// Use in inline styles
const buttonStyle = {
  // Typography
  fontFamily: textStyles.body.medium.fontFamily,
  fontSize: textStyles.body.medium.fontSize,
  lineHeight: textStyles.body.medium.lineHeight,
  fontWeight: textStyles.body.medium.fontWeight,
  letterSpacing: textStyles.body.medium.letterSpacing,

  // Colors (from light theme by default, use theme system for dynamic switching)
  backgroundColor: colors.bg.fill.action.primary,
  color: colors.text.neutral.inverse,
  borderColor: colors.border.colored.accent,

  // Spacing
  padding: `${spacing[4]} ${spacing[6]}`,
  gap: spacing[2],

  // Border
  borderRadius: radius.sm,

  // Effects
  boxShadow: effects.elevation.raised.boxShadow,
};

// For metrics/numbers
const metricStyle = {
  fontFamily: textStyles.metrics.large.fontFamily,
  fontSize: textStyles.metrics.large.fontSize,
  lineHeight: textStyles.metrics.large.lineHeight,
  fontWeight: textStyles.metrics.large.fontWeight,
};

// For headings
const headingStyle = {
  fontFamily: textStyles.headings.large.fontFamily,
  fontSize: textStyles.headings.large.fontSize,
  lineHeight: textStyles.headings.large.lineHeight,
  fontWeight: textStyles.headings.large.fontWeight,
};

// Use in styled-components or emotion
const Button = styled.button`
  background-color: ${colors.bg.fill.action.primary};
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${radius.sm};
  box-shadow: ${effects.elevation.default.boxShadow};

  &:hover {
    background-color: ${colors.bg.fill.action.primaryHover};
  }

  &:focus-visible {
    box-shadow: ${effects.focus.ring.boxShadow};
  }
`;
```

**Important Notes:**

1. **For maximum theme support**, prefer CSS variables in CSS files over direct token imports in JS
2. When importing `colors` from tokens, you get the **light theme by default**
3. For dynamic theme switching, use the **theme system**:

```typescript
import { lightTheme, darkTheme, getCurrentTheme } from "../tokens/themes";

// Get current theme colors (respects data-theme attribute)
const currentColors = getCurrentTheme();

// Or use specific themes
const buttonStyle = {
  backgroundColor: lightTheme.bg.fill.action.primary, // Light theme only
  // vs
  backgroundColor: darkTheme.bg.fill.action.primary, // Dark theme only
};
```

4. **Always use CSS variables for colors in component styles** to ensure automatic theme switching works correctly

### Theme Provider

Wrap your application with the ThemeProvider to enable theme switching:

```tsx
import { ThemeProvider } from "./tokens/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Testing Components in Both Themes

When building components, test in both themes:

```tsx
// Demo file
<ThemeProvider defaultTheme="light">
  <Component />
</ThemeProvider>

<ThemeProvider defaultTheme="dark">
  <Component />
</ThemeProvider>
```

## Remember

1. **Ask if unclear** - Don't guess or assume
2. **Use Figma tools** - Always access programmatically with `mcp_Figma_Desktop_get_design_context`
3. **Keep it simple** - Only build what's shown in Figma
4. **Use tokens for EVERYTHING** - Never hardcode any values
   - Typography: Use complete text style tokens (font-family, font-size, line-height, font-weight, letter-spacing)
   - Colors: Use semantic color tokens (theme-aware)
   - Spacing: Use spacing tokens (--spacing-1 through --spacing-20)
   - Border radius: Use radius tokens (--radius-none through --radius-full)
   - Opacity: Use opacity tokens (--opacity-0 through --opacity-full)
   - Effects: Use elevation and focus ring tokens
5. **Never hardcode values** - Always use CSS variables (no fallback values needed)
6. **Match hierarchy** - Respect Figma layer parent-child relationships
7. **No extras** - No cards, shadows, padding, or enhancements unless explicitly in Figma design
8. **Theme-aware** - Use CSS variables for all colors to support automatic light/dark theme switching
9. **Semantic tokens** - Use the most specific semantic token available (e.g., `--bg-fill-action-primary` not just `--blue-500`)
