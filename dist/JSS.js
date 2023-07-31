import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { useRef } from "react";
import { hash } from "./hash";
const aliases = {
  margin: (value) => {
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
  padding: (value) => {
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
const rawHashMap = new Map();
function createStyleNode(content) {
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
const toPixelValue = (key, value) => {
  const sValue = value.toString();
  if (
    sValue.includes("%") ||
    sValue.includes("v") ||
    sValue.includes("px") ||
    sValue.includes("em") ||
    sValue.includes("rem")
  ) {
    return sValue;
  }
  return pixelStyles.has(key) && Number.isInteger(parseInt(value, 10))
    ? `${value}px`
    : value;
};
const getCSS = (key, value) => {
  const cssProp = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  const cssValue = toPixelValue(cssProp, value);
  return [cssProp, cssValue];
};
const flattenJSStyle = (jsStyle) => {
  if (!jsStyle) {
    return {};
  } else if (Array.isArray(jsStyle)) {
    // @ts-ignore
    return jsStyle.reduce((acc, jsStyle) => {
      return { ...acc, ...flattenJSStyle(jsStyle) };
    }, {});
  } else {
    return jsStyle;
  }
};
export const jss = (jsStyle) => {
  jsStyle = flattenJSStyle(jsStyle);
  const stylesStack = Object.entries(jsStyle);
  const classNames = [];
  while (stylesStack.length) {
    const [key, value] = stylesStack.pop();
    if (aliases[key]) {
      stylesStack.push(...aliases[key](value));
      continue;
    }
    const rawHash = hash(key + JSON.stringify(value)).toString(32);
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
export function JSStylesProvider({ themes, children }) {
  const stylesRef = useRef(null);
  if (stylesRef.current == null) {
    stylesRef.current = getBaseStyles(themes);
  }
  return _jsxs(_Fragment, {
    children: [
      stylesRef.current.map((style, i) =>
        _jsx("style", { dangerouslySetInnerHTML: { __html: style } }, i)
      ),
      children,
    ],
  });
}
export function JSServerStyles() {
  const stylesRef = useRef(null);
  if (stylesRef.current == null) {
    stylesRef.current = serverStyles;
  }
  return _jsx(_Fragment, {
    children: stylesRef.current.map((style, i) =>
      _jsx("style", { dangerouslySetInnerHTML: { __html: style } }, i)
    ),
  });
}
export function cssVar(string) {
  return `var(${string})`;
}
const sizes = {
  xsmall: cssVar("--spacing-xs"),
  small: cssVar("--spacing-s"),
  medium: cssVar("--spacing-m"),
  large: cssVar("--spacing-l"),
  xlarge: cssVar("--spacing-xl"),
};
export function getSize(size) {
  return sizes[size];
}
export function getSpacing(spacing) {
  if (spacing === "none") {
    return "0px";
  } else {
    return getSize(spacing);
  }
}
export function getPadding(padding) {
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
export function getMargin(margin) {
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
export const lightTheme = {
  /* Background */
  ["--overlay-background"]: "rgb(245, 246, 250)",
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
export const darkTheme = {
  /* Background */
  ["--overlay-background"]: "rgb(192, 33, 34)",
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
  ["--light-highlight"]: "rgba(49, 57, 63)",
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
  border: none;
  touch-action: manipulation;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*:focus {
  outline-color: ${cssVar("--highlight")};
}

html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: ${cssVar("--primary-background")};
}

`;
const backgroundStyles = {
  highlight: {
    backgroundColor: cssVar("--highlight"),
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
export const getBackground = (color) => {
  return backgroundStyles[color];
};
export const MOBILE = 750;
export const TABLET = 1000;
export const LAPTOP = 1200;
export const MOBILE_MEDIA = `@media (min-width: 0px) and (max-width: ${MOBILE}px)`;
export const TABLET_MEDIA = `@media (min-width: ${MOBILE}px) and (max-width: ${TABLET}px)`;
export const LAPTOP_MEDIA = `@media (min-width: ${TABLET}px) and (max-width: ${LAPTOP}px)`;
export const DESKTOP_MEDIA = `@media (min-width: ${LAPTOP}px)`;
export function mobile(jsStyle) {
  return {
    [MOBILE_MEDIA]: jsStyle,
  };
}
export function tablet(jsStyle) {
  return {
    [TABLET_MEDIA]: jsStyle,
  };
}
export function laptop(jsStyle) {
  return {
    [LAPTOP_MEDIA]: jsStyle,
  };
}
export function desktop(jsStyle) {
  return {
    [DESKTOP_MEDIA]: jsStyle,
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
  inherit: {
    color: "inherit",
  },
};
export const getTextColor = (color) => {
  return textColorStyles[color];
};
export function getBaseStyles(themes) {
  const css = [];
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
//# sourceMappingURL=jss.js.map
