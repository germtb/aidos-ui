import CSS from "csstype";
import React, { useState } from "react";

import { hash } from "./hash";
import { isServer } from "./isServer";

type StylesValueType = string | number | CSS.Properties<string | number>;

export type Styles = CSS.Properties<
  string | number | CSS.Properties<string | number>
>;

export type JSS =
  Styles | null | false | undefined | { [key: string]: Styles } | Array<JSS>;

const aliases: {
  [alias: string]: (value: StylesValueType) => [string, StylesValueType][];
} = {
  margin: (value: string) => {
    if (value == null) {
      return [];
    }

    const matches =
      typeof value === "string"
        ? Array.from(value.matchAll(/(.+) (.+)$/g))[0]
        : null;
    if (matches) {
      return [
        ["margin-top", matches[1]],
        ["margin-bottom", matches[1]],
        ["margin-left", matches[2]],
        ["margin-right", matches[2]],
      ];
    } else {
      return [
        ["margin-top", value],
        ["margin-bottom", value],
        ["margin-left", value],
        ["margin-right", value],
      ];
    }
  },
  padding: (value: string) => {
    if (value == null) {
      return [];
    }

    const matches =
      typeof value === "string"
        ? Array.from(value.matchAll(/(.+) (.+)$/g))[0]
        : null;

    if (matches) {
      return [
        ["padding-top", matches[1]],
        ["padding-bottom", matches[1]],
        ["padding-left", matches[2]],
        ["padding-right", matches[2]],
      ];
    } else {
      return [
        ["padding-top", value],
        ["padding-bottom", value],
        ["padding-left", value],
        ["padding-right", value],
      ];
    }
  },
};

const rawHashMap = new Map<string, { selector: string; key: string }>();

function createStyleNode(content: string) {
  if (isServer()) {
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
  "gap",
  "row-gap",
  "column-gap",
]);

const toPixelValue = (key: string, value): string => {
  const stringValue = value.toString();
  const unitlessNumber = /^-?(?:\d+|\d*\.\d+)$/.test(stringValue.trim());

  return pixelStyles.has(key) && unitlessNumber
    ? `${stringValue}px`
    : stringValue;
};

const getCSS = (key: string, value): [string, string] => {
  const cssProp = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  const cssValue = toPixelValue(cssProp, value);
  return [cssProp, cssValue];
};

const flattenJSS = (jss: JSS): Styles => {
  if (!jss) {
    return {};
  } else if (Array.isArray(jss)) {
    const result: Styles = {};
    for (const item of jss) {
      const styles = flattenJSS(item);
      for (const [key, value] of Object.entries(styles)) {
        const current = result[key];
        if (
          typeof current === "object" &&
          current != null &&
          typeof value === "object" &&
          value != null
        ) {
          result[key] = { ...current, ...value };
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  } else {
    return jss;
  }
};

export const toClassnames = (jss: JSS, componentName?: string): string => {
  jss = flattenJSS(jss);

  const stylesStack = Object.entries(jss);
  const classNames: string[] = [];

  if (componentName) {
    classNames.push(componentName);
  }

  while (stylesStack.length) {
    const [key, value] = stylesStack.pop();

    if (aliases[key]) {
      stylesStack.push(...aliases[key](value));
      continue;
    }

    const inputKey =
      (key.startsWith("@media") ? "specific:" : "") +
      key +
      JSON.stringify(value);
    const rawHash = hash(inputKey).toString(32);
    const cached = rawHashMap.get(rawHash);

    if (cached != null) {
      if (cached.key !== inputKey) {
        console.warn(
          `[jss] Hash collision detected: "${inputKey}" collides with "${cached.key}"`,
        );
      }
      classNames.push(cached.selector);
      continue;
    }

    const selector = `x${rawHash}`;
    rawHashMap.set(rawHash, { selector, key: inputKey });
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
      createStyleNode(`${media} { .${selector}.${selector} { ${cssValue} } }`);
    } else if (typeof value === "object" && value != null) {
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

export function JSSProvider({
  themes,
  children,
}: {
  themes: { dark: Theme; light: Theme };
  children: React.JSX.Element;
}) {
  const [styles] = useState(() => getBaseStyles(themes));

  return (
    <>
      {styles.map((style, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
      {children}
    </>
  );
}

export function JSServerStyles() {
  const [styles] = useState(() => serverStyles);

  return (
    <>
      {styles.map((style, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
    </>
  );
}

export type Size =
  "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge";

export type Spacing = "none" | Size;

export type Gap = Spacing;

export type Padding = Spacing | [Spacing, Spacing];

export type Margin = Spacing | [Spacing, Spacing];

export type Material = "aurora" | "dawn" | "mist" | "twilight";

export type Direction = "horizontal" | "vertical";

export type Position = "start" | "end";

export type Justify =
  "none" | "center" | "flex-start" | "space-between" | "flex-end" | "stretch";

export type Align = "none" | "center" | "stretch" | "flex-start" | "flex-end";

export type FlexDirection = "row" | "column";

export type Color =
  | "none"
  | "light"
  | "dark"
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
  | "inverse"
  | "inherit";

export function cssVar(string: keyof Theme): string {
  return `var(${string})`;
}

export function getMaterial(material: Material): Styles {
  switch (material) {
    case "aurora":
      return {
        background: cssVar("--material-aurora"),
        backdropFilter: "blur(20px) saturate(115%)",
      };
    case "dawn":
      return {
        background: cssVar("--material-dawn"),
        backdropFilter: "blur(20px) saturate(115%)",
      };
    case "mist":
      return {
        background: cssVar("--material-mist"),
        backdropFilter: "blur(24px) saturate(90%)",
      };
    case "twilight":
      return {
        background: cssVar("--material-twilight"),
        backdropFilter: "blur(20px) saturate(115%)",
      };
  }
}

const sizes: { [size in Size]: string } = {
  xsmall: cssVar("--spacing-xs"),
  small: cssVar("--spacing-s"),
  medium: cssVar("--spacing-m"),
  large: cssVar("--spacing-l"),
  xlarge: cssVar("--spacing-xl"),
  xxlarge: cssVar("--spacing-xxl"),
  xxxlarge: cssVar("--spacing-xxxl"),
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

export function getPadding(padding: Padding): JSS {
  if (Array.isArray(padding)) {
    const [vertical, horizontal] = padding;
    return {
      paddingTop: getSpacing(vertical),
      paddingBottom: getSpacing(vertical),
      paddingLeft: getSpacing(horizontal),
      paddingRight: getSpacing(horizontal),
    };
  } else {
    return {
      padding: getSpacing(padding),
    };
  }
}

export function getMargin(margin: Margin): JSS {
  if (Array.isArray(margin)) {
    const [vertical, horizontal] = margin;
    return {
      marginTop: getSpacing(vertical),
      marginBottom: getSpacing(vertical),
      marginLeft: getSpacing(horizontal),
      marginRight: getSpacing(horizontal),
    };
  } else {
    return {
      margin: getSpacing(margin),
    };
  }
}

export type Theme = {
  /* Background */
  ["--overlay-background"]: string;
  ["--primary-background"]: string;
  ["--secondary-background"]: string;
  ["--divider"]: string;
  ["--strong-divider"]: string;
  ["--pressed-background"]: string;
  ["--hovered-background"]: string;
  ["--selected-background"]: string;
  ["--nav-bar"]: string;
  ["--material-aurora"]: string;
  ["--material-dawn"]: string;
  ["--material-mist"]: string;
  ["--material-twilight"]: string;
  /* Effects */
  ["--warning"]: string;
  ["--highlight"]: string;
  ["--outline"]: string;
  ["--light-highlight"]: string;
  ["--light-highlight-hovered"]: string;
  ["--light-highlight-pressed"]: string;
  /* Text */
  ["--primary-text"]: string;
  ["--secondary-text"]: string;
  ["--subtle-text"]: string;
  ["--highlight-text"]: string;
  ["--negative-text"]: string;
  ["--light-text"]: string;
  ["--inverse-text"]: string;

  ["--font-xsmall"]: string;
  ["--font-small"]: string;
  ["--font-medium"]: string;
  ["--font-large"]: string;
  ["--font-xlarge"]: string;
  ["--font-xxlarge"]: string;
  ["--font-xxxlarge"]: string;

  /* Buttons */
  ["--background-button-primary"]: string;
  ["--background-button-secondary"]: string;
  ["--background-button-negative"]: string;
  ["--background-button-inverse"]: string;
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
  ["--border-radius-xl"]: string;
  ["--nav-bar-height"]: string;
  /* Shadows */
  ["--shadow-sm"]: string;
  ["--shadow-md"]: string;
  ["--shadow-lg"]: string;
  /* Transitions */
  ["--transition-fast"]: string;
  ["--transition-normal"]: string;
};

export const lightTheme: Theme = {
  /* Background */
  ["--overlay-background"]: "rgb(255, 255, 255)",
  ["--primary-background"]: "rgb(247, 248, 251)",
  ["--secondary-background"]: "rgb(240, 242, 246)",
  ["--divider"]: "rgb(216, 219, 226)",
  ["--strong-divider"]: "rgb(100, 100, 100)",
  ["--pressed-background"]: "rgb(224, 227, 234)",
  ["--hovered-background"]: "rgb(235, 238, 244)",
  ["--selected-background"]: "rgb(228, 232, 240)",
  ["--nav-bar"]: "rgb(242, 244, 248)",
  ["--material-aurora"]:
    "radial-gradient(120% 90% at 0% 10%, rgba(66, 184, 131, 0.04), transparent 58%), radial-gradient(110% 100% at 100% 90%, rgba(70, 132, 255, 0.055), transparent 62%), linear-gradient(145deg, rgba(248, 249, 252, 0.96), rgba(236, 240, 245, 0.92))",
  ["--material-dawn"]:
    "radial-gradient(110% 90% at 10% 100%, rgba(255, 162, 105, 0.13), transparent 60%), radial-gradient(100% 85% at 90% 0%, rgba(120, 166, 255, 0.09), transparent 60%), linear-gradient(145deg, rgba(252, 248, 246, 0.96), rgba(244, 238, 242, 0.92))",
  ["--material-mist"]:
    "radial-gradient(120% 100% at 50% 0%, rgba(255, 255, 255, 0.55), transparent 65%), linear-gradient(145deg, rgba(247, 248, 250, 0.82), rgba(235, 237, 241, 0.78))",
  ["--material-twilight"]:
    "radial-gradient(115% 95% at 0% 10%, rgba(103, 91, 214, 0.1), transparent 60%), radial-gradient(110% 90% at 100% 100%, rgba(196, 105, 151, 0.07), transparent 62%), linear-gradient(145deg, rgba(243, 242, 249, 0.97), rgba(229, 231, 241, 0.93))",
  /* Effects */
  ["--warning"]: "rgb(255, 204, 0)",
  ["--highlight"]: "rgb(0, 122, 255)",
  ["--outline"]: "rgb(103, 176, 255)",
  ["--light-highlight"]: "rgb(220, 232, 245)",
  ["--light-highlight-hovered"]: "rgb(209, 226, 244)",
  ["--light-highlight-pressed"]: "rgb(197, 218, 240)",
  /* Text */
  ["--primary-text"]: "rgb(0, 0, 0)",
  ["--secondary-text"]: "rgb(100, 100, 100)",
  ["--subtle-text"]: "rgb(180, 180, 180)",
  ["--highlight-text"]: "rgb(0, 122, 255)",
  ["--negative-text"]: "rgb(255, 59, 48)",
  ["--light-text"]: "rgb(255, 255, 255)",
  ["--inverse-text"]: "rgb(255, 255, 255)",
  ["--font-xsmall"]: "10px",
  ["--font-small"]: "12px",
  ["--font-medium"]: "14px",
  ["--font-large"]: "18px",
  ["--font-xlarge"]: "22px",
  ["--font-xxlarge"]: "28px",
  ["--font-xxxlarge"]: "36px",
  /* Buttons */
  ["--background-button-primary"]: "rgb(0, 122, 255)",
  ["--background-button-secondary"]: "rgb(218, 218, 223)",
  ["--background-button-negative"]: "rgb(255, 59, 48)",
  ["--background-button-inverse"]: "rgb(0, 0, 0)",
  ["--background-button-disabled"]: "rgb(218, 218, 223)",
  /* Spacing */
  ["--spacing-xs"]: "2px",
  ["--spacing-s"]: "4px",
  ["--spacing-m"]: "8px",
  ["--spacing-l"]: "12px",
  ["--spacing-xl"]: "16px",
  ["--spacing-xxl"]: "24px",
  ["--spacing-xxxl"]: "32px",
  ["--border-radius-s"]: "4px",
  ["--border-radius-m"]: "8px",
  ["--border-radius-l"]: "12px",
  ["--border-radius-xl"]: "16px",
  ["--nav-bar-height"]: "50px",
  /* Shadows */
  ["--shadow-sm"]:
    "0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
  ["--shadow-md"]:
    "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)",
  ["--shadow-lg"]:
    "0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)",
  /* Transitions */
  ["--transition-fast"]: "0.15s ease",
  ["--transition-normal"]: "0.2s ease",
};

export const darkTheme: Theme = {
  /* Background */
  ["--overlay-background"]: "rgb(42, 45, 52)",
  ["--primary-background"]: "rgb(34, 36, 42)",
  ["--secondary-background"]: "rgb(47, 50, 58)",
  ["--divider"]: "rgb(61, 65, 75)",
  ["--strong-divider"]: "rgb(100, 100, 100)",
  ["--pressed-background"]: "rgb(70, 75, 86)",
  ["--hovered-background"]: "rgb(48, 52, 61)",
  ["--selected-background"]: "rgb(56, 61, 72)",
  ["--nav-bar"]: "rgb(29, 31, 37)",
  ["--material-aurora"]:
    "radial-gradient(120% 90% at 0% 10%, rgba(45, 160, 112, 0.065), transparent 58%), radial-gradient(110% 100% at 100% 90%, rgba(66, 126, 245, 0.08), transparent 62%), linear-gradient(145deg, rgba(39, 41, 43, 0.96), rgba(27, 30, 33, 0.94))",
  ["--material-dawn"]:
    "radial-gradient(110% 90% at 10% 100%, rgba(255, 139, 92, 0.095), transparent 60%), radial-gradient(100% 85% at 90% 0%, rgba(104, 145, 235, 0.08), transparent 60%), linear-gradient(145deg, rgba(43, 38, 39, 0.96), rgba(30, 30, 36, 0.94))",
  ["--material-mist"]:
    "radial-gradient(120% 100% at 50% 0%, rgba(255, 255, 255, 0.025), transparent 65%), linear-gradient(145deg, rgba(48, 50, 53, 0.82), rgba(30, 32, 35, 0.8))",
  ["--material-twilight"]:
    "radial-gradient(115% 95% at 0% 10%, rgba(103, 91, 214, 0.13), transparent 60%), radial-gradient(110% 90% at 100% 100%, rgba(196, 105, 151, 0.065), transparent 62%), linear-gradient(145deg, rgba(35, 34, 47, 0.97), rgba(24, 27, 38, 0.94))",
  /* Effects */
  ["--warning"]: "rgb(255, 204, 0)",
  ["--highlight"]: "rgb(50, 140, 220)",
  ["--outline"]: "rgb(91, 170, 255)",
  ["--light-highlight"]: "rgba(49, 57, 63)",
  ["--light-highlight-hovered"]: "rgb(54, 68, 80)",
  ["--light-highlight-pressed"]: "rgb(60, 78, 96)",
  /* Text */
  ["--primary-text"]: "rgb(255, 255, 255)",
  ["--secondary-text"]: "rgb(200, 200, 200)",
  ["--subtle-text"]: "rgb(140, 140, 140)",
  ["--highlight-text"]: "#4ca7f8",
  ["--negative-text"]: "rgb(255, 59, 48)",
  ["--light-text"]: "rgb(255, 255, 255)",
  ["--inverse-text"]: "rgb(0, 0, 0)",
  ["--font-xsmall"]: "10px",
  ["--font-small"]: "12px",
  ["--font-medium"]: "14px",
  ["--font-large"]: "18px",
  ["--font-xlarge"]: "22px",
  ["--font-xxlarge"]: "28px",
  ["--font-xxxlarge"]: "36px",
  /* Buttons */
  ["--background-button-primary"]: "rgb(50, 140, 220)",
  ["--background-button-secondary"]: "rgb(82, 83, 86)",
  ["--background-button-negative"]: "rgb(255, 59, 48)",
  ["--background-button-inverse"]: "rgb(255, 255, 255)",
  ["--background-button-disabled"]: "rgb(70, 72, 73)",
  /* Spacing */
  ["--spacing-xs"]: "2px",
  ["--spacing-s"]: "4px",
  ["--spacing-m"]: "8px",
  ["--spacing-l"]: "12px",
  ["--spacing-xl"]: "16px",
  ["--spacing-xxl"]: "24px",
  ["--spacing-xxxl"]: "32px",
  ["--border-radius-s"]: "4px",
  ["--border-radius-m"]: "8px",
  ["--border-radius-l"]: "12px",
  ["--border-radius-xl"]: "16px",
  ["--nav-bar-height"]: "50px",
  /* Shadows - stronger for dark mode to be visible */
  ["--shadow-sm"]: "0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)",
  ["--shadow-md"]:
    "0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.2)",
  ["--shadow-lg"]:
    "0 10px 25px rgba(0, 0, 0, 0.35), 0 4px 10px rgba(0, 0, 0, 0.25)",
  /* Transitions */
  ["--transition-fast"]: "0.15s ease",
  ["--transition-normal"]: "0.2s ease",
};

export const baseStyles = `
* {
  box-sizing: border-box;
  border: none;
  touch-action: manipulation;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*:focus {
  outline-color: ${cssVar("--highlight")};
}

button,
input,
textarea,
select {
  font: inherit;
}

html {
  margin: 0;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${cssVar("--primary-background")};
}

body {
  margin: 0;
  min-height: 100%;
  width: 100%;
  overflow: visible;
  background-color: ${cssVar("--primary-background")};
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes backdropFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

`;

const backgroundStyles = {
  highlight: {
    backgroundColor: cssVar("--highlight"),
  },
  light: {
    backgroundColor: cssVar("--light-text"),
  },
  dark: {
    backgroundColor: cssVar("--primary-text"),
  },
  warning: {
    backgroundColor: cssVar("--warning"),
  },
  "primary-background": {
    backgroundColor: cssVar("--primary-background"),
  },
  negative: {
    backgroundColor: cssVar("--negative-text"),
  },
  "secondary-background": {
    backgroundColor: cssVar("--secondary-background"),
  },
  divider: {
    backgroundColor: cssVar("--divider"),
  },
  inherit: {
    backgroundColor: "inherit",
  },
};

const colorValues: { [color in Color]: string } = {
  none: "transparent",
  highlight: cssVar("--highlight"),
  light: cssVar("--light-text"),
  dark: cssVar("--primary-text"),
  warning: cssVar("--warning"),
  "primary-background": cssVar("--primary-background"),
  negative: cssVar("--negative-text"),
  "secondary-background": cssVar("--secondary-background"),
  divider: cssVar("--divider"),
  inherit: "currentColor",
};

export const getColorValue = (color: Color): string => colorValues[color];

export const getBackground = (color: Color): JSS => {
  return backgroundStyles[color];
};

export const MOBILE = 750;
export const TABLET = 1000;
export const LAPTOP = 1200;

export const MOBILE_MEDIA = `@media (min-width: 0px) and (max-width: ${MOBILE}px)`;
export const TABLET_MEDIA = `@media (min-width: ${MOBILE}px) and (max-width: ${TABLET}px)`;
export const LAPTOP_MEDIA = `@media (min-width: ${TABLET}px) and (max-width: ${LAPTOP}px)`;
export const DESKTOP_MEDIA = `@media (min-width: ${LAPTOP}px)`;

export function mobile(jss: JSS): { [key: string]: JSS } {
  return {
    [MOBILE_MEDIA]: jss,
  };
}

export function tablet(jss: JSS): { [key: string]: JSS } {
  return {
    [TABLET_MEDIA]: jss,
  };
}

export function laptop(jss: JSS): { [key: string]: JSS } {
  return {
    [LAPTOP_MEDIA]: jss,
  };
}

export function desktop(jss: JSS): { [key: string]: JSS } {
  return {
    [DESKTOP_MEDIA]: jss,
  };
}

const textColorStyles = {
  primary: {
    color: cssVar("--primary-text"),
  },
  secondary: {
    color: cssVar("--secondary-text"),
  },
  highlight: {
    color: cssVar("--highlight-text"),
  },
  negative: {
    color: cssVar("--negative-text"),
  },
  subtle: {
    color: cssVar("--subtle-text"),
  },
  light: {
    color: cssVar("--light-text"),
  },
  inverse: {
    color: cssVar("--inverse-text"),
  },
  inherit: {
    color: "inherit",
  },
};

export const getTextColor = (color: TextColor) => {
  return textColorStyles[color];
};

export function getBaseStyles(themes: { light: Theme; dark: Theme }): string[] {
  const css: string[] = [];

  css.push(baseStyles);

  css.push(`body {
      color-scheme: light;
      ${Object.entries(themes.light)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n   ")}
    }`);

  css.push(`body.dark-mode {
      color-scheme: dark;
      ${Object.entries(themes.dark)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n    ")}
    }`);

  return css;
}
