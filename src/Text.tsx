import React, { ReactNode } from "react";
import { JSStyle, Size, TextColor, getTextColor, jss } from "./jss";

const fontSize = {
  xsmall: 10,
  small: 14,
  medium: 18,
  large: 24,
  xlarge: 30,
};

export type Display = "inline" | "block";

export interface TextProps {
  children: ReactNode;
  color?: TextColor;
  size?: Size;
  bold?: boolean;
  ellipsis?: boolean | "default";
  align?: "center" | "none";
  type?: TextType;
  grow?: boolean;
  jsStyle?: JSStyle;
}

export type TextType = "span" | "p" | "h1" | "h2" | "h3" | "h4";

export function Text({
  children,
  color = "primary",
  size = "medium",
  align = "none",
  bold = false,
  ellipsis = "default",
  grow,
  type: Type = "span",
  jsStyle,
}: TextProps) {
  if (ellipsis === "default") {
    ellipsis = Type === "span";
  }

  return (
    <Type
      className={jss([
        getTextColor(color),
        { lineHeight: "1.5rem" },
        { fontSize: fontSize[size] },
        bold && { fontWeight: "bold" },
        align === "center" && { textAlign: "center" },
        ellipsis && {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        grow && { flexGrow: 1 },
        jsStyle,
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
