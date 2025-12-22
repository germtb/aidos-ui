import React, { ReactNode } from "react";
import {
  JSStyle,
  Size,
  TextColor,
  cssVar,
  getTextColor,
  toClassnames,
} from "./jss";

const fontSize = {
  xsmall: cssVar("--font-xsmall"),
  small: cssVar("--font-small"),
  medium: cssVar("--font-medium"),
  large: cssVar("--font-large"),
  xlarge: cssVar("--font-xlarge"),
  xxlarge: cssVar("--font-xxlarge"),
  xxxlarge: cssVar("--font-xxxlarge"),
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
  jss?: JSStyle;
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
  jss,
  id,
  htmlFor,
}: TextProps) {
  if (ellipsis === "default") {
    ellipsis = Type === "span" || Type === "label";
  }

  const className = toClassnames([
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
    jss,
  ]);

  return (
    <Type id={id} className={className} htmlFor={htmlFor}>
      {children}
    </Type>
  );
}

export function Label({ size = "medium", type = "label", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function Span({ size = "medium", type = "span", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function P({ size = "medium", type = "p", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H1({ size = "xxlarge", type = "h1", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H2({ size = "xlarge", type = "h2", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function H3({ size = "large", type = "h3", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function Li({ size = "medium", type = "li", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}
