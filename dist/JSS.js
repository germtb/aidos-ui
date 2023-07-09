import React, { useRef } from "react";
import { hash } from "./hash";
const aliases = {
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
        }
        else if (typeof value === "string") {
            const matches = Array.from(value.matchAll(/(.+) (.+) (.+)$/g))[0];
            return [
                ["border-width", matches[1]],
                ["border-style", matches[2]],
                ["border-color", matches[3]],
            ];
        }
        else {
            throw new Error("Cannot parse the value assigned to 'border'");
        }
    },
};
const rawHashMap = new Map();
function createStyleNode(content) {
    if (typeof window === "undefined") {
        serverStyles.push(content);
    }
    else {
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
    if (sValue.includes("%") || sValue.includes("v") || sValue.includes("px")) {
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
    }
    else if (Array.isArray(jsStyle)) {
        // @ts-ignore
        return jsStyle.reduce((acc, jsStyle) => {
            return { ...acc, ...flattenJSStyle(jsStyle) };
        }, {});
    }
    else {
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
        }
        else if (typeof value === "object" && key.startsWith("@media")) {
            const media = key;
            const cssValue = Object.entries(value)
                .map(([key, value]) => {
                const [cssProp, cssValue] = getCSS(key, value);
                return `${cssProp}: ${cssValue}; `;
            })
                .join(" ");
            createStyleNode(`${media} { .${selector} { ${cssValue} } }`);
        }
        else if (typeof value === "object") {
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
export function JSStyles({ getBaseStyles }) {
    const stylesRef = useRef(null);
    if (stylesRef.current == null) {
        stylesRef.current = getBaseStyles().concat(serverStyles);
    }
    return (React.createElement(React.Fragment, null, stylesRef.current.map((style, i) => (React.createElement("style", { key: i, dangerouslySetInnerHTML: { __html: style } })))));
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
    }
    else {
        return getSize(spacing);
    }
}
export function getPadding(padding) {
    if (Array.isArray(padding)) {
        const [vertical, horizontal] = padding;
        return `${getSpacing(vertical)} ${getSpacing(horizontal)}`;
    }
    else {
        return getSpacing(padding);
    }
}
export const lightTheme = {
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
export const darkTheme = {
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
export const getBackground = (color) => {
    return backgroundStyles[color];
};
export const MOBILE = 750;
export const TABLET = 1000;
export const LAPTOP = 1200;
export const withMedia = (styles) => {
    const phone = styles.phone
        ? {
            [`@media (min-width: 0px) and (max-width: ${MOBILE}px)`]: styles.phone,
        }
        : {};
    const tablet = styles.tablet
        ? {
            [`@media (min-width: ${MOBILE}px) and (max-width: ${TABLET}px)`]: styles.tablet,
        }
        : {};
    const laptop = styles.laptop
        ? {
            [`@media (min-width: ${TABLET}px) and (max-width: ${LAPTOP}px)`]: styles.laptop,
        }
        : {};
    const desktop = styles.desktop
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
export const getTextColor = (color) => {
    return textColorStyles[color];
};
export function getBaseStyles() {
    const css = [];
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
//# sourceMappingURL=jss.js.map