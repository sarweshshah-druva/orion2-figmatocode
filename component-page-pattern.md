# Component Page Design Pattern

## 1. Introduction

### Purpose

This document outlines the design pattern and implementation decisions for creating component documentation in the Orion Design System. The pattern defines the **content and structure** of component docs (Hero, Overview, Specifications, Detailed Examples, Usage Guidelines). Component documentation is **implemented in Storybook** via stories and optional MDX—not in a custom app. See **storybook-setup.md** for Storybook configuration, file layout, and implementation order.

### When to Use This Pattern

Use this pattern when creating documentation pages for:

- Individual components (e.g., Button, Input, Card)
- Component groups with multiple variants
- Design system elements that require comprehensive documentation

### Design Philosophy

The component page pattern follows these core principles:

1. **Progressive Disclosure**: Information is revealed progressively from overview to detailed examples
2. **Visual Hierarchy**: Clear typography and spacing create a logical reading flow
3. **Interactive Examples**: Live component demonstrations enable immediate understanding
4. **Accessibility First**: Semantic HTML and ARIA attributes ensure inclusive access
5. **Theme Consistency**: All styling uses design tokens for seamless light/dark theme support
6. **Responsive Design**: Layouts adapt gracefully across device sizes

## 2. Page Architecture

The component page follows a hierarchical structure that guides users from high-level understanding to detailed implementation:

```
Header (Sticky Navigation)
├── Title & Breadcrumb
└── Theme Toggle

Main Content
├── Hero Section
│   ├── Component Title (H2)
│   └── Component Description
├── Overview Grid
│   └── 3-5 Cards (one per variant)
│       ├── Variant Title
│       ├── Variant Description
│       └── Live Component Example
├── Specifications Section
│   └── Two Side-by-Side Tables
│       ├── Sizes Table
│       └── Properties Table
├── Detailed Examples
│   └── One Section per Variant
│       └── Size × State Matrix Table
│           ├── Size Column
│           ├── Default State Column
│           └── Disabled State Column
└── Usage Guidelines
    └── Two Cards Side-by-Side
        ├── Do's Card
        └── Don'ts Card

Footer
└── System Information & Theme Indicator
```

### Implementation Location

The pattern is implemented **in Storybook**:

- **Stories** (`ComponentName.stories.tsx`) – One story per variant or example; use design tokens only. Autodocs and controls provide interactive docs.
- **MDX** (optional `ComponentName.mdx`) – For rich docs: Hero text, specification tables, Usage Guidelines (Do's / Don'ts), and embedded story canvases.
- **No custom doc app** – Storybook is the single place for component documentation and development. See **storybook-setup.md** for file layout and conventions.

## 3. Section-by-Section Breakdown

### Header Navigation

**Purpose**: Provides persistent navigation and theme control

**Implementation Details**:

- **Position**: Sticky (`position: sticky`, `top: 0`)
- **Background**: Uses `var(--bg-surface-default)` with backdrop blur
- **Scroll Effect**: Shadow intensifies on scroll (via `scrolled` state)
- **Layout**: Flexbox with space-between alignment
- **Padding**: `16px 40px` (vertical horizontal)

**Key Features**:

- Title uses `headings-medium` tokens (600 weight, -0.02em letter spacing)
- Breadcrumb subtitle uses `body-small` tokens
- Theme toggle button with icon and label
- ARIA role: `banner`

**Code Pattern**:

```tsx
<header
  className={`app-header ${scrolled ? "scrolled" : ""}`}
  style={{
    position: "sticky",
    top: 0,
    backgroundColor: "var(--bg-surface-default)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
    padding: "16px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
  }}
  role="banner"
>
  {/* Title and breadcrumb */}
  {/* Theme toggle */}
</header>
```

**Styling** (from `App.css`):

- Animation: `slideDown` 0.4s ease-out
- Backdrop filter: `blur(8px)`
- Box shadow transitions on scroll
- Dark theme: Enhanced shadow intensity

### Hero Section

**Purpose**: Introduces the component with clear title and description

**Implementation Details**:

- **Title**: H2 with `headings-large` tokens
  - Font size: `var(--headings-large-font-size)`
  - Font weight: 700
  - Letter spacing: -0.03em
  - Line height: `var(--headings-large-line-height)`
- **Description**: Body text with `body-large` tokens
  - Font size: `var(--body-large-font-size)`
  - Font weight: 400
  - Max width: 800px for readability
  - Color: `var(--text-neutral-secondary)`

**Spacing**:

- Section margin bottom: 48px
- Title margin bottom: 16px

**Animation**: `fadeIn` 0.6s ease-out with 0.1s delay

**Code Pattern**:

