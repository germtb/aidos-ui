import React, { ReactNode } from "react";
import {
  JSS,
  Size,
  TextColor,
  getTextColor,
  toClassnames,
} from "./jss";
import { getTypography } from "./typography";

export interface TextProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "className" | "color"
> {
  children: ReactNode;
  color?: TextColor;
  size?: Size;
  bold?: boolean;
  ellipsis?: boolean | "default";
  align?: "center" | "none";
  type?: TextType;
  grow?: boolean;
  jss?: JSS;
  htmlFor?: string;
  className?: never;
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
  htmlFor,
  ...elementProps
}: TextProps) {
  if (ellipsis === "default") {
    ellipsis = Type === "span" || Type === "label";
  }

  const isHeading =
    Type === "h1" || Type === "h2" || Type === "h3" || Type === "h4";

  const className = toClassnames([
    getTextColor(color),
    { ...getTypography(size), padding: 0, margin: 0 },
    isHeading && { fontWeight: "inherit" },
    bold && { fontWeight: 600 },
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
    <Type {...elementProps} className={className} htmlFor={htmlFor}>
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

export function H4({ size = "medium", type = "h4", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}

export function Li({ size = "medium", type = "li", ...rest }: TextProps) {
  return <Text size={size} type={type} {...rest} />;
}
