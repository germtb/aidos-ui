# Aidos UI

An opinionated React component library with dark mode, keyboard navigation, and Iconify-powered icons.

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

Aidos uses [Iconify](https://iconify.design/) for icons. By default, missing icons are loaded asynchronously from Iconify's CDN. This keeps Aidos small, but requires network access and may cause icons to appear shortly after the initial render.

For offline support and immediate rendering, install and register an icon set in your application:

```bash
npm install @iconify/react @iconify-json/fa
```

```tsx
import { addCollection } from "@iconify/react";
import faIcons from "@iconify-json/fa/icons.json";

// Call once during application initialization.
addCollection(faIcons);
```

Registering the collection bundles the icons with your application, so they no longer depend on Iconify's CDN. Other sets are available from the [Iconify icon sets directory](https://icon-sets.iconify.design/).

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
