import React, { ReactNode } from "react";
import { createJSStyles, createClassNames, JSStyles } from "./Palette";
import { GlyphColor, GlyphSize } from "./Glyph";

const jsStyles = createJSStyles({
  root: {},
  ellipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
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
  size1: {
    fontSize: 16,
    lineHeight: 20 / 16,
  },
  size2: {
    fontSize: 20,
    lineHeight: 24 / 20,
  },
  size3: {
    fontSize: 24,
    lineHeight: 28 / 24,
  },
  size4: {
    fontWeight: "bold",
    fontSize: 26,
    lineHeight: 30 / 26,
  },
  textAlignCenter: {
    textAlign: "center",
  },
});

export interface TextProps {
  children: ReactNode;
  color?: GlyphColor;
  size?: GlyphSize;
  ellipsis?: boolean;
  align?: "center" | "none";
}

export function Text({
  children,
  color = "primary",
  size = "medium",
  align = "none",
  ellipsis = true,
}: TextProps) {
  return (
    <span
      className={createClassNames([
        jsStyles.root,
        color === "primary" && jsStyles.primary,
        color === "secondary" && jsStyles.secondary,
        color === "negative" && jsStyles.negative,
        color === "highlight" && jsStyles.highlight,
        color === "subtle" && jsStyles.subtle,
        color === "light" && jsStyles.light,
        size === "small" && jsStyles.size1,
        size === "medium" && jsStyles.size2,
        size === "large" && jsStyles.size4,
        align === "center" && jsStyles.textAlignCenter,
        ellipsis && jsStyles.ellipsis,
      ])}
    >
      {children}
    </span>
  );
}
