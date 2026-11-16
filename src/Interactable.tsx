import {
  JSS,
  Padding,
  TextColor,
  cssVar,
  getPadding,
  getTextColor,
} from "./jss";

export type InteractableColor =
  "primary" | "secondary" | "negative" | "inverse";

const styles = {
  root: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition:
      "filter 120ms ease, box-shadow 120ms ease, background-color 120ms ease, border-color 120ms ease",
    outlineColor: cssVar("--outline"),
    "[aria-disabled=true]": {
      color: cssVar("--subtle-text"),
      backgroundColor: cssVar("--background-button-disabled"),
    },
    ":focus-visible": {
      outline: `2px solid ${cssVar("--outline")}`,
      outlineOffset: 2,
    },
  },
  primary: {
    backgroundColor: cssVar("--background-button-primary"),
    "[aria-disabled=true]": {
      backgroundColor: cssVar("--background-button-disabled"),
    },
  },
  secondary: {
    backgroundColor: cssVar("--background-button-secondary"),
    "[aria-disabled=true]": {
      backgroundColor: cssVar("--background-button-disabled"),
    },
  },
  secondarySurface: {
    border:
      "1px solid color-mix(in srgb, var(--primary-text) 18%, var(--background-button-secondary))",
    ":hover:not([aria-disabled=true])": {
      backgroundColor:
        "color-mix(in srgb, var(--primary-text) 4%, var(--background-button-secondary))",
      borderColor:
        "color-mix(in srgb, var(--primary-text) 28%, var(--background-button-secondary))",
      filter: "none",
    },
    ":active:hover:not([aria-disabled=true])": {
      backgroundColor:
        "color-mix(in srgb, var(--primary-text) 8%, var(--background-button-secondary))",
    },
    "[aria-disabled=true]": { borderColor: "transparent" },
  },
  negative: {
    backgroundColor: cssVar("--background-button-negative"),
    "[aria-disabled=true]": {
      backgroundColor: cssVar("--background-button-disabled"),
    },
  },
  inverse: {
    backgroundColor: cssVar("--background-button-inverse"),
    "[aria-disabled=true]": {
      backgroundColor: cssVar("--background-button-disabled"),
    },
  },
  disabled: {
    cursor: "default",
  },
  bare: {
    backgroundColor: "inherit",
    outlineColor: cssVar("--outline"),
    "[aria-disabled=true]": {
      backgroundColor: "inherit",
    },
    "[aria-disabled=true]:hover": {
      backgroundColor: "inherit",
    },
  },
  opacityHover: {
    ":hover": {
      opacity: 1,
      filter: "brightness(0.96)",
    },
    "[aria-disabled=true]:hover": {
      opacity: 1,
      filter: "none",
    },
  },
  colorHover: {},
};

export function getInteractableJSS({
  color,
  bare,
  disabled,
  animateInteraction,
  padding,
  border,
}: {
  color: InteractableColor;
  bare: boolean;
  disabled: boolean;
  animateInteraction: boolean;
  padding: Padding;
  border: boolean;
}): Array<JSS> {
  return [
    styles.root,
    getTextColor(getGlyphColor(color, disabled, bare)),
    color === "primary" && styles.primary,
    color === "secondary" && styles.secondary,
    color === "negative" && styles.negative,
    color === "inverse" && styles.inverse,
    color === "secondary" && !bare && styles.secondarySurface,
    border && {
      border: `1px solid ${getCSSColor(color, disabled, bare)}`,
    },
    bare && styles.bare,
    disabled && styles.disabled,
    !bare &&
      !disabled &&
      color !== "secondary" && { boxShadow: cssVar("--shadow-sm") },
    styles.opacityHover,
    animateInteraction &&
      !disabled && {
        position: "relative",
        ":active": {
          opacity: 1,
          top: 1,
        },
        "[aria-disabled=true]:active": {
          top: 0,
          opacity: 1,
        },
      },
    getPadding(padding),
  ];
}

export const getGlyphColor = (
  color: InteractableColor,
  disabled: boolean | undefined,
  bare: boolean | undefined,
): TextColor => {
  if (disabled) {
    return "subtle";
  }

  switch (color) {
    case "primary":
      return bare ? "highlight" : "light";
    case "secondary":
      return "primary";
    case "negative":
      return bare ? "negative" : "light";
    case "inverse":
      return bare ? "primary" : "inverse";
  }
};

export const getCSSColor = (
  color: InteractableColor,
  disabled: boolean | undefined,
  bare: boolean | undefined,
): string => {
  if (disabled) {
    return cssVar("--subtle-text");
  }

  switch (color) {
    case "primary":
      return bare ? cssVar("--highlight") : cssVar("--light-text");
    case "secondary":
      return cssVar("--primary-text");
    case "negative":
      return bare ? cssVar("--negative-text") : cssVar("--light-text");
    case "inverse":
      return bare ? cssVar("--primary-text") : cssVar("--inverse-text");
  }
};

export const getInteractableListItemJSS = ({
  selected,
  disabled = false,
  primarySelector,
}: {
  selected: boolean | undefined;
  disabled?: boolean;
  primarySelector?: string;
}) => {
  const stateSelector = (state: string) =>
    primarySelector ? `:has(${primarySelector}${state})` : state;
  const hoverSelector = stateSelector(":hover");
  const pressedSelector = stateSelector(":active:hover");
  const focusSelector = stateSelector(":focus-visible");

  let stateJSS: JSS;
  if (disabled) {
    stateJSS = {
      backgroundColor: cssVar("--primary-background"),
    };
  } else if (selected) {
    stateJSS = {
      backgroundColor: cssVar("--light-highlight"),
      [hoverSelector]: {
        backgroundColor: cssVar("--light-highlight-hovered"),
      },
      [pressedSelector]: {
        backgroundColor: cssVar("--light-highlight-pressed"),
      },
    };
  } else {
    stateJSS = {
      [hoverSelector]: {
        backgroundColor: cssVar("--hovered-background"),
      },
      [pressedSelector]: {
        backgroundColor: cssVar("--pressed-background"),
      },
    };
  }

  return [
    {
      ...(!primarySelector && {
        overflow: "hidden",
        flexGrow: 1,
        textDecoration: "none",
      }),
      borderRadius: cssVar("--border-radius-m"),
      outlineColor: cssVar("--outline"),
      [focusSelector]: primarySelector
        ? {
            outlineWidth: "2px",
            outlineStyle: "solid",
            outlineOffset: -2,
          }
        : {
            outlineOffset: -2,
          },
      ...(!primarySelector && {
        "[aria-disabled=true]": {
          backgroundColor: cssVar("--primary-background"),
        },
        "[aria-disabled=true]:active:hover": {
          backgroundColor: cssVar("--primary-background"),
        },
      }),
    },
    stateJSS,
  ];
};

export const interactableListItemContentJSS: JSS = {
  overflow: "hidden",
  flexGrow: 1,
  color: "inherit",
  textDecoration: "none",
  ":focus-visible": {
    outline: "none",
  },
  ":hover": {
    filter: "none",
  },
};
