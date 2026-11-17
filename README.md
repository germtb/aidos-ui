# Aidos UI

An opinionated React component library with dark mode, keyboard navigation, and self-contained Lucide icons.

[Documentation](https://aidos-ui.vercel.app)

## Install

```bash
npm install aidos-ui
```

## Setup

```tsx
import { Providers, lightTheme, darkTheme } from "aidos-ui";

function App() {
  return (
    <Providers themes={{ light: lightTheme, dark: darkTheme }}>
      <YourApp />
    </Providers>
  );
}
```

For Next.js SSR, add `JSServerStyles` to your `_document.tsx`:

```tsx
import { JSServerStyles } from "aidos-ui";

<Head>
  <JSServerStyles />
</Head>;
```

## Components

**Layout**: `Row`, `Column`, `Box`, `Card`, `RootView`

**Text**: `Text`, `H1`-`H3`, `P`, `Label`, `TextPairing`

**Inputs**: `TextInput`, `TextArea`, `Select`, `Checkbox`, `RangeInput`, `DateInput`, `DatetimeInput`, `TimeInput`

**Buttons**: `Button`, `IconButton`, `Link`, `IconLink`

**Lists**: `List`, `ListItem`, `ListButtonItem`, `ListLinkItem`, `Sublist` (with arrow key navigation)

**Overlays**: `Dialog`, `Dropdown`, `Popover`, `Tooltip`

**Feedback**: `ProgressBar`, `ProgressCircle`, `Badge`

**Other**: `Tabs`, `Calendar`, `DateInput`, `Icon`, `DarkMode`

## Icons

Icons load lazily from chunks bundled with your application. No icon CDN or additional runtime dependency is required.

Preload common icons before rendering; everything else stays lazy:

```ts
import "aidos-ui/icons/search";
import "aidos-ui/icons/check";
```

Or preload the entire catalog:

```ts
import "aidos-ui/icons";
```

- No registration call is needed. `<Icon>` props and icon names are unchanged.
- Use identical preload imports in the server and browser entry points to keep preloaded icons visible through hydration. Lazy icons retain matching placeholders until hydration completes.
- The full lazy catalog still ships with your build. Keep its chunks when deploying or packaging the application.
- Replace Iconify `addIcon` / `addCollection` preloads with these imports; Iconify's cache no longer controls Aidos icons.

## Styling

Components accept a `jss` prop for inline styles with automatic class generation:

```tsx
<Row jss={{ backgroundColor: "red", padding: 16 }} gap="medium">
  <Button color="positive">Save</Button>
</Row>
```

Numeric values for dimensional properties (padding, margin, width, etc.) are automatically converted to pixels.

## Theming

Customize by passing your own theme objects to `Providers`. Themes define CSS variables for colors, spacing, typography, and border radii. See `lightTheme` and `darkTheme` in `jss.tsx` for the full schema.
