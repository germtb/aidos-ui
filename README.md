# Aidos UI

An opinionated React component library. Zero dependencies. Dark mode. Keyboard navigation.

[Documentation](https://aidos-ui.vercel.app)

## Install

```bash
npm install aidos-ui
```

## Setup

```tsx
import { Providers, lightTheme, darkTheme } from 'aidos-ui/dist';

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
import { JSServerStyles } from 'aidos-ui/dist';

<Head>
  <JSServerStyles />
</Head>
```

## Components

**Layout**: `Row`, `Column`, `Box`, `Card`, `RootView`

**Text**: `Text`, `H1`-`H3`, `P`, `Label`, `TextPairing`

**Inputs**: `TextInput`, `TextArea`, `Select`, `Checkbox`, `RangeInput`, `DateInput`, `DatetimeInput`, `TimeInput`

**Buttons**: `Button`, `IconButton`, `Link`, `IconLink`

**Lists**: `List`, `ListItem`, `ListButtonItem`, `ListLinkItem`, `Sublist` (with arrow key navigation)

**Overlays**: `Dialog`, `Dropdown`, `Popover`, `Tooltip`

**Feedback**: `ProgressBar`, `ProgressCircle`, `Badge`

**Other**: `Tabs`, `Calendar`, `DatePicker`, `Icon`, `DarkMode`

## Styling

Components accept a `jss` prop for inline styles with automatic class generation:

```tsx
<Row jss={{ backgroundColor: 'red', padding: 16 }} gap="medium">
  <Button color="positive">Save</Button>
</Row>
```

Numeric values for dimensional properties (padding, margin, width, etc.) are automatically converted to pixels.

## Theming

Customize by passing your own theme objects to `Providers`. Themes define CSS variables for colors, spacing, typography, and border radii. See `lightTheme` and `darkTheme` in `jss.tsx` for the full schema.
