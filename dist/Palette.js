import React, { useInsertionEffect } from "react";
import { guid } from "./guid";
const stylesheet = {};
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
export function createJSStyle(styles) {
    const stylesStack = Object.entries(styles);
    while (stylesStack.length) {
        const [key, value] = stylesStack.pop();
        if (aliases[key]) {
            stylesStack.push(...aliases[key](value));
            continue;
        }
        if (stylesheet[key] == null) {
            stylesheet[key] = {};
        }
        const id = guid();
        if (typeof value === "number") {
            stylesheet[key][value] = {
                className: id,
                selector: `.${id}`,
                type: "SIMPLE",
            };
        }
        else if (typeof value === "string") {
            stylesheet[key][value] = {
                className: id,
                selector: `.${id}`,
                type: "SIMPLE",
            };
        }
        else if (typeof value === "object" && key.startsWith("@media")) {
            stylesheet[key][JSON.stringify(value, null, 2)] = {
                className: id,
                media: key,
                selector: `.${id}`,
                type: "MEDIA",
                style: value,
            };
        }
        else if (typeof value === "object") {
            stylesheet[key][JSON.stringify(value, null, 2)] = {
                className: id,
                selector: `.${id}${key}`,
                type: "NESTED",
                style: value,
            };
        }
        else {
            throw new Error("Invalid CSS value");
        }
    }
    return styles;
}
export const createJSStyles = (styles) => {
    for (const style of Object.values(styles)) {
        createJSStyle(style);
    }
    return styles;
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
const aliasStyles = (styles) => {
    const aliasedStyles = {};
    const stack = Object.entries(styles);
    while (stack.length) {
        const [key, value] = stack.pop();
        const alias = aliases[key];
        if (alias) {
            stack.push(...alias(value));
        }
        else {
            aliasedStyles[key] = value;
        }
    }
    return aliasedStyles;
};
export const createClassNames = (...styles) => {
    if (styles.length === 0) {
        return "";
    }
    const flatStyles = flattenJSStyle(styles);
    const aliasedStyles = aliasStyles(flatStyles);
    const classNames = [];
    for (const [key, value] of Object.entries(aliasedStyles)) {
        if (typeof value === "string" || typeof value === "number") {
            const className = stylesheet[key][value].className;
            classNames.push(className);
        }
        else if (typeof value === "object" && key.startsWith("@media")) {
            const className = stylesheet[key][JSON.stringify(value, null, 2)].className;
            classNames.push(className);
        }
        else if (typeof value === "object") {
            const className = stylesheet[key][JSON.stringify(value, null, 2)].className;
            classNames.push(className);
        }
        else {
            throw new Error("Unknown style type");
        }
    }
    return classNames.join(" ");
};
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
    return pixelStyles.has(key) &&
        !value.toString().includes("%") &&
        Number.isInteger(parseInt(value, 10))
        ? `${value}px`
        : value;
};
const getCSS = (key, value) => {
    const cssProp = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    const cssValue = toPixelValue(cssProp, value);
    return [cssProp, cssValue];
};
export const generateStylesheet = ({ light, dark }) => {
    const css = [];
    css.push(baseStyles);
    css.push(`:root {
    color-scheme: light;
    ${Object.entries(light).map(([key, value]) => `${key}: ${value}`).join(';\n . ')}
  }`);
    css.push(`:root {
    color-scheme: dark;
    ${Object.entries(dark).map(([key, value]) => `${key}: ${value}`).join(';\n . ')}
  }`);
    for (const key of Object.keys(stylesheet)) {
        for (const value of Object.keys(stylesheet[key])) {
            const style = stylesheet[key][value];
            const selector = style.selector;
            if (style.type === "SIMPLE") {
                const [cssProp, cssValue] = getCSS(key, value);
                css.push(`${selector} { ${cssProp}: ${cssValue}; }`);
            }
            else if (style.type === "MEDIA") {
                const media = style.media;
                const cssValue = Object.entries(style.style)
                    .map(([key, value]) => {
                    const [cssProp, cssValue] = getCSS(key, value);
                    return `${cssProp}: ${cssValue}; `;
                })
                    .join(" ");
                css.push(`${media} { ${selector} { ${cssValue} } }`);
            }
            else if (style.type === "NESTED") {
                const cssValue = Object.entries(style.style)
                    .map(([key, value]) => {
                    const [cssProp, cssValue] = getCSS(key, value);
                    return `${cssProp}: ${cssValue}; `;
                })
                    .join(" ");
                css.push(`${selector} { ${cssValue} }`);
            }
        }
    }
    return css.join("\n\n");
};
export const lightTheme = {
    /* Background */
    ["--primary-background"]: "rgb(239, 239, 244)",
    ["--secondary-background"]: "rgb(232, 232, 234)",
    ["--divider"]: "rgb(200, 200, 200)",
    ["--strong-divider"]: "rgb(100, 100, 100)",
    ["--pressed-background"]: "rgb(220, 222, 224)",
    ["--nav-bar"]: "rgb(232, 232, 234)",
    /* Effects */
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
    ["--primary-background"]: "rgb(42, 43, 46)",
    ["--secondary-background"]: "rgb(34, 35, 36)",
    ["--divider"]: "rgb(70, 72, 73)",
    ["--strong-divider"]: "rgb(100, 100, 100)",
    ["--pressed-background"]: "rgb(50, 52, 53)",
    ["--nav-bar"]: "rgb(34, 35, 36)",
    ["--highlight"]: "rgb(50, 140, 220)",
    ["--outline"]: "rgb(91, 170, 255)",
    ["--light-highlight"]: "rgb(220, 232, 245)",
    ["--primary-text"]: "rgb(255, 255, 255)",
    ["--secondary-text"]: "rgb(200, 200, 200)",
    ["--subtle-text"]: "rgb(140, 140, 140)",
    ["--highlight-text"]: "#4ca7f8",
    ["--negative-text"]: "rgb(255, 59, 48)",
    ["--light-text"]: "rgb(255, 255, 255)",
    ["--background-button-positive"]: "rgb(50, 140, 220)",
    ["--background-button-secondary"]: "rgb(82, 83, 86)",
    ["--background-button-negative"]: "rgb(255, 59, 48)",
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
    ["--nav-bar-height"]: "50px", ["--background-button-disabled"]: "rgb(70, 72, 73)",
};
const baseStyles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  touch-action: manipulation;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*:focus {
  outline-color: var(--highlight);
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--primary-background);
}

textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: 0 0 0 30px var(--primary-background) inset !important;
  -webkit-box-shadow: 0 0 0 30px var(--primary-background) inset !important;
  -webkit-text-fill-color: var(--secondary-text) !important;
}

ul,
li {
  list-style: none;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  margin-left: -10px;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`;
export const PaletteProvider = ({ children, themes }) => {
    useInsertionEffect(() => {
        const stylesheet = generateStylesheet(themes);
        const style = document.createElement("style");
        style.innerHTML = stylesheet;
        document.head.appendChild(style);
        () => {
            document.head.removeChild(style);
        };
    }, []);
    return React.createElement(React.Fragment, null, children);
};
const backgroundStyles = createJSStyles({
    highlight: {
        backgroundColor: "var(--highlight)",
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
});
export const getBackground = (color) => {
    return backgroundStyles[color];
};
const justifyStyles = createJSStyles({
    ["space-between"]: {
        justifyContent: "space-between",
    },
    ["center"]: {
        justifyContent: "center",
    },
    ["flex-end"]: {
        justifyContent: "flex-end",
    },
    ["stretch"]: {
        justifyContent: "stretch",
    },
    ["flex-start"]: {
        justifyContent: "flex-start",
    },
});
export const getJustify = (prop) => {
    return justifyStyles[prop];
};
const alignStyles = createJSStyles({
    ["stretch"]: {
        alignItems: "stretch",
    },
    ["center"]: {
        alignItems: "center",
    },
    ["flex-start"]: {
        alignItems: "flex-start",
    },
});
export const getAlign = (prop) => {
    return alignStyles[prop];
};
const gapStyles = createJSStyles({
    small: {
        gap: "var(--spacing-s)",
    },
    medium: {
        gap: "var(--spacing-m)",
    },
    large: {
        gap: "var(--spacing-l)",
    },
});
export const getGap = (gap) => {
    return gapStyles[`${gap}`];
};
export const paddingStyles = createJSStyles({
    small: {
        padding: "var(--spacing-s)",
    },
    medium: {
        padding: "var(--spacing-m)",
    },
    large: {
        padding: "var(--spacing-l)",
    },
    ["small-row"]: {
        paddingLeft: "var(--spacing-s)",
        paddingRight: "var(--spacing-s)",
    },
    ["medium-row"]: {
        paddingLeft: "var(--spacing-m)",
        paddingRight: "var(--spacing-m)",
    },
    ["large-row"]: {
        paddingLeft: "var(--spacing-l)",
        paddingRight: "var(--spacing-l)",
    },
    ["small-column"]: {
        paddingTop: "var(--spacing-s)",
        paddingBottom: "var(--spacing-s)",
    },
    ["medium-column"]: {
        paddingTop: "var(--spacing-m)",
        paddingBottom: "var(--spacing-m)",
    },
    ["large-column"]: {
        paddingTop: "var(--spacing-l)",
        paddingBottom: "var(--spacing-l)",
    },
});
export const getPadding = (padding) => {
    if (Array.isArray(padding)) {
        const [h, v] = padding;
        return [paddingStyles[`${v}-row`], paddingStyles[`${h}-column`]];
    }
    else {
        return paddingStyles[padding];
    }
};
export const grow = createJSStyles({ grow: { flexGrow: 1 } }).grow;
export const shrink = createJSStyles({ shrink: { flexShrink: 1 } });
const flexStyles = createJSStyles({
    row: {
        display: "flex",
        flexDirection: "row",
    },
    column: {
        display: "flex",
        flexDirection: "column",
    },
});
export const getFlex = (direction) => {
    return flexStyles[direction];
};
const borderStyles = createJSStyles({
    top: {
        borderTop: "1px solid var(--divider)",
    },
    bottom: {
        borderBottom: "1px solid var(--divider)",
    },
    right: {
        borderRight: "1px solid var(--divider)",
    },
    left: {
        borderLeft: "1px solid var(--divider)",
    },
    all: {
        border: "1px solid var(--divider)",
    },
});
export const getBorder = (direction) => {
    if (!direction) {
        return borderStyles.all;
    }
    return borderStyles[direction];
};
export const getDisplayMedia = (styles) => {
    return {
        ["@media (min-width: 0px) and (max-width: 750px)"]: styles.phone,
        ["@media (min-width: 750px) and (max-width: 1000px)"]: styles.tablet,
        ["@media (min-width: 1000px) and (max-width: 1200px)"]: styles.laptop,
        ["@media (min-width: 1200px)"]: styles.desktop,
    };
};
const textColorStyles = createJSStyles({
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
});
export const getTextColor = (color) => {
    return textColorStyles[color];
};
//# sourceMappingURL=Palette.js.map