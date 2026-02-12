# Orion v2.0 Design System

A React component library built from Figma designs, providing a comprehensive set of UI components with design tokens, TypeScript support, and Storybook documentation.

## Overview

Orion v2.0 is a design system that bridges the gap between design and development. Components are built directly from Figma specifications using design tokens, ensuring visual consistency and maintainability across applications.

## Features

- 🎨 **Design Token System** - Comprehensive token system with primitives, semantic tokens, and theme support
- 🌓 **Theme Support** - Light and dark themes with CSS variable-based theming
- 📚 **Storybook Integration** - Interactive component documentation and development environment
- ♿ **Accessibility First** - Built with semantic HTML and ARIA attributes
- 🧪 **Testing** - Vitest test suite with React Testing Library
- 📦 **TypeScript** - Full type safety with exported types for all components
- 🎯 **Figma-Driven** - Components built directly from Figma designs

## Components

### Buttons
- `Button` - Primary, secondary, and tertiary button variants
- `SplitButton` - Button with dropdown menu

### Inputs
- `Checkbox` - Checkbox input with various states
- `Radio` - Radio button input
- `Switch` - Toggle switch component
- `Select` - Dropdown select component

### Textboxes
- `Textbox` - Text input with optional description, error states, and icons
- `MultiTagTextbox` - Text input with tag support
- `InputGroup` - Grouped input components

### Tags & Badges
- `Tag` - Tag component with optional label, value, icon, and dismiss functionality
- `Badge` - Badge component for status indicators

### Navigation & Menus
- `DropdownMenu` - Dropdown menu with categories and dividers
- `DropdownMenuItem` - Individual menu item
- `DropdownCategory` - Menu category grouping
- `DropdownDivider` - Menu divider

### Data Display
- `Avatar` - User avatar component
- `IconLabel` - Icon with label component
- `SimpleLabelValue` - Simple label-value pair
- `KPILabelValue` - KPI label-value display component
- `ToggleGroup` - Toggle group component with multiple items

## Installation

```bash
npm install
```

## Development

### Start Development Server

```bash
npm run dev
```

### Run Tests

```bash
# Watch mode
npm test

# Single run
npm run test:run
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Chromatic (visual testing)
npm run chromatic
```

### Build

```bash
npm run build
```

## Usage

### Import Components

```typescript
import { Button, Textbox, Checkbox, Tag } from "./components";
```

### Using Design Tokens

Import the CSS variables:

```typescript
import "./tokens/css-variables.css";
```

Set the theme on your root element:

```html
<html data-theme="light"></html>
```

Or switch at runtime:

```typescript
document.documentElement.setAttribute("data-theme", "dark");
```

Use tokens in your CSS:

```css
.my-component {
  background: var(--bg-surface-card);
  color: var(--text-neutral-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### Component Example

```tsx
import { Button } from "./components";

function App() {
  return (
    <Button variant="primary" size="medium">
      Click me
    </Button>
  );
}
```

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Buttons/
│   │   ├── Inputs/
│   │   ├── Textboxes/
│   │   ├── Tags & Badges/
│   │   └── ...
│   ├── tokens/              # Design tokens
│   │   ├── primitives/      # Base tokens
│   │   ├── themes/          # Theme definitions
│   │   └── css-variables.css
│   └── ...
├── .storybook/              # Storybook configuration
└── package.json
```

## Documentation

- **[Design Tokens](./src/tokens/README.md)** - Token system documentation
- **[Storybook Setup](./storybook-setup.md)** - Storybook configuration and conventions
- **[Component Guidelines](./figma-component-guidelines.md)** - Building components from Figma
- **[Component Page Pattern](./component-page-pattern.md)** - Documentation structure
- **[Design Tokens Summary](./design-tokens-summary.md)** - Complete token reference

## Design Principles

1. **Build Only What's in Figma** - Components match Figma specifications exactly
2. **Use Design Tokens** - Never hardcode colors, spacing, typography, or other design values
3. **Accessibility First** - Semantic HTML and ARIA attributes for inclusive design
4. **Type Safety** - Full TypeScript support with exported types
5. **Documentation** - Comprehensive Storybook documentation for all components

## Regenerating CSS Variables

After modifying design tokens, regenerate the CSS variables:

```bash
npx tsx src/tokens/generate-css.ts
```

This updates `src/tokens/css-variables.css` with the latest token values.

## Tech Stack

- **React** 18.3+
- **TypeScript** 5.3+
- **Vite** 6.0+ - Build tool
- **Storybook** 10.2+ - Component documentation
- **Vitest** 3.0+ - Testing framework
- **React Testing Library** - Component testing utilities
- **Lucide React** - Icon library

## Contributing

When contributing to this project:

1. Follow the [Figma Component Guidelines](./figma-component-guidelines.md)
2. Use design tokens for all styling
3. Write tests for new components
4. Add Storybook stories for component documentation
5. Follow the [Documentation Naming Convention](./documentation-naming.md)

## License

Private project - All rights reserved.
