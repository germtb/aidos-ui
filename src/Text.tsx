import React, { ReactNode } from "react";
import {
  createJSStyles,
  createClassNames,
  TextColor,
  Size,
  getTextColor,
} from "./Palette";

const jsStyles = createJSStyles({
  root: {},
  ellipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  size1: {
    fontSize: 14,
    lineHeight: "1.5rem",
  },
  size2: {
    fontSize: 18,
    lineHeight: "1.5rem",
  },
  size3: {
    fontSize: 24,
    lineHeight: "1.5rem",
  },
  size4: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: "1.5rem",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  grow: {
    flexGrow: 1,
  },
});

export type Display = "inline" | "block";

export interface TextProps {
  children: ReactNode;
  color?: TextColor;
  size?: Size;
  ellipsis?: boolean | "default";
  align?: "center" | "none";
  type?: TextType;
  grow?: boolean;
  header?: 1 | 2 | 3 | 4;
}

export type TextType = "span" | "p" | "h1" | "h2" | "h3" | "h4";

export function Text({
  children,
  color = "primary",
  size = "medium",
  align = "none",
  ellipsis = "default",
  grow,
  type: Type = "span",
}: TextProps) {
  if (ellipsis === "default") {
    ellipsis = Type === "span";
  }

  return (
    <Type
      className={createClassNames([
        jsStyles.root,
        getTextColor(color),
        size === "small" && jsStyles.size1,
        size === "medium" && jsStyles.size2,
        size === "large" && jsStyles.size3,
        align === "center" && jsStyles.textAlignCenter,
        ellipsis && jsStyles.ellipsis,
        grow && jsStyles.grow,
      ])}
    >
      {children}
    </Type>
  );
}

export function Span({ size = "small", type = "span", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function P({ size = "small", type = "p", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H1({ size = "large", type = "h1", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H2({ size = "medium", type = "h2", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H3({ size = "small", type = "h3", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}
