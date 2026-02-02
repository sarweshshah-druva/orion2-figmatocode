# Documentation Naming Convention

All documentation files in the Orion v2.0 project follow a consistent naming convention.

## Convention

### Root-Level Documentation Files

**Format:** `lowercase-with-dashes.md`

Examples:

- `README.md` (standard convention)
- `figma-component-guidelines.md`
- `storybook-setup.md`
- `icon-system.md`
- `theming-guide.md`
- `theme-implementation-summary.md`
- `design-tokens-summary.md`
- `quickstart.md`

### Component/Module Documentation

**Format:** `README.md` (lowercase, standard convention)

Location: Inside component/module directories

Examples:

- `src/tokens/README.md`
- `src/icons/README.md`
- `src/components/Button/README.md`
- `src/components/KPI/README.md`

### Storybook Files

**Story files:** `ComponentName.stories.tsx` (or `.stories.ts`)

- Colocated with the component: `src/components/Button/Button.stories.tsx`
- One story file per component (or per logical group)

**Storybook config:** `.storybook/` directory at repo root

- `main.ts` – main config
- `preview.ts` – global decorators and CSS imports
- Optional: `preview-head.html`, `manager.ts`, custom files use `lowercase-with-dashes`

**MDX docs (Storybook):** `ComponentName.mdx` or `doc-name.mdx`

- Colocated with component or under `src/docs/`
- Use `lowercase-with-dashes` for standalone doc names

## Rules

1. **Root-level docs**: Use `lowercase-with-dashes.md`
2. **README files**: Always use `README.md` (both root and nested)
3. **Story files**: Use `ComponentName.stories.tsx` (or `.stories.ts`); colocate with component
4. **Hyphens, not underscores**: `design-tokens.md` not `design_tokens.md`
5. **Descriptive names**: Names should clearly indicate content
6. **No abbreviations**: Use full words (e.g., `guide` not `gde`)

## File Inventory

### Root Documentation

```
├── README.md                          # Project overview
├── quickstart.md                      # Quick start guide
├── storybook-setup.md                 # Storybook config and conventions
├── figma-component-guidelines.md     # Component building guidelines
├── icon-system.md                     # Icon system documentation
├── theming-guide.md                   # Theme usage guide
├── theme-implementation-summary.md    # Theme implementation details
└── design-tokens-summary.md           # Design token reference
```

### Storybook

```
.storybook/
├── main.ts                            # Storybook config
├── preview.ts                         # Global decorators, CSS imports
└── (optional) preview-head.html, manager.ts

src/components/Button/
├── Button.tsx
├── Button.css
├── Button.types.ts
├── Button.stories.tsx                 # Storybook stories
├── Button.mdx                         # Optional: rich docs
└── README.md                          # Component docs (optional if using MDX)
```

### Module Documentation

```
src/
├── tokens/
│   └── README.md                      # Token system documentation
├── icons/
│   └── README.md                      # Icon system documentation
└── components/
    ├── Button/
    │   └── README.md                  # Button component docs
    └── KPI/
        └── README.md                  # KPI component docs
```

## When to Create New Documentation

### Root-Level Docs (lowercase-with-dashes.md)

Create for:

- Architecture guides
- System-wide concepts
- Implementation summaries
- Developer guidelines
- Project-level guides

### Module Docs (README.md)

Create for:

- Component documentation
- Module API reference
- Usage examples
- Props documentation

## Naming Examples

### Good ✓

- `accessibility-guide.md`
- `contributing-guidelines.md`
- `testing-strategy.md`
- `deployment-guide.md`
- `api-reference.md`

### Bad ✗

- `ACCESSIBILITY-GUIDE.md` (should be lowercase)
- `contributing_guidelines.md` (use hyphens, not underscores)
- `test-strat.md` (no abbreviations)
- `AccessibilityGuide.md` (should be lowercase with hyphens)
