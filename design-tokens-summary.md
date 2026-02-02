# Design Tokens Summary

This document provides a comprehensive overview of the Orion v2.0 design token structure, organized by collection and hierarchy.

## Figma file and tokens-json variable

The Orion v2.0 design library lives in Figma; the canonical token set for **both Light and Dark themes** is stored in JSON format in a Figma **variable** named **`tokens-json`**. That variable is divided into collections:

- **Colours** – primitives (✦), semantic tokens (❖), and data visualisation (dataviz)
- **Typography** – font families, weights, sizes, line heights, letter spacing, and semantic text styles
- **Effects** – elevation and shadows
- **Spacings** – spacers and border radii
- **Opacity** – opacity values

When reading variables from the Figma file (e.g. via the Figma API or variable definitions), you get **resolved** values for the **currently active theme** (Light or Dark). The raw **`tokens-json`** variable holds the full structure and both theme values in JSON form (primitives ✦, semantic ❖, and dataviz). For implementation, prefer **references** over resolved values where possible. **Note:** The `tokens-json` variable exists only inside Figma; this repo does not contain a copy unless tokens have been exported.

## Overview

The Orion design system uses a three-tier token hierarchy:

1. **Primitive Tokens (✦)** - Base values (colors, typography, spacing)
2. **Semantic Tokens (❖)** - Context-specific tokens that reference primitives
3. **Component Usage** - Components use semantic tokens to style variants

Tokens are organized into collections:

- **Colors** - Primitive and semantic color tokens (including data visualization colors)
- **Typography** - Font families, weights, sizes, and semantic text styles
- **Spacing** - Spacers and border radii
- **Effects** - Elevation and shadow tokens
- **Opacity** - Opacity values

All tokens support Light and Dark themes, with separate token files for each theme mode.

### Figma variable naming conventions

In the Figma file, variable names follow these patterns:

- **Colors** – prefixed with `color.` (e.g. `color.bg.surface`, `color.text.primary`, `color.border.input`). The summary below uses shorthand (e.g. `bg.surface.default`) for readability; in Figma the same token appears as `color.bg.surface` or the appropriate semantic name.
- **Typography** – semantic styles use **slashes** and composite tokens (e.g. `headings/small`, `body/medium`, `metrics/large`, `captions/x-small`, `title/display`). Each style references sub-tokens such as `headings/small/fontFamily`, `headings/small/fontSize`, `headings/small/fontWeight`, `headings/small/letterSpacing`.
- **Effects** – use slashes (e.g. `elevation/default`, `elevation/raised/shadows/1/color`).
- **Spacing and radii** – same names as in this doc (e.g. `spacer-4`, `radius-md`). Resolved pixel values can differ between Light and Dark themes.

## Token Hierarchy

```
Primitive Tokens (✦)
    ↓
Semantic Tokens (❖)
    ↓
Component Variants
```

### Example Flow

```
✦.blue.500 (Primitive)
    ↓
❖.bg.action.primary (Semantic)
    ↓
Button Primary Variant (Component)
```

## Color Tokens

### Primitive Colors (✦)

Primitive colors are base color values organized by color family. Each color has a scale from light to dark.

#### Base Colors

- **black** - Opacity-based black scale (40, 100, 200, 300, 500, 800, 850, 900, 950, full)
- **white** - Opacity-based white scale (50, 100, 200, 400, 700, 800, 850, 900, 950, full)
- **grey** - Neutral grey scale (0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 990)

#### Brand Colors

- **blue** - Primary brand color (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990)
- **orange** - Secondary brand color (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990)

#### Status Colors

- **green** - Success states (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990)
- **red** - Danger/error states (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990)
- **amber** - Warning states (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990)

### Semantic Colors (❖)

Semantic colors reference primitive tokens and are organized by purpose:

#### Background Colors (`bg`)

**Surface Backgrounds:**

