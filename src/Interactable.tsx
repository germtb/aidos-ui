import { JSS, Padding, TextColor, cssVar, getPadding } from "./jss";

export type InteractableColor =
  "primary" | "secondary" | "negative" | "inverse";

const styles = {
  root: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "filter 120ms ease, box-shadow 120ms ease",
    outlineColor: cssVar("--outline"),
    "[aria-disabled=true]": {
      color: cssVar("--secondary-text"),
      backgroundColor: cssVar("--background-button-secondary"),
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
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
    color === "primary" && styles.primary,
    color === "secondary" && styles.secondary,
    color === "negative" && styles.negative,
    color === "inverse" && styles.inverse,
    border && {
      border: `1px solid ${getCSSColor(color, disabled, bare)}`,
    },
    bare && styles.bare,
    disabled && styles.disabled,
    !bare && !disabled && { boxShadow: cssVar("--shadow-sm") },
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
      return bare ? "primary" : "secondary";
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
      return bare ? cssVar("--primary-text") : cssVar("--secondary-text");
    case "negative":
      return bare ? cssVar("--negative-text") : cssVar("--light-text");
    case "inverse":
      return bare ? cssVar("--primary-text") : cssVar("--inverse-text");
  }
};

export const getInteractableListItemJSS = ({
  selected,
}: {
  selected: boolean | undefined;
}) => {
  return [
    {
      overflow: "hidden",
      flexGrow: 1,
      borderRadius: cssVar("--border-radius-m"),
      textDecoration: "none",
      ":focus-visible": {
        outlineOffset: -2,
      },
      ":hover": {
        backgroundColor: cssVar("--hovered-background"),
      },
      ":active:hover": {
        backgroundColor: cssVar("--pressed-background"),
      },
      "[aria-disabled=true]": {
        backgroundColor: cssVar("--primary-background"),
      },
      "[aria-disabled=true]:active:hover": {
        backgroundColor: cssVar("--primary-background"),
      },
    },
    selected && {
      backgroundColor: cssVar("--light-highlight"),
      ":hover": {
        backgroundColor: cssVar("--light-highlight-hovered"),
      },
      ":active:hover": {
        backgroundColor: cssVar("--light-highlight-pressed"),
      },
    },
  ];
};