```tsx
<section
  className="hero-section"
  style={{ marginBottom: "48px", maxWidth: "1200px" }}
  aria-labelledby="hero-title"
>
  <h2
    id="hero-title"
    style={{
      fontFamily: "var(--headings-large-font-family)",
      fontSize: "var(--headings-large-font-size)",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: "var(--headings-large-line-height)",
      color: "var(--text-neutral-primary)",
      marginBottom: "16px",
    }}
  >
    Component Name
  </h2>
  <p
    style={{
      fontFamily: "var(--body-large-font-family)",
      fontSize: "var(--body-large-font-size)",
      fontWeight: 400,
      lineHeight: "var(--body-large-line-height)",
      color: "var(--text-neutral-secondary)",
      margin: 0,
      maxWidth: "800px",
    }}
  >
    Component description explaining purpose and use cases.
  </p>
</section>
```

### Overview Grid

**Purpose**: Provides quick visual overview of all component variants

**Layout**:

- CSS Grid with `repeat(auto-fit, minmax(280px, 1fr))`
- Gap: 20px
- Responsive: Cards stack on smaller screens

**Card Structure**:
Each card (`overview-card`) contains:

1. **Title**: H4 with `headings-small` tokens (600 weight, -0.01em spacing)
2. **Description**: Body text with `body-small` tokens (400 weight)
3. **Live Example**: Actual component instance

**Card Styling**:

- Background: `var(--bg-surface-card)`
- Border radius: 8px
- Padding: 24px
- Border: `1px solid rgba(0, 0, 0, 0.06)`
- Box shadow: `0 2px 4px rgba(0, 0, 0, 0.04)`

**Animations**:

- Entry: `scaleIn` 0.4s ease-out
- Staggered delays: 0.1s, 0.15s, 0.2s, 0.25s, 0.3s
- Hover: `translateY(-4px)` with enhanced shadow

**Dark Theme Adjustments**:

- Border color: `rgba(255, 255, 255, 0.08)`
- Shadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
- Hover shadow: `0 8px 16px rgba(0, 0, 0, 0.4)`
- Subtle gradient overlay on hover

**Code Pattern**:

```tsx
<section style={{ marginBottom: "64px" }} aria-labelledby="overview-title">
  <h3
    id="overview-title"
    className="section-title"
    style={{
      fontFamily: "var(--headings-medium-font-family)",
      fontSize: "var(--headings-medium-font-size)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-neutral-primary)",
      marginBottom: "24px",
    }}
  >
    Overview
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      marginBottom: "32px",
    }}
  >
    <article
      className="overview-card"
      style={{
        backgroundColor: "var(--bg-surface-card)",
        borderRadius: "8px",
        padding: "24px",
      }}
      role="article"
      aria-labelledby="variant-card-title"
    >
      <div style={{ marginBottom: "16px" }}>
        <h4
          style={{
            fontFamily: "var(--headings-small-font-family)",
            fontSize: "var(--headings-small-font-size)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--text-neutral-primary)",
            marginBottom: "8px",
          }}
        >
          Variant Name
        </h4>
        <p
          style={{
            fontFamily: "var(--body-small-font-family)",
            fontSize: "var(--body-small-font-size)",
            fontWeight: 400,
            lineHeight: "var(--body-small-line-height)",
            color: "var(--text-neutral-secondary)",
            margin: 0,
          }}
        >
          Variant description and use case.
        </p>
      </div>
      <Component variant="..." />
    </article>
    {/* Repeat for each variant */}
  </div>
</section>
```

### Specifications Section

**Purpose**: Provides technical specifications in scannable table format

**Layout**:

- Two tables side-by-side using CSS Grid
- Grid: `repeat(auto-fit, minmax(400px, 1fr))`
- Gap: 24px
- Each table in a `spec-card` container

**Table Structure**:

- **Sizes Table**: Size name, Height, Padding
- **Properties Table**: Property name, Value

**Table Styling**:

- Font: `body-small` tokens
- Border collapse: `collapse`
- Headers: 600 weight, uppercase, 11px size, 0.02em letter spacing
- Borders: `1px solid rgba(0, 0, 0, 0.06)` between rows
- Cell padding: `8px` (first column: `8px 8px 8px 0`)

**Card Styling**:

- Same as overview cards
- Animation: `fadeIn` 0.5s ease-out
- Staggered delays: 0.35s, 0.4s

**Code Pattern**:

```tsx
<section
  style={{ marginBottom: "64px" }}
  aria-labelledby="specifications-title"
>
  <h3
    id="specifications-title"
    className="section-title"
    style={{
      fontFamily: "var(--headings-medium-font-family)",
      fontSize: "var(--headings-medium-font-size)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-neutral-primary)",
      marginBottom: "24px",
    }}
  >
    Specifications
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "24px",
    }}
  >
    <div
      className="spec-card"
      style={{
        backgroundColor: "var(--bg-surface-card)",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      <h4
        style={{
          fontFamily: "var(--headings-small-font-family)",
          fontSize: "var(--headings-small-font-size)",
          fontWeight: "var(--headings-small-font-weight)",
          color: "var(--text-neutral-primary)",
          marginBottom: "16px",
        }}
      >
        Sizes
      </h4>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--body-small-font-family)",
          fontSize: "var(--body-small-font-size)",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
            <th
              style={{
                textAlign: "left",
                padding: "8px 8px 8px 0",
                color: "var(--text-neutral-primary)",
                fontWeight: 600,
              }}
            >
              Size
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px 0",
                color: "var(--text-neutral-primary)",
                fontWeight: 600,
              }}
            >
              Height
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px 0",
                color: "var(--text-neutral-primary)",
                fontWeight: 600,
              }}
            >
              Padding
            </th>
          </tr>
        </thead>
        <tbody>{/* Rows */}</tbody>
      </table>
    </div>
    {/* Second table */}
  </div>
</section>
```

### Detailed Examples

**Purpose**: Shows all variants with all sizes and states in a scannable format

**Structure**:

- One section per component variant
- Each section contains a table
- Table format: Size × State matrix

**Table Format**:

- **Columns**: Size | Default | Disabled
- **Rows**: One per size (Large, Medium, Small)
- **Cells**: Live component instances

**Section Styling**:

- Container: `example-section` class
- Background: `var(--bg-surface-card)`
- Border radius: 8px
- Padding: 32px
- Margin bottom: 48px between sections

**Table Styling**:

- Class: `interactive-table`
- Row hover: Background color change (`rgba(0, 0, 0, 0.02)`)
- Transition: `background-color 0.15s ease`
- Cell padding: `16px 8px`
- First column: Fixed width 120px, left-aligned
- Other columns: Center-aligned

**Code Pattern**:

```tsx
<section style={{ marginBottom: "48px" }}>
  <div
    className="example-section"
    style={{
      backgroundColor: "var(--bg-surface-card)",
      borderRadius: "8px",
      padding: "32px",
    }}
  >
    <div style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontFamily: "var(--headings-medium-font-family)",
          fontSize: "var(--headings-medium-font-size)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--text-neutral-primary)",
          marginBottom: "12px",
        }}
      >
        Variant Name
      </h3>
      <p
        style={{
          fontFamily: "var(--body-small-font-family)",
          fontSize: "var(--body-small-font-size)",
          fontWeight: 400,
          lineHeight: "var(--body-small-line-height)",
          color: "var(--text-neutral-secondary)",
          margin: 0,
        }}
      >
        Variant description and usage guidance.
      </p>
    </div>

    <table
      className="interactive-table"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "var(--body-small-font-family)",
        fontSize: "var(--body-small-font-size)",
      }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
          <th
            style={{
              textAlign: "left",
              padding: "12px 8px",
              color: "var(--text-neutral-primary)",
              fontWeight: 600,
              width: "120px",
            }}
          >
            Size
          </th>
          <th
            style={{
              textAlign: "center",
              padding: "12px 8px",
              color: "var(--text-neutral-primary)",
              fontWeight: 600,
            }}
          >
            Default
          </th>
          <th
            style={{
              textAlign: "center",
              padding: "12px 8px",
              color: "var(--text-neutral-primary)",
              fontWeight: 600,
            }}
          >
            Disabled
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
          <td
            style={{
              padding: "16px 8px",
              color: "var(--text-neutral-primary)",
              fontWeight: 500,
            }}
          >
            Large
          </td>
          <td style={{ padding: "16px 8px", textAlign: "center" }}>
            <Component variant="..." size="Large" />
          </td>
          <td style={{ padding: "16px 8px", textAlign: "center" }}>
            <Component variant="..." size="Large" disabled />
          </td>
        </tr>
        {/* Repeat for Medium and Small */}
      </tbody>
    </table>
  </div>
</section>
```

### Usage Guidelines

**Purpose**: Provides quick reference for best practices

**Layout**:

- Two cards side-by-side
- Grid: `repeat(auto-fit, minmax(350px, 1fr))`
- Gap: 24px

**Card Structure**:

- **Do's Card**:
  - Title: Green color (`var(--text-colored-success-bold)`)
  - Icon: ✓
  - Unordered list of recommendations
- **Don'ts Card**:
  - Title: Red color (`var(--text-colored-error)`)
  - Icon: ✗
  - Unordered list of anti-patterns

**List Styling**:

- Font: `body-small` tokens
- Padding left: 20px
- List item margin bottom: 8px
- Color: `var(--text-neutral-secondary)`

**Code Pattern**:

```tsx
<section style={{ marginBottom: "48px" }} aria-labelledby="guidelines-title">
  <h3
    id="guidelines-title"
    className="section-title"
    style={{
      fontFamily: "var(--headings-medium-font-family)",
      fontSize: "var(--headings-medium-font-size)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-neutral-primary)",
      marginBottom: "24px",
    }}
  >
    Usage Guidelines
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
    }}
  >
    <div
      className="guideline-card"
      style={{
        backgroundColor: "var(--bg-surface-card)",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      <h4
        style={{
          fontFamily: "var(--headings-small-font-family)",
          fontSize: "var(--headings-small-font-size)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--text-colored-success-bold)",
          marginBottom: "16px",
        }}
      >
        ✓ Do
      </h4>
      <ul
        style={{
          fontFamily: "var(--body-small-font-family)",
          fontSize: "var(--body-small-font-size)",
          fontWeight: 400,
          lineHeight: "var(--body-small-line-height)",
          color: "var(--text-neutral-secondary)",
          margin: 0,
          paddingLeft: "20px",
        }}
      >
        <li style={{ marginBottom: "8px" }}>Guideline 1</li>
        {/* More guidelines */}
      </ul>
    </div>
    {/* Don'ts card with similar structure */}
  </div>
</section>
```

### Footer

**Purpose**: Provides system information and theme indicator

**Implementation**:

- Border top: `1px solid rgba(0, 0, 0, 0.06)`
- Padding: `24px 40px`
- Margin top: 64px
- Text: Centered, `body-small` tokens
- Color: `var(--text-neutral-tertiary)`
- ARIA role: `contentinfo`

**Animation**: `fadeIn` 0.6s ease-out with 0.6s delay

## 4. Styling Patterns

### Design Token Usage

All styling uses CSS custom properties from the design token system:

**Colors**:

- Backgrounds: `var(--bg-surface-*)`
- Text: `var(--text-neutral-*)`, `var(--text-colored-*)`
- Borders: `var(--border-neutral-*)`, `var(--border-colored-*)`

**Typography**:

- Font families: `var(--headings-*-font-family)`, `var(--body-*-font-family)`
- Font sizes: `var(--headings-*-font-size)`, `var(--body-*-font-size)`
- Line heights: `var(--headings-*-line-height)`, `var(--body-*-line-height)`
- Letter spacing: `var(--headings-*-letter-spacing)`, `var(--body-*-letter-spacing)`

**Spacing**:

- Padding: `var(--spacing-*)`
- Margins: Calculated from spacing tokens
- Gaps: `20px`, `24px`, `32px` (multiples of 4px base unit)

**Border Radius**:

- Cards: 8px
- Buttons/components: 4px (`var(--radius-sm)`)

### Visual Effects

**Shadows**:

- Light theme:
  - Default: `0 2px 4px rgba(0, 0, 0, 0.04)`
  - Hover: `0 8px 16px rgba(0, 0, 0, 0.12)`
  - Header scrolled: `0 4px 12px rgba(0, 0, 0, 0.08)`
- Dark theme:
  - Default: `0 2px 4px rgba(0, 0, 0, 0.2)`
  - Hover: `0 8px 16px rgba(0, 0, 0, 0.4)`
  - Header scrolled: `0 4px 12px rgba(0, 0, 0, 0.5)`

**Borders**:

- Default: `1px solid rgba(0, 0, 0, 0.06)`
- Dark theme: `1px solid rgba(255, 255, 255, 0.08)`
- Hover: Slightly darker/more opaque

**Transforms**:

- Card hover: `translateY(-4px)` or `translateY(-2px)`
- Theme toggle hover: `translateY(-1px)`
- Badge hover: `scale(1.05)`

**Transitions**:

- Duration: 0.2s - 0.3s
- Easing: `ease`, `ease-out`, or `cubic-bezier(0.4, 0, 0.2, 1)`
- Properties: `all`, `background-color`, `box-shadow`, `transform`

### Dark Mode Support

**Border Adjustments**:

- All borders use theme-aware rgba values
- Dark theme borders are lighter (white with opacity)
- Header/footer borders: `rgba(255, 255, 255, 0.08)`
- Table borders: `rgba(255, 255, 255, 0.06)` to `rgba(255, 255, 255, 0.08)`

**Shadow Intensity**:

- Dark theme shadows are more intense (higher opacity black)
- Creates depth perception in low-light environments

**Gradient Overlays**:

- Cards have subtle gradient overlays in dark mode
- Default: `linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)`
- Hover: `linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)`

**Text Glow** (Hero Section):

- Subtle text shadow: `0 0 20px rgba(255, 255, 255, 0.03)`
- Enhances readability without being distracting

## 5. Typography Hierarchy

The component page uses a clear typography hierarchy to establish visual importance:

### Heading Levels

**H1 (Page Title - Header)**:

- Font family: `var(--headings-medium-font-family)`
- Font size: `var(--headings-medium-font-size)`
- Font weight: 600
- Letter spacing: -0.02em
- Color: `var(--text-neutral-primary)`

**H2 (Hero Title)**:

- Font family: `var(--headings-large-font-family)`
- Font size: `var(--headings-large-font-size)`
- Font weight: 700
- Letter spacing: -0.03em
- Line height: `var(--headings-large-line-height)`
- Color: `var(--text-neutral-primary)`

**H3 (Section Titles)**:

- Font family: `var(--headings-medium-font-family)`
- Font size: `var(--headings-medium-font-size)`
- Font weight: 600
- Letter spacing: -0.02em
- Color: `var(--text-neutral-primary)`
- Special: Underline animation on hover (via `.section-title::after`)

**H4 (Card Titles)**:

- Font family: `var(--headings-small-font-family)`
- Font size: `var(--headings-small-font-size)`
- Font weight: 600
- Letter spacing: -0.01em
- Color: `var(--text-neutral-primary)`

### Body Text

**Body Large (Hero Description)**:

- Font family: `var(--body-large-font-family)`
- Font size: `var(--body-large-font-size)`
- Font weight: 400
- Line height: `var(--body-large-line-height)`
- Color: `var(--text-neutral-secondary)`

**Body Medium (General Content)**:

- Font family: `var(--body-medium-font-family)`
- Font size: `var(--body-medium-font-size)`
- Font weight: 400
- Line height: `var(--body-medium-line-height)`

**Body Small (Card Descriptions, Tables, Lists)**:

- Font family: `var(--body-small-font-family)`
- Font size: `var(--body-small-font-size)`
- Font weight: 400
- Line height: `var(--body-small-line-height)`
- Color: `var(--text-neutral-secondary)`

### Table Headers

- Font family: `var(--body-small-font-family)`
- Font size: 11px (hardcoded, smaller than body-small)
- Font weight: 600
- Letter spacing: 0.02em
- Text transform: uppercase
- Color: `var(--text-neutral-primary)`

### Special Typography

**Guideline Card Titles**:

- Do's: `var(--text-colored-success-bold)` (green)
- Don'ts: `var(--text-colored-error)` (red)
- Same font properties as H4

## 6. Accessibility Features

### Semantic HTML

All sections use appropriate semantic elements:

- `<header>`: Page header with navigation
- `<main>`: Main content area
- `<section>`: Major content sections
- `<article>`: Overview cards (independent content)
- `<footer>`: Page footer
- `<nav>`: (Future: navigation menu)
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`: Proper table structure

### ARIA Attributes

**Roles**:

- `role="banner"`: Header
- `role="main"`: Main content
- `role="article"`: Overview cards
- `role="contentinfo"`: Footer

**Labels**:

- `aria-labelledby`: Links headings to sections
- `aria-label`: Theme toggle button
- `aria-hidden="true"`: Decorative icons

**Example**:

```tsx
<section aria-labelledby="overview-title">
  <h3 id="overview-title">Overview</h3>
  {/* Content */}
</section>
```

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Focus-visible styles applied globally:
  ```css
  *:focus-visible {
    outline: 2px solid var(--border-colored-focused);
    outline-offset: 2px;
    border-radius: 2px;
  }
  ```
- Theme toggle is fully keyboard operable
- Tables are navigable with arrow keys

### Screen Reader Considerations

- All images/icons have appropriate alt text or `aria-hidden`
- Table headers properly associated with cells
- Section headings provide context
- Live component examples are self-describing

### Reduced Motion Support

Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This ensures users who prefer reduced motion don't experience distracting animations.

## 7. Animation Strategy

### Entry Animations

**Types**:

1. **fadeIn**: Opacity 0→1, translateY 10px→0
2. **slideDown**: Opacity 0→1, translateY -10px→0
3. **scaleIn**: Opacity 0→1, scale 0.95→1

**Usage**:

- Header: `slideDown` 0.4s ease-out
- Hero: `fadeIn` 0.6s ease-out, 0.1s delay
- Overview cards: `scaleIn` 0.4s ease-out, staggered delays
- Spec cards: `fadeIn` 0.5s ease-out, staggered delays
- Example sections: `fadeIn` 0.5s ease-out
- Guideline cards: `fadeIn` 0.5s ease-out, staggered delays
- Footer: `fadeIn` 0.6s ease-out, 0.6s delay

**Staggered Delays**:

- Overview cards: 0.1s, 0.15s, 0.2s, 0.25s, 0.3s
- Spec cards: 0.35s, 0.4s
- Guideline cards: 0.5s, 0.55s

### Hover Transitions

**Card Hover**:

- Transform: `translateY(-4px)` or `translateY(-2px)`
- Shadow: Enhanced (see Visual Effects section)
- Border: Slightly more opaque
- Duration: 0.2s - 0.3s
- Easing: `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`

**Table Row Hover**:

- Background: `rgba(0, 0, 0, 0.02)` (light) / `rgba(255, 255, 255, 0.03)` (dark)
- Duration: 0.15s ease

**Theme Toggle Hover**:

- Transform: `translateY(-1px)`
- Shadow: Enhanced
- Duration: 0.2s ease

### Scroll-Triggered Effects

**Header Shadow**:

- Detects scroll position via `useState` and `useEffect`
- Adds `scrolled` class when `window.scrollY > 10`
- Shadow intensifies via CSS class

**Implementation**:

```tsx
const [scrolled, setScrolled] = useState(false);

