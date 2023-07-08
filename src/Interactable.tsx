import { JSStyle, Padding, TextColor, getPadding } from "./jss";

export type InterctableColor = "positive" | "secondary" | "negative";

const jsStyles = {
  root: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.1s ease-in",
    outlineColor: "var(--outline)",
    "[aria-disabled=true]": {
      color: "var(--secondary-text)",
      backgroundColor: "var(--background-button-secondary)",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineOffset: -2,
    },
  },
  positive: {
    backgroundColor: "var(--background-button-positive)",
    "[aria-disabled=true]": {
      backgroundColor: "var(--background-button-disabled)",
    },
  },
  secondary: {
    backgroundColor: "var(--background-button-secondary)",
    "[aria-disabled=true]": {
      backgroundColor: "var(--background-button-disabled)",
    },
  },
  negative: {
    backgroundColor: "var(--background-button-negative)",
    "[aria-disabled=true]": {
      backgroundColor: "var(--background-button-disabled)",
    },
  },
  disabled: {
    cursor: "default",
  },
  bare: {
    backgroundColor: "inherit",
    outlineColor: "var(--outline)",
    "[aria-disabled=true]": {
      backgroundColor: "inherit",
    },
    "[aria-disabled=true]:hover": {
      backgroundColor: "inherit",
    },
  },
  opacityHover: {
    ":hover": {
      opacity: 0.8,
    },
    "[aria-disabled=true]:hover": {
      opacity: 1,
    },
  },
  colorHover: {},
};

export function getInteractableJSStyles({
  color,
  bare,
  disabled,
  animateInteraction,
  padding,
}: {
  color: InterctableColor;
  bare: boolean;
  disabled: boolean;
  animateInteraction: boolean;
  padding: Padding;
}): Array<JSStyle> {
  console.log({ padding, calculatedPadding: getPadding(padding) });
  return [
    jsStyles.root,
    color === "positive" && jsStyles.positive,
    color === "secondary" && jsStyles.secondary,
    color === "negative" && jsStyles.negative,
    bare && jsStyles.bare,
    disabled && jsStyles.disabled,
    !bare && jsStyles.opacityHover,
    animateInteraction &&
      !disabled && {
        position: "relative",
        ":active": {
          opacity: 0.95,
          top: 1,
        },
        "[aria-disabled=true]:active": {
          top: 0,
          opacity: 1,
        },
      },
    {
      padding: getPadding(padding),
    },
  ];
}

export const getGlyphColor = (
  color: InterctableColor,
  disabled: boolean | undefined,
  bare: boolean | undefined
): TextColor => {
  if (disabled) {
    return "subtle";
  }

  switch (color) {
    case "positive":
      return bare ? "highlight" : "light";
    case "negative":
      return bare ? "negative" : "light";
    case "secondary":
      return bare ? "primary" : "secondary";
  }
};
