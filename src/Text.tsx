import React, { ReactNode } from "react";
import { JSStyle, Size, TextColor, getTextColor, jss } from "./jss";

const fontSize = {
  xsmall: "0.75rem",
  small: "1rem",
  medium: "1.25rem",
  large: "1.5rem",
  xlarge: "2rem",
  xxlarge: "3rem",
  xxxlarge: "4rem",
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
  htmlFor?: string;
}

export type TextType =
  | "label"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "li";

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
  htmlFor,
}: TextProps) {
  if (ellipsis === "default") {
    ellipsis = Type === "span" || Type === "label";
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
    <Type id={id} className={className} htmlFor={htmlFor}>
      {children}
    </Type>
  );
}

export function Label({ size = "small", type = "label", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
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