- `bg.surface.default` - Default surface background
- `bg.surface.default-hover` - Hover state for default surface
- `bg.surface.subtle` - Subtle surface background
- `bg.surface.subtle-hover` - Hover state for subtle surface
- `bg.surface.section` - Section dividers
- `bg.surface.card` - Card backgrounds
- `bg.surface.card-hover` - Card hover state
- `bg.surface.overlay` - Overlay backgrounds
- `bg.surface.overlay-dark` - Dark overlay variant
- `bg.surface.sidebar` - Sidebar backgrounds
- `bg.surface.header` - Header backgrounds

**Input Backgrounds:**

- `bg.input.default` - Default input background
- `bg.input.disabled` - Disabled input background
- `bg.input.inset` - Inset input background

**List Item Backgrounds:**

- `bg.list-item.default` - Default list item
- `bg.list-item.default-hover` - List item hover
- `bg.list-item.selected` - Selected list item
- `bg.list-item.selected-hover` - Selected list item hover

**Element Backgrounds:**

- `bg.element.default` - Default element background
- `bg.element.default-hover` - Element hover
- `bg.element.subtle` - Subtle element background
- `bg.element.subtle-hover` - Subtle element hover

**Action Backgrounds:**

- `bg.action.primary` - Primary action button
- `bg.action.primary-hover` - Primary action hover
- `bg.action.secondary` - Secondary action button
- `bg.action.secondary-hover` - Secondary action hover
- `bg.action.tertiary` - Tertiary action button
- `bg.action.tertiary-hover` - Tertiary action hover

**Status Backgrounds:**

- `bg.status.success-subtle` - Success subtle background
- `bg.status.success-solid` - Success solid background
- `bg.status.success-solid-hover` - Success solid hover
- `bg.status.warning-subtle` - Warning subtle background
- `bg.status.danger-subtle` - Danger subtle background
- `bg.status.danger-solid` - Danger solid background
- `bg.status.danger-solid-hover` - Danger solid hover
- `bg.status.info-subtle` - Info subtle background

**Colored Backgrounds:**

- `bg.colored.accent` - Accent colored background

#### Border Colors (`border`)

**Neutral Borders:**

- `border.neutral.input` - Input borders
- `border.neutral.input-bold` - Bold input borders
- `border.neutral.subtle` - Subtle borders
- `border.neutral.auxillary` - Auxiliary borders (Figma variable: `color.border.auxillary`)
- `border.neutral.disabled` - Disabled borders
- `border.neutral.overlay` - Overlay borders

**Colored Borders:**

- `border.colored.brand` - Brand borders
- `border.colored.focused` - Focused state borders
- `border.colored.selected` - Selected state borders
- `border.colored.success-subtle` - Success borders
- `border.colored.warning-subtle` - Warning borders
- `border.colored.danger-subtle` - Danger borders
- `border.colored.info-subtle` - Info borders
- `border.colored.error` - Error borders
- `border.colored.accent` - Accent borders

#### Text Colors (`text`)

**Neutral Text:**

- `text.neutral.primary` - Primary text color
- `text.neutral.secondary` - Secondary text color
- `text.neutral.tertiary` - Tertiary text color
- `text.neutral.ghost` - Ghost text color
- `text.neutral.disabled` - Disabled text color
- `text.neutral.inverse` - Inverse text (for dark backgrounds)
- `text.neutral.inverse-secondary` - Inverse secondary text

**Link Text:**

- `text.link.default` - Default link color
- `text.link.visited` - Visited link color
- `text.link.subtle` - Subtle link color

**Colored Text:**

- `text.colored.brand` - Brand text color
- `text.colored.success-bold` - Success bold text
- `text.colored.warning-bold` - Warning bold text
- `text.colored.danger-bold` - Danger bold text
- `text.colored.info-bold` - Info bold text
- `text.colored.error` - Error text color
- `text.colored.accent` - Accent text color

#### Icon Colors (`icon`)

**Neutral Icons:**

- `icon.neutral.primary` - Primary icon color
- `icon.neutral.secondary` - Secondary icon color
- `icon.neutral.tertiary` - Tertiary icon color
- `icon.neutral.inverse` - Inverse icon color
- `icon.neutral.disabled` - Disabled icon color