React.useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Performance Considerations

- Animations use `transform` and `opacity` (GPU-accelerated properties)
- Avoid animating `width`, `height`, `top`, `left` (triggers layout)
- Transitions are hardware-accelerated
- Reduced motion support prevents performance issues for users who prefer it
- Mobile: Simplified animations (fadeIn only, no stagger)

## 8. Responsive Considerations

### Grid Breakpoints

**Overview Grid**:

- Desktop: `repeat(auto-fit, minmax(280px, 1fr))`
- Mobile: Cards stack vertically (auto-fit handles this)

**Specifications Grid**:

- Desktop: `repeat(auto-fit, minmax(400px, 1fr))`
- Tablet: Side-by-side if space allows
- Mobile: Stacked

**Guidelines Grid**:

- Desktop: `repeat(auto-fit, minmax(350px, 1fr))`
- Mobile: Stacked

### Mobile Adjustments

**Padding**:

- Header: `16px 40px` → Consider `16px 20px` on mobile
- Main content: `40px` → Consider `20px` on mobile
- Footer: `24px 40px` → Consider `24px 20px` on mobile

**Typography**:

- Font sizes scale naturally with viewport
- Line heights adjust for readability

**Animations**:

- Simplified on mobile (no stagger delays)
- Faster durations (0.3s instead of 0.5s+)

**Table Handling**:

- Tables may need horizontal scroll on very small screens
- Consider: `overflow-x: auto` wrapper

### Media Query Pattern

```css
@media (max-width: 768px) {
  .overview-card,
  .spec-card,
  .example-section,
  .guideline-card {
    animation: fadeIn 0.3s ease-out both;
  }
}
```

## 9. Implementation Checklist

When creating a new component page, follow this checklist:

### Structure

- [ ] Create sticky header with theme toggle
- [ ] Add hero section with component description
- [ ] Build overview grid with 3-5 cards (one per variant)
- [ ] Add specifications section with two side-by-side tables
- [ ] Create detailed examples section (one per variant)
- [ ] Include usage guidelines (Do's and Don'ts)
- [ ] Add footer with system information

### Styling

- [ ] Apply design tokens for all colors, typography, spacing
- [ ] Add card styling (background, border, shadow, radius)
- [ ] Implement hover effects and transitions
- [ ] Add animations with appropriate delays
- [ ] Style tables with subtle borders
- [ ] Apply section title hover underline effect

### Accessibility

- [ ] Add semantic HTML elements (`<header>`, `<main>`, `<section>`, etc.)
- [ ] Include ARIA roles and labels
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader
- [ ] Verify focus-visible styles
- [ ] Add reduced motion support

### Theme Support

- [ ] Test light theme appearance
- [ ] Test dark theme appearance
- [ ] Adjust border colors for dark theme
- [ ] Adjust shadow intensities for dark theme
- [ ] Add gradient overlays for dark theme cards
- [ ] Verify theme toggle functionality

### Responsive Design

- [ ] Test desktop layout (1200px+)
- [ ] Test tablet layout (768px - 1199px)
- [ ] Test mobile layout (< 768px)
- [ ] Verify grid layouts adapt correctly
- [ ] Check table readability on small screens
- [ ] Test animations on mobile

### Content

- [ ] Write clear component description
- [ ] Document all variants in overview
- [ ] Include accurate specifications
- [ ] Show all sizes and states in examples
- [ ] Write helpful usage guidelines
- [ ] Use appropriate icons/examples

### Polish

