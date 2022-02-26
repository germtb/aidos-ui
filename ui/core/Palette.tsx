import * as CSS from "csstype";
import { guid } from "../../utils/guid";

type StylesValueType = string | number | CSS.Properties<string | number>;

export type Size = "small" | "medium" | "large";

export type Styles = CSS.Properties<
  string | number | CSS.Properties<string | number>
>;

type Stylesheet = {
  [cssProp: string]: {
    [cssValue: string]:
      | {
          className: string;
          selector: string;
          type: "SIMPLE";
          caller: string;
        }
      | {
          className: string;
          selector: string;
          type: "NESTED";
          style: CSS.Properties<string | number>;
          caller: string;
        };
  };
};

export type JSStyles = Styles | null | false | undefined | Array<JSStyles>;

const stylesheet: Stylesheet = {};

const aliaStylesMap: {
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

export function createJSStyle(styles: Styles) {
  const stylesStack = Object.entries(styles);

  let caller = "";

  try {
    throw new Error();
  } catch (e) {
    const matches = e.stack.match(/src\/.*\.tsx/);
    const match = matches ? matches[0] : null;
    const module = match ?? "";
    if (module) {
      caller = module.replace("src/", "").replace(".tsx", "");
    }
  }

  while (stylesStack.length) {
    // @ts-ignore
    const [styleProp, styleValue]: [
      string,
      StylesValueType
    ] = stylesStack.pop();

    if (styleProp == null) {
      throw new Error("For typescript");
    }

    if (stylesheet[styleProp] == null) {
      stylesheet[styleProp] = {};
    }

    const stylesheetProp = stylesheet[styleProp];

    const alias = aliaStylesMap[styleProp];

    if (alias != null) {
      const aliasTransform = alias(styleValue);
      if (aliasTransform.length > 0) {
        stylesStack.push(...aliasTransform);
        continue;
      }
      delete stylesheet[styleProp];
    }

    const id = guid();

    if (typeof styleValue === "number") {
      stylesheetProp[styleValue] = {
        className: id,
        selector: id,
        type: "SIMPLE",
        caller,
      };
    } else if (typeof styleValue === "string") {
      stylesheetProp[styleValue] = {
        className: id,
        selector: id,
        type: "SIMPLE",
        caller,
      };
    } else if (typeof styleValue === "object") {
      stylesheetProp[JSON.stringify(styleValue, null, 2)] = {
        className: id,
        selector: `${id}${styleProp}`,
        type: "NESTED",
        style: styleValue,
        caller,
      };
    } else {
      throw new Error("Invalid CSS value");
    }
  }
}

export const createJSStyles = <
  T extends {
    [key: string]: Styles;
  }
>(
  styles: T
): T => {
  for (const style of Object.values(styles)) {
    createJSStyle(style);
  }

  return styles;
};

const reduceJSStyle = (jsStyle: JSStyles): Styles => {
  if (jsStyle === false) {
    return {};
  } else if (Array.isArray(jsStyle)) {
    // @ts-ignore This used to work?
    return jsStyle.reduce((acc: Styles, jsStyle: JSStyles) => {
      return { ...acc, ...reduceJSStyle(jsStyle) };
    }, {});
  } else {
    return jsStyle;
  }
};

const aliasStyles = (styles: Styles): Styles => {
  const aliasedReducedStyle: Styles = {};

  const reducedStyleStack = Object.entries(styles);

  while (reducedStyleStack.length) {
    const entry = reducedStyleStack.pop();
    if (entry == null) {
      continue;
    }

    const [prop, value] = entry;
    const alias = aliaStylesMap[prop];

    if (alias) {
      const aliasTransform = alias(value);
      reducedStyleStack.push(...aliasTransform);
    } else {
      // @ts-ignore
      aliasedReducedStyle[prop] = value;
    }
  }

  return aliasedReducedStyle;
};

export const createClassNames = (...styles: Array<JSStyles>): string => {
  if (styles.length === 0) {
    return "";
  }

  const reducedStyle = reduceJSStyle(styles);
  const aliasedReducedStyle: Styles = aliasStyles(reducedStyle);
  const classNames: string[] = [];

  for (const [styleProp, styleValue] of Object.entries(aliasedReducedStyle)) {
    if (typeof styleValue === "string" || typeof styleValue === "number") {
      const stylesheetProp = stylesheet[styleProp];
      const className = stylesheetProp[styleValue].className;
      const caller = stylesheetProp[styleValue].caller;
      if (!classNames.includes(caller)) {
        classNames.push(caller);
      }

      classNames.push(className);
    } else if (typeof styleValue === "object") {
      const stylesheetProp = stylesheet[styleProp];
      const className =
        stylesheetProp[JSON.stringify(styleValue, null, 2)].className;
      const caller = stylesheetProp[JSON.stringify(styleValue, null, 2)].caller;
      if (!classNames.includes(caller)) {
        classNames.push(caller);
      }

      classNames.push(className);
    } else {
      throw new Error("Unknown style type");
    }
  }

  return classNames.join(" ");
};

const pixelCompatibleProps = [
  "height",
  "width",
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
];

export const generateStylesheet = () => {
  const css: string[] = [];

  for (const prop of Object.keys(stylesheet)) {
    for (const value of Object.keys(stylesheet[prop])) {
      const stylesheetPropValue = stylesheet[prop][value];
      const selector = stylesheetPropValue.selector;

      if (stylesheetPropValue.type === "SIMPLE") {
        const cssProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
        const cssValue =
          pixelCompatibleProps.includes(cssProp) &&
          parseInt(value).toString() === value
            ? `${value}px`
            : value;

        css.push(`.${selector} { ${cssProp}: ${cssValue}; }`);
      } else if (stylesheetPropValue.type === "NESTED") {
        const nestedStyle = stylesheetPropValue.style;
        const cssValue = Object.entries(nestedStyle)
          .map(([prop, value]) => {
            const cssProp = prop.replace(
              /[A-Z]/g,
              (m) => "-" + m.toLowerCase()
            );
            const cssValue =
              pixelCompatibleProps.includes(cssProp) &&
              parseInt(value).toString() === value
                ? `${value}px`
                : value;

            return `${cssProp}: ${cssValue}; `;
          })
          .join(" ");

        css.push(`.${selector} { ${cssValue} }`);
      }
    }
  }

  return css.join("\n\n");
};
