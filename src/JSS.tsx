import CSS from "csstype";
import React, { ReactNode, useRef } from "react";

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

const getCSS = (key: string, value: string | number): [string, string] => {
  const cssProp = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  const cssValue = toPixelValue(cssProp, value);
  return [cssProp, cssValue];
};

export const jss = (styles: JSStyle): string => {
  const stylesStack = Object.entries(styles);
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

    const selector = numberToBase(rawHashMap.size);
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
