import CSS from "csstype";
import React, { useRef } from "react";

import { hash } from "./hash";
import { numberToBase } from "./numberToBase";

type StylesValueType = string | number | CSS.Properties<string | number>;

export type Styles = CSS.Properties<
  string | number | CSS.Properties<string | number>
>;

export type JSStyle =
  | Styles
  | null
  | false
  | undefined
  | { [key: string]: Styles }
  | Array<JSStyle>;

const aliases: {
  [alias: string]: (value: StylesValueType) => [string, StylesValueType][];
} = {
  margin: (value) => {
    return [
      ["margin-top", value],
      ["margin-bottom", value],
      ["margin-left", value],
      ["margin-right", value],
    ];
  },
  padding: (value) => {
    return [
      ["padding-top", value],
      ["padding-bottom", value],
      ["padding-left", value],
      ["padding-right", value],
    ];
  },
  border: (value) => {
    if (value === "none") {
      return [
        ["border-width", 0],
        ["border-style", "none"],
        ["border-color", "currentcolor"],
      ];
    } else if (typeof value === "string") {
      const matches = Array.from(value.matchAll(/(.+) (.+) (.+)$/g))[0];
      return [
        ["border-width", matches[1]],
        ["border-style", matches[2]],
        ["border-color", matches[3]],
      ];
    } else {
      throw new Error("Cannot parse the value assigned to 'border'");
    }
  },
};

const rawHashMap = new Map<string, string>();

function createStyleNode(content: string) {
  if (typeof window === "undefined") {
    serverStyles.push(content);
  } else {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
  }
}

const pixelStyles = new Set([
  "min-height",
  "height",
  "max-height",
  "min-width",
  "width",
  "max-width",
  "margin",
  "margin-top",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "padding",
  "padding-top",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "border-radius",
  "font-size",
  "top",
  "bottom",
  "left",
  "right",
  "outline-offset",
]);

const toPixelValue = (key: string, value): string => {
  const sValue = value.toString();

  if (sValue.includes("%") || sValue.includes("v") || sValue.includes("px")) {
    return sValue;
  }

  return pixelStyles.has(key) && Number.isInteger(parseInt(value, 10))
    ? `${value}px`
    : value;
};

const getCSS = (key: string, value): [string, string] => {
  const cssProp = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  const cssValue = toPixelValue(cssProp, value);
  return [cssProp, cssValue];
};

const flattenJSStyle = (jsStyle: JSStyle): Styles => {
  if (!jsStyle) {
    return {};
  } else if (Array.isArray(jsStyle)) {
    // @ts-ignore
    return jsStyle.reduce((acc: Styles, jsStyle: JSStyle) => {
      return { ...acc, ...flattenJSStyle(jsStyle) };
    }, {});
  } else {
    return jsStyle;
  }
};

export const jss = (jsStyle: JSStyle): string => {
  jsStyle = flattenJSStyle(jsStyle);

  const stylesStack = Object.entries(jsStyle);
  const classNames = [];

  while (stylesStack.length) {
    const [key, value] = stylesStack.pop();

    if (aliases[key]) {
      stylesStack.push(...aliases[key](value));
      continue;
    }

    const rawHash = hash(key + JSON.stringify(value));
    const cachedSelector = rawHashMap.get(rawHash);

    if (cachedSelector != null) {
      classNames.push(cachedSelector);
      continue;
    }

    // const selector = numberToBase(rawHashMap.size);
    const selector = `x${rawHash}`;
    rawHashMap.set(rawHash, selector);
    classNames.push(selector);

    if (typeof value === "number" || typeof value === "string") {
      const [cssProp, cssValue] = getCSS(key, value);
      createStyleNode(`.${selector} { ${cssProp}: ${cssValue}; }`);
    } else if (typeof value === "object" && key.startsWith("@media")) {
      const media = key;
      const cssValue = Object.entries(value)
        .map(([key, value]) => {
          const [cssProp, cssValue] = getCSS(key, value);
          return `${cssProp}: ${cssValue}; `;
        })
        .join(" ");
      createStyleNode(`${media} { .${selector} { ${cssValue} } }`);
    } else if (typeof value === "object") {
      const cssValue = Object.entries(value)
        .map(([key, value]) => {
          const [cssProp, cssValue] = getCSS(key, value);
          return `${cssProp}: ${cssValue}; `;
        })
        .join(" ");
      createStyleNode(`.${selector}${key} { ${cssValue} }`);
    }
  }

  return classNames.join(" ");
};

const serverStyles = [];

export function JSStyles({ getBaseStyles }: { getBaseStyles: () => string[] }) {
  const stylesRef = useRef<string[] | null>(null);

  if (stylesRef.current == null) {
    stylesRef.current = getBaseStyles().concat(serverStyles);
  }

  return (
    <>
      {stylesRef.current.map((style, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
    </>
  );
}

export type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";

export type Spacing = "none" | Size;

export type Gap = Spacing;

export type Padding = Spacing | [Spacing, Spacing];

export type Margin = Spacing | [Spacing, Spacing];

export type Direction = "horizontal" | "vertical";

export type Position = "start" | "end";

export type Justify =
  | "none"
  | "center"
  | "flex-start"
  | "space-between"
  | "flex-end"
  | "stretch";

export type Align = "none" | "center" | "stretch" | "flex-start" | "flex-end";

export type FlexDirection = "row" | "column";

export type Color =
  | "none"
  | "negative"
  | "warning"
  | "highlight"
  | "primary-background"
  | "secondary-background"
  | "divider"
  | "inherit";

export type TextColor =
  | "primary"
  | "secondary"
  | "highlight"
  | "negative"
  | "subtle"
  | "light"
  | "inherit";

export function cssVar(string: keyof Theme): string {
  return `var(${string})`;
}

const sizes: { [size in Size]: string } = {
  xsmall: cssVar("--spacing-xs"),
  small: cssVar("--spacing-s"),
  medium: cssVar("--spacing-m"),
  large: cssVar("--spacing-l"),
  xlarge: cssVar("--spacing-xl"),
};

export function getSize(size: Size): string {
  return sizes[size];
}

export function getSpacing(spacing: Spacing): string {
  if (spacing === "none") {
    return "0px";
  } else {
    return getSize(spacing);
  }
}

export function getPadding(padding: Padding): string {
  if (Array.isArray(padding)) {
    const [vertical, horizontal] = padding;
    return `${getSpacing(vertical)} ${getSpacing(horizontal)}`;
  } else {
    return getSpacing(padding);
  }
}

export type Theme = {
  /* Background */
  ["--primary-background"]: string;
  ["--secondary-background"]: string;
  ["--divider"]: string;
  ["--strong-divider"]: string;
  ["--pressed-background"]: string;
  ["--hovered-background"]: string;
  ["--selected-background"]: string;
  ["--nav-bar"]: string;
  /* Effects */
  ["--warning"]: string;
  ["--highlight"]: string;
  ["--outline"]: string;
  ["--light-highlight"]: string;
  /* Text */
  ["--primary-text"]: string;
  ["--secondary-text"]: string;
  ["--subtle-text"]: string;
  ["--highlight-text"]: string;
  ["--negative-text"]: string;
  ["--light-text"]: string;
  /* Buttons */
  ["--background-button-positive"]: string;
  ["--background-button-secondary"]: string;
  ["--background-button-negative"]: string;
  ["--background-button-disabled"]: string;
  /* Spacing */
  ["--spacing-xs"]: string;
  ["--spacing-s"]: string;
  ["--spacing-m"]: string;
  ["--spacing-l"]: string;
  ["--spacing-xl"]: string;
  ["--spacing-xxl"]: string;
  ["--spacing-xxxl"]: string;
  ["--border-radius-s"]: string;
  ["--border-radius-m"]: string;
  ["--border-radius-l"]: string;
  ["--nav-bar-height"]: string;
};

export const lightTheme: Theme = {
  /* Background */
  ["--primary-background"]: "rgb(239, 239, 244)",
  ["--secondary-background"]: "rgb(232, 232, 234)",
  ["--divider"]: "rgb(200, 200, 200)",
  ["--strong-divider"]: "rgb(100, 100, 100)",
  ["--pressed-background"]: "rgb(220, 222, 224)",
  ["--hovered-background"]: "rgb(232, 235, 237)",
  ["--selected-background"]: "rgb(227, 230, 232)",
  ["--nav-bar"]: "rgb(232, 232, 234)",
  /* Effects */
  ["--warning"]: "rgb(255, 204, 0)",
  ["--highlight"]: "rgb(0, 122, 255)",
  ["--outline"]: "rgb(103, 176, 255)",
  ["--light-highlight"]: "rgb(220, 232, 245)",
  /* Text */
  ["--primary-text"]: "rgb(0, 0, 0)",
  ["--secondary-text"]: "rgb(100, 100, 100)",
  ["--subtle-text"]: "rgb(180, 180, 180)",
  ["--highlight-text"]: "rgb(0, 122, 255)",
  ["--negative-text"]: "rgb(255, 59, 48)",
  ["--light-text"]: "rgb(255, 255, 255)",
  /* Buttons */
  ["--background-button-positive"]: "rgb(0, 122, 255)",
  ["--background-button-secondary"]: "rgb(218, 218, 223)",
  ["--background-button-negative"]: "rgb(255, 59, 48)",
  ["--background-button-disabled"]: "rgb(218, 218, 223)",
  /* Spacing */
  ["--spacing-xs"]: "0.125rem",
  ["--spacing-s"]: "0.25rem",
  ["--spacing-m"]: "0.5rem",
  ["--spacing-l"]: "0.75px",
  ["--spacing-xl"]: "1rem",
  ["--spacing-xxl"]: "1.5px",
  ["--spacing-xxxl"]: "2rem",
  ["--border-radius-s"]: "0.125rem",
  ["--border-radius-m"]: "0.25rem",
  ["--border-radius-l"]: "0.5rem",
  ["--nav-bar-height"]: "50px",
};

export const darkTheme: Theme = {
  /* Background */
  ["--primary-background"]: "rgb(42, 43, 46)",
  ["--secondary-background"]: "rgb(65, 66, 67)",
  ["--divider"]: "rgb(70, 72, 73)",
  ["--strong-divider"]: "rgb(100, 100, 100)",
  ["--pressed-background"]: "rgb(90, 92, 93)",
  ["--hovered-background"]: "rgb(50, 53, 54)",
  ["--selected-background"]: "rgb(65, 68, 69)",
  ["--nav-bar"]: "rgb(34, 35, 36)",
  /* Effects */
  ["--warning"]: "rgb(255, 204, 0)",
  ["--highlight"]: "rgb(50, 140, 220)",
  ["--outline"]: "rgb(91, 170, 255)",
  ["--light-highlight"]: "rgb(220, 232, 245)",
  /* Text */
  ["--primary-text"]: "rgb(255, 255, 255)",
  ["--secondary-text"]: "rgb(200, 200, 200)",
  ["--subtle-text"]: "rgb(140, 140, 140)",
  ["--highlight-text"]: "#4ca7f8",
  ["--negative-text"]: "rgb(255, 59, 48)",
  ["--light-text"]: "rgb(255, 255, 255)",
  /* Buttons */
  ["--background-button-positive"]: "rgb(50, 140, 220)",
  ["--background-button-secondary"]: "rgb(82, 83, 86)",
  ["--background-button-negative"]: "rgb(255, 59, 48)",
  ["--background-button-disabled"]: "rgb(70, 72, 73)",
  /* Spacing */
  ["--spacing-xs"]: "2px",
  ["--spacing-s"]: "4px",
  ["--spacing-m"]: "8px",
  ["--spacing-l"]: "12px",
  ["--spacing-xl"]: "16px",
  ["--spacing-xxl"]: "24px",
  ["--spacing-xxxl"]: "32px",
  ["--border-radius-s"]: "2px",
  ["--border-radius-m"]: "4px",
  ["--border-radius-l"]: "8px",
  ["--nav-bar-height"]: "50px",
};

export const baseStyles = `
* {
  box-sizing: border-box;
  padding: 0;
  border: none;
  touch-action: manipulation;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul, input, p, h1, h2, h3, h4 {
  margin: 0;
}

*:focus {
  outline-color: var(--highlight);
}

html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--primary-background);
}

ul,
ol,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

`;

const backgroundStyles = {
  highlight: {
    backgroundColor: "var(--highlight)",
  },
  warning: {
    backgroundColor: "var(--warning)",
  },
  "primary-background": {
    backgroundColor: "var(--primary-background)",
  },
  negative: {
    backgroundColor: "var(--negative-text)",
  },
  "secondary-background": {
    backgroundColor: "var(--secondary-background)",
  },
  divider: {
    backgroundColor: "var(--divider)",
  },
  inherit: {
    backgroundColor: "inherit",
  },
};

export const getBackground = (color: Color): JSStyle => {
  return backgroundStyles[color];
};

export const MOBILE = 750;
export const TABLET = 1000;
export const LAPTOP = 1200;

export const withMedia = (styles: {
  phone?: JSStyle;
  tablet?: JSStyle;
  laptop?: JSStyle;
  desktop?: JSStyle;
}): JSStyle => {
  const phone: { [key: string]: JSStyle } = styles.phone
    ? {
        [`@media (min-width: 0px) and (max-width: ${MOBILE}px)`]: styles.phone,
      }
    : {};
  const tablet: { [key: string]: JSStyle } = styles.tablet
    ? {
        [`@media (min-width: ${MOBILE}px) and (max-width: ${TABLET}px)`]:
          styles.tablet,
      }
    : {};
  const laptop: { [key: string]: JSStyle } = styles.laptop
    ? {
        [`@media (min-width: ${TABLET}px) and (max-width: ${LAPTOP}px)`]:
          styles.laptop,
      }
    : {};
  const desktop: { [key: string]: JSStyle } = styles.desktop
    ? { [`@media (min-width: ${LAPTOP}px)`]: styles.desktop }
    : {};

  return {
    ...phone,
    ...tablet,
    ...laptop,
    ...desktop,
  };
};

const textColorStyles = {
  primary: {
    color: "var(--primary-text)",
  },
  secondary: {
    color: "var(--secondary-text)",
  },
  highlight: {
    color: "var(--highlight-text)",
  },
  negative: {
    color: "var(--negative-text)",
  },
  subtle: {
    color: "var(--subtle-text)",
  },
  light: {
    color: "var(--light-text)",
  },
  inherit: {
    color: "inherit",
  },
};

export const getTextColor = (color: TextColor) => {
  return textColorStyles[color];
};

export function getBaseStyles(): string[] {
  const css: string[] = [];

  css.push(baseStyles);

  css.push(`body {
      color-scheme: light;
      ${Object.entries(lightTheme)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n   ")}
    }`);

  css.push(`body.dark-mode {
      color-scheme: dark;
      ${Object.entries(darkTheme)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n    ")}
    }`);

  return css;
}
