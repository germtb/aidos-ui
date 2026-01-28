# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run build:lib    # Build the library to dist/ (rimraf + tsc)
npm run dev          # Start Next.js dev server for documentation site
npm run build        # Build the Next.js documentation site
npm run lint         # Run Next.js linting
npm run tsc          # Watch mode TypeScript compilation
```

No test framework is configured.

## Architecture

Aidos-UI is a zero-dependency React component library with a custom CSS-in-JS styling system.

### Core Styling System (src/jss.tsx)

The library uses a custom JSS (JavaScript Styles) system:

- **`jss` prop**: All components accept a `jss` prop for inline styles
- **`toClassnames(jss)`**: Converts style objects to hashed class names (e.g., `x1a2b3c`)
- **Automatic pixel conversion**: Numeric values become pixels for dimension properties
- **CSS variable theming**: Colors and spacing use CSS custom properties (`--primary-text`, `--spacing-m`)

```tsx
// Style objects, arrays, and conditionals are supported
<Box jss={[baseStyles, isActive && activeStyles, { padding: 16 }]} />
```

**Responsive helpers**: `mobile()`, `tablet()`, `laptop()`, `desktop()` wrap styles in media queries.

### Component Hierarchy

Components follow a three-layer pattern:

1. **Base layer** (`BaseView`, `BaseButton`, `BaseInput`, `BaseLink`): Minimal wrappers that apply `jss` prop
2. **Semantic layer** (`Button`, `TextInput`, `Link`): Add themed styling and semantic props (`color`, `size`, `padding`)
3. **Composed layer** (`IconButton`, `TextPairing`, `Sublist`): Combine lower-level components

### Key Files

- **src/jss.tsx**: Styling system, theme definitions, CSS variable injection
- **src/Providers.tsx**: Root provider that wraps app with theme and context
- **src/Interactable.tsx**: Shared styling logic for buttons/links (colors, hover states)
- **src/DarkMode.tsx**: Dark mode context and toggle, persists to cookie
- **src/Dialog.tsx**: Modal dialog provider with `useDialog()` hook
- **src/useNavigation.tsx**: Arrow key navigation hook for lists

### Theming

Two built-in themes (`lightTheme`, `darkTheme`) define CSS variables for:
- Colors: `--primary-text`, `--secondary-background`, `--background-button-positive`, etc.
- Spacing: `--spacing-xs` through `--spacing-xxxl`
- Typography: `--font-xsmall` through `--font-xxxlarge`
- Border radii: `--border-radius-s`, `--border-radius-m`, `--border-radius-l`

Dark mode is toggled via `dark-mode` class on `<body>`.

### SSR Support

- `JSServerStyles` component collects styles during server render
- `isServer()` utility detects server environment
- `useCookie()` handles hydration timing

## Output

The library builds to `dist/` as ES modules. Each component produces `.js`, `.js.map`, and `.d.ts` files in a flat structure.