- [ ] Verify all animations work smoothly
- [ ] Check spacing consistency
- [ ] Ensure typography hierarchy is clear
- [ ] Test scroll behavior
- [ ] Verify all interactive elements work
- [ ] Check console for errors

## 10. Code Patterns

### Card Structure Pattern

```tsx
<article
  className="overview-card"
  style={{
    backgroundColor: "var(--bg-surface-card)",
    borderRadius: "8px",
    padding: "24px",
  }}
  role="article"
  aria-labelledby="card-title"
>
  <div style={{ marginBottom: "16px" }}>
    <h4
      style={{
        fontFamily: "var(--headings-small-font-family)",
        fontSize: "var(--headings-small-font-size)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "var(--text-neutral-primary)",
        marginBottom: "8px",
      }}
    >
      Card Title
    </h4>
    <p
      style={{
        fontFamily: "var(--body-small-font-family)",
        fontSize: "var(--body-small-font-size)",
        fontWeight: 400,
        lineHeight: "var(--body-small-line-height)",
        color: "var(--text-neutral-secondary)",
        margin: 0,
      }}
    >
      Card description text.
    </p>
  </div>
  {/* Component example */}
</article>
```

### Table Structure Pattern

```tsx
<table
  className="interactive-table"
  style={{
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "var(--body-small-font-family)",
    fontSize: "var(--body-small-font-size)",
  }}
>
  <thead>
    <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
      <th
        style={{
          textAlign: "left",
          padding: "12px 8px",
          color: "var(--text-neutral-primary)",
          fontWeight: 600,
          width: "120px",
        }}
      >
        Column 1
      </th>
      <th
        style={{
          textAlign: "center",
          padding: "12px 8px",
          color: "var(--text-neutral-primary)",
          fontWeight: 600,
        }}
      >
        Column 2
      </th>
    </tr>
  </thead>
  <tbody>
    <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
      <td
        style={{
          padding: "16px 8px",
          color: "var(--text-neutral-primary)",
          fontWeight: 500,
        }}
      >
        Row Label
      </td>
      <td
        style={{
          padding: "16px 8px",
          textAlign: "center",
        }}
      >
        {/* Content */}
      </td>
    </tr>
  </tbody>
</table>
```

### Section Pattern

```tsx
<section style={{ marginBottom: "48px" }} aria-labelledby="section-title">
  <h3
    id="section-title"
    className="section-title"
    style={{
      fontFamily: "var(--headings-medium-font-family)",
      fontSize: "var(--headings-medium-font-size)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-neutral-primary)",
      marginBottom: "24px",
    }}
  >
    Section Title
  </h3>
  {/* Section content */}
</section>
```

### Grid Layout Pattern

```tsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  }}
>
  {/* Grid items */}
</div>
```

## 11. Design Decisions Rationale

### Why Tables for Examples?

**Decision**: Use tables to display component examples in a Size × State matrix format.

**Rationale**:

- **Scannability**: Tables allow quick comparison across sizes and states
- **Consistency**: All variants follow the same pattern, making it easy to find information
- **Space Efficiency**: Tables make efficient use of horizontal space
- **Accessibility**: Proper table structure with headers is screen-reader friendly
- **Familiar Pattern**: Developers are familiar with table-based documentation

**Alternative Considered**: Individual cards for each size/state combination

- **Rejected**: Would require too much vertical space and scrolling

### Why Cards for Overview?

**Decision**: Use card-based grid layout for component variant overview.

**Rationale**:

- **Visual Hierarchy**: Cards create clear separation between variants
- **Modularity**: Each card is self-contained and can be understood independently
- **Visual Interest**: Cards with shadows and hover effects are more engaging
- **Responsive**: Grid layout adapts naturally to different screen sizes
- **Progressive Disclosure**: Overview cards provide high-level understanding before detailed examples

**Alternative Considered**: Simple list or single column layout

- **Rejected**: Less visually engaging and harder to scan

### Why Staggered Animations?

**Decision**: Use staggered animation delays for card grids.

**Rationale**:

- **Progressive Disclosure**: Cards appear in sequence, guiding the eye
- **Visual Interest**: Creates a polished, professional feel
- **Performance**: Small delays don't impact performance but enhance UX
- **Attention Direction**: Guides users through content in logical order

**Alternative Considered**: All cards animate simultaneously

- **Rejected**: Less visually interesting and can be overwhelming

### Why Subtle Borders?

**Decision**: Use very subtle borders (`rgba(0, 0, 0, 0.06)`) instead of stronger borders.

**Rationale**:

- **Theme Compatibility**: Works well in both light and dark themes
- **Visual Hierarchy**: Subtle borders provide separation without competing with content
- **Modern Aesthetic**: Aligns with contemporary design trends
- **Accessibility**: Doesn't create visual noise that distracts from content
- **Consistency**: Matches the overall design system's subtle approach