**Colored Icons:**

- `icon.colored.link` - Link icon color
- `icon.colored.brand` - Brand icon color
- `icon.colored.success` - Success icon color
- `icon.colored.success-solid` - Success solid icon color
- `icon.colored.warning` - Warning icon color
- `icon.colored.warning-solid` - Warning solid icon color
- `icon.colored.danger` - Danger icon color
- `icon.colored.danger-solid` - Danger solid icon color
- `icon.colored.info` - Info icon color
- `icon.colored.info-solid` - Info solid icon color
- `icon.colored.error` - Error icon color
- `icon.colored.accent` - Accent icon color

#### Data Visualization Colors (`dataviz`)

Data visualization colors are used for charts, graphs, and data displays:

**Sequential Colors:** (reference primitives)

- `dataviz.sequential.blue` - Blue sequential scale (1-6) for gradient data visualization

**Categorical Colors:** (resolved hex values; no references)

- `dataviz.categorical` - Categorical color palette (1-14) for distinguishing different data categories in charts

**Status Colors:** (reference primitives)

- `dataviz.status` - Status colors (1-5) for data visualization status indicators (danger, success, warning, info, neutral)

## Typography Tokens

### Primitive Typography

#### Font Families

- `font.family.text` - "IBM Plex Sans" (body text)
- `font.family.metric` - "Barlow" (numeric/metric displays)

#### Font Weights

- `font.weight.thin` - Thin
- `font.weight.extra-light` - ExtraLight
- `font.weight.light` - Light
- `font.weight.regular` - Regular
- `font.weight.medium` - Medium
- `font.weight.semibold` - SemiBold
- `font.weight.bold` - Bold
- `font.weight.extra-bold` - ExtraBold
- `font.weight.black` - Black

#### Font Sizes

- `font.size.2xs` - 10px
- `font.size.xs` - 11px
- `font.size.sm` - 12px
- `font.size.md` - 14px
- `font.size.lg` - 16px
- `font.size.xl` - 18px
- `font.size.2xl` - 20px
- `font.size.3xl` - 24px
- `font.size.4xl` - 28px
- `font.size.5xl` - 32px
- `font.size.6xl` - 40px

#### Line Heights

- `font.lineHeight.none` - 1
- `font.lineHeight.tighter` - 1.1
- `font.lineHeight.tight` - 1.25
- `font.lineHeight.snug` - 1.35
- `font.lineHeight.normal` - 1.5
- `font.lineHeight.relaxed` - 1.75
- `font.lineHeight.loose` - 2

#### Letter Spacing

- `font.letterSpacing.tighter` - -0.05
- `font.letterSpacing.tight` - -0.025
- `font.letterSpacing.normal` - 0
- `font.letterSpacing.wide` - 0.025
- `font.letterSpacing.wider` - 0.05
- `font.letterSpacing.widest` - 0.1

### Semantic Typography Styles

In Figma, these styles are exposed as variables with **slashes** (e.g. `title/display`, `headings/small`, `body/medium`, `metrics/large`, `captions/x-small`), each composed from sub-tokens for fontFamily, fontSize, fontWeight, lineHeight, and letterSpacing.

#### Title Styles

**Display:**

- `title.display` - 24px/36px, semibold, tight letter spacing
  - Uses: `font.size.3xl`, `font.weight.semibold`, `font.lineHeight.normal`, `font.letterSpacing.tight`

#### Heading Styles

- `headings.xx-large` - 20px/30px, semibold
- `headings.x-large` - 18px/27px, semibold, snug line height
- `headings.large` - 16px/24px, semibold, snug line height
- `headings.medium` - 14px/21px, semibold, tight line height
- `headings.small` - 12px/18px, semibold, tighter line height

#### Body Text Styles

