import React, { ReactNode } from "react";
import { JSStyle, Size, TextColor, getTextColor, jss } from "./jss2";

const fontSize = {
  xsmall: "0.75rem",
  small: "1rem",
  medium: "1.25rem",
  large: "1.5rem",
  xlarge: "2rem",
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
  id?: string;
}

export type TextType = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "li";

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
  id,
}: TextProps) {
  if (ellipsis === "default") {
    ellipsis = Type === "span";
  }

  const className = jss([
    getTextColor(color),
    { fontSize: fontSize[size], padding: 0, margin: 0 },
    bold && { fontWeight: "bold" },
    align === "center" && { textAlign: "center" },
    ellipsis && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    grow && { flexGrow: 1 },
    jsStyle,
  ]);

  return (
    <Type id={id} className={className}>
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

export function H1({ size = "xlarge", type = "h1", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H2({ size = "large", type = "h2", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H3({ size = "medium", type = "h3", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function Li({ size = "small", type = "li", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}