**Alternative Considered**: Stronger borders (`1px solid var(--border-neutral-input)`)

- **Rejected**: Too contrasting, especially in dark theme

### Why Specific Spacing Values?

**Decision**: Use specific spacing values (20px, 24px, 32px, 48px, 64px) instead of arbitrary values.

**Rationale**:

- **Visual Rhythm**: Creates consistent vertical rhythm throughout the page
- **4px Base Unit**: All values are multiples of 4px, aligning with design system
- **Hierarchy**: Larger spacing for major sections, smaller for related content
- **Consistency**: Same spacing patterns used across all sections
- **Maintainability**: Easy to remember and apply consistently

**Spacing Scale**:

- 20px: Grid gaps (overview, guidelines)
- 24px: Card padding, section title margin bottom, table cell padding
- 32px: Grid gap (specifications), example section padding
- 48px: Section margin bottom (hero, examples)
- 64px: Major section separation (specifications, footer margin)

### Why Inline Styles?

**Decision**: Use inline styles in React components instead of CSS classes for most styling.

**Rationale**:

- **Design Token Access**: Direct access to CSS variables via `var(--token-name)`
- **Dynamic Theming**: Easy to adjust styles based on theme or state
- **Component Isolation**: Styles are co-located with components
- **No Class Name Conflicts**: Avoids CSS specificity issues
- **Type Safety**: (Future) Can be typed with TypeScript

**Trade-offs**:

- **Larger Bundle**: Inline styles increase bundle size slightly
- **No Pseudo-selectors**: Requires workarounds for hover/focus (handled via CSS classes)
- **Maintenance**: Can be harder to maintain if styles become complex

**Hybrid Approach**: Use CSS classes for animations, hover effects, and theme-specific adjustments; inline styles for layout and design token values.

## 12. Future Considerations

### Storybook Coverage

Many previously "planned" features are provided by Storybook and should be used as the default:

- **Live prop editing** – Storybook Controls give interactive prop editing; no custom sidebar needed.
- **Component playground** – Each story is an isolated playground; share via URL.
- **Code snippets** – Docs tab can show source; add copy buttons in MDX or custom doc blocks if desired.
- **Search and filtering** – Storybook sidebar and search are built-in.

When adding new component docs, implement them as stories (and optional MDX) in Storybook rather than building custom equivalents. See **storybook-setup.md**.

### Code Snippet Copying (Optional Enhancement)

**Optional**: Add "Copy Code" buttons in MDX or custom Storybook doc blocks for component examples.

**Implementation Ideas**:

- Use Storybook's doc blocks or a custom component in MDX
- Copies JSX/TSX for the current story args
- Accessible with keyboard navigation

**Benefits**: Faster developer workflow; encourages consistent usage.

### Component Playground (Covered by Storybook)

Storybook stories **are** the playground: full-screen canvas, multiple instances per story, and shareable URLs. No separate playground app is required. Use "All sizes" or "All variants" stories for exploration.

### Version History

**Planned Feature**: Document component version changes.

**Implementation Ideas**:

- Changelog section on component page
- Version badges
- Migration guides for breaking changes
- Visual diff of changes

**Benefits**:

- Transparency in design system evolution
- Easier migration planning
- Historical reference

### Related Components

**Planned Feature**: Show related components and patterns.

**Implementation Ideas**:

- "See Also" section
- Component relationships graph
- Usage patterns across components
- Navigation to related documentation

**Benefits**:

- Discoverability
- Understanding component relationships
- Better design system navigation

### Search and Filtering (Covered by Storybook)

Storybook provides sidebar navigation, search, and filtering by story. Use Storybook's built-in capabilities; extend with custom sidebar or tags if needed for categories (e.g. Components, Tokens).

---

## Conclusion

This component page pattern defines the **content and structure** of component documentation (Hero, Overview, Specifications, Detailed Examples, Usage Guidelines). Documentation is **implemented in Storybook** via stories and optional MDX, using design tokens and the same visual and accessibility principles.

The pattern balances:

- **Structure**: Clear, hierarchical organization (realized in Storybook docs and stories)
- **Visual Design**: Modern, polished aesthetics (design tokens; theme support via Storybook theme addon)
- **Accessibility**: Inclusive for all users (semantic HTML, ARIA, plus Storybook a11y addon)
- **Performance**: Smooth animations and interactions
- **Maintainability**: Consistent patterns; single place for docs (Storybook)

When implementing new component documentation, use this document for **content and layout** and **storybook-setup.md** for **where and how** (stories, MDX, config). Storybook is the source of truth for component docs and development.