- `body.large` - 16px/24px, regular
- `body.medium` - 14px/21px, regular, snug line height
- `body.medium-strong` - 14px/21px, semibold, snug line height
- `body.small` - 12px/18px, regular, tight line height
- `body.small-strong` - 12px/18px, semibold, tight line height

#### Caption Styles

- `captions.x-small` - 11px/16px, regular, tighter line height
- `captions.xx-small` - 10px/10px, regular, no line height

#### Metric Styles (Numeric Displays)

- `metrics.xx-large` - 24px/48px, semibold, loose line height (Barlow font)
- `metrics.x-large` - 20px/40px, semibold, relaxed line height (Barlow font)
- `metrics.large` - 16px/24px, semibold (Barlow font)
- `metrics.medium` - 14px/21px, semibold, snug line height (Barlow font)
- `metrics.small` - 12px/18px, semibold, tight line height (Barlow font)

## Spacing Tokens

### Spacers

Spacing values for gaps, padding, and margins:

- `spacers.spacer-none` - 0px
- `spacers.spacer-1` - 2px
- `spacers.spacer-2` - 4px
- `spacers.spacer-3` - 6px
- `spacers.spacer-4` - 8px
- `spacers.spacer-5` - 12px
- `spacers.spacer-6` - 16px
- `spacers.spacer-7` - 20px
- `spacers.spacer-8` - 24px
- `spacers.spacer-9` - 28px
- `spacers.spacer-10` - 32px
- `spacers.spacer-11` - 36px
- `spacers.spacer-12` - 40px
- `spacers.spacer-13` - 48px
- `spacers.spacer-14` - 56px
- `spacers.spacer-15` - 64px
- `spacers.spacer-16` - 72px
- `spacers.spacer-17` - 96px
- `spacers.spacer-18` - 128px
- `spacers.spacer-19` - 192px
- `spacers.spacer-20` - 256px

### Border Radii

Corner radius values:

- `radii.radius-none` - 0px
- `radii.radius-2xs` - 1px
- `radii.radius-xs` - 2px
- `radii.radius-sm` - 4px
- `radii.radius-md` - 8px
- `radii.radius-lg` - 12px
- `radii.radius-xl` - 16px
- `radii.radius-2xl` - 20px
- `radii.radius-3xl` - 24px
- `radii.radius-full` - 9999px (fully rounded)

## Effects Tokens

### Elevation

Elevation tokens define shadow effects for depth:

#### Sunken

- `elevation.sunken.inner-shadows.1` - Inner shadow for sunken elements
- `elevation.sunken.shadows.1` - Outer shadow for sunken elements

#### Default

- `elevation.default.shadows.1` - Primary shadow (y: 1px, blur: 3px)
- `elevation.default.shadows.2` - Secondary shadow (y: 0px, blur: 1px)

#### Raised

- `elevation.raised.shadows.1` - Primary shadow (y: 4px, blur: 8px)
- `elevation.raised.shadows.2` - Secondary shadow (y: 2px, blur: 4px)

#### Overlay

- `elevation.overlay.shadows.1` - Primary shadow (y: 8px, blur: 16px)
- `elevation.overlay.shadows.2` - Secondary shadow (y: 4px, blur: 6px)

#### Overflow

- `elevation.overflow.inner-shadows.1` - Inner shadow for scrollable containers
- `elevation.overflow.shadows.1` - Outer shadow for scrollable containers

Each shadow includes properties for:

- `x` - Horizontal offset
- `y` - Vertical offset
- `blur` - Blur radius
- `spread` - Spread radius
- `color` - Shadow color (references color tokens)

## Opacity Tokens

Opacity values for transparency effects:

- `opacity-0` - 0% (fully transparent)
- `opacity-1` - 10%
- `opacity-2` - 20%
- `opacity-3` - 30%
- `opacity-4` - 40%
- `opacity-5` - 50%
- `opacity-6` - 60%
- `opacity-7` - 70%
- `opacity-8` - 80%
- `opacity-9` - 90%
- `opacity-full` - 100% (fully opaque)

## Component Token Usage

Components in the Figma file use semantic tokens to style their variants. Each component page demonstrates how tokens are applied across different:

- **Types** - Primary, Secondary, Tertiary, Danger, Link, Icon
- **Sizes** - Large (lg), Regular (md), Small (sm)
- **States** - Default, Hover, Disabled, Focused, Selected

### Example: Button Component

The Button component uses:

**Colors:**

- Primary buttons: `bg.action.primary` / `bg.action.primary-hover`
- Secondary buttons: `bg.action.secondary` / `bg.action.secondary-hover`
- Danger buttons: `bg.status.danger-solid` / `bg.status.danger-solid-hover`
- Text colors: `text.neutral.primary`, `text.neutral.disabled`
- Border colors: `border.neutral.input`, `border.colored.focused`

**Typography:**

- Large: `body.large` or `headings.medium`
- Regular: `body.medium` or `headings.small`
- Small: `body.small` or `captions.x-small`

**Spacing:**

- Padding: `spacer-4`, `spacer-5`, `spacer-6` (varies by size)
- Border radius: `radius-md` or `radius-sm`

**Effects:**

- Focus state: `elevation.default.shadows.1`
- Hover elevation: `elevation.raised.shadows.1` (for some variants)

### Example: Split Button Component

Similar to Button but with:

- Additional hover states for the dropdown trigger
- Uses same color and typography tokens as Button
- Border tokens for the divider between button and dropdown

## Theme Support

All tokens support Light and Dark themes:

- **Light Theme** - Defined in `Light.tokens.json` files
- **Dark Theme** - Defined in `Dark.tokens.json` files

Semantic tokens automatically adapt to the theme, ensuring consistent visual hierarchy and contrast ratios across both themes.

## Token File Structure

In the **Figma file**, the single source of truth is the **`tokens-json`** variable (collections: colours, typography, effects, spacings, opacity). When exporting or syncing to code, tokens are often split into files such as:

```
tokens-json/
├── colors/
│   ├── light.tokens.json
│   └── dark.tokens.json
├── effects/
│   ├── Light.tokens.json
│   └── Dark.tokens.json
├── typography.json
├── opacity.json
└── sizing.json
```

**Note:** Color token files use lowercase naming (`light.tokens.json`, `dark.tokens.json`), while effect token files may use capitalized naming (`Light.tokens.json`, `Dark.tokens.json`). Spacer and radius **values** can differ between Light and Dark themes; token **names** are shared.

## Code Syntax

Tokens include code syntax hints for web usage:

- **Colors**: `color.bg.surface.default`
- **Typography**: `font.size.md`, `headings.large`
- **Spacing**: `spacer-4`, `radius-md`
- **Effects**: `elevation.raised`
- **Opacity**: `opacity-6`

These syntax hints guide implementation in CSS, TypeScript, and other languages.

## Best Practices

1. **Always use semantic tokens** - Never reference primitive tokens directly in components
2. **Theme-aware** - Semantic tokens automatically adapt to Light/Dark themes
3. **Consistent naming** - Token names follow a clear hierarchy: `category.subcategory.variant.state`
4. **Complete typography** - Always use complete text style tokens (font-family, size, weight, line-height, letter-spacing together)
5. **State management** - Use state-specific tokens (hover, disabled, focused) rather than modifying base tokens

## Component Pages in Figma

The Orion v2.0 Figma file is the design library for Orion UI components. **Components and their variants** live on **individual pages** in the file. Each page demonstrates how **semantic tokens** (❖) are applied to build variants (e.g. type, size, state).

- **Buttons** – Primary, Secondary, Danger, Link, Icon button variants
- **Split Button** – Combined button with dropdown trigger
- **Additional component pages** – one page per component; explore the Figma file for the full list

Each component page typically shows:

- All size variants (e.g. Large, Regular, Small)
- All state variants (Default, Hover, Disabled, Focused, Selected)
- Light and Dark theme examples
- Token usage that maps to **Storybook** stories and docs (see **storybook-setup.md**)
