import React from "react";
import { createJSStyles } from "./Palette";
import { BaseView } from "./BaseView";
import { IconType } from "./IconType";
import { GlyphColor, GlyphSize } from "./Glyph";

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    height: 8,
    width: 8,
  },
  medium: {
    height: 12,
    width: 12,
  },
  large: {
    height: 16,
    width: 16,
  },
  primary: {
    color: "var(--primary-text)",
  },
  secondary: {
    color: "var(--secondary-text)",
  },
  light: {
    color: "var(--light-text)",
  },
  subtle: {
    color: "var(--subtle-text)",
  },
  negative: {
    color: "var(--negative-text)",
  },
  highlight: {
    color: "var(--highlight-text)",
  },
  primaryFull: {
    fill: "var(--primary-text)",
  },
  secondaryFull: {
    fill: "var(--secondary-text)",
  },
  lightFull: {
    fill: "var(--light-text)",
  },
  subtleFull: {
    fill: "var(--subtle-text)",
  },
  negativeFull: {
    fill: "var(--negative-text)",
  },
  highlightFull: {
    fill: "var(--highlight-text)",
  },
  full: {
    " svg": {
      fill: "inherit",
    },
  },
});

let initialized = false;

export const initialize = () => {
  if (initialized) {
    return;
  }

  const hasIconify = document.getElementById("iconify");

  if (hasIconify) {
    initialized = true;
    return;
  }

  const script = document.createElement("script");
  script.src = "https://code.iconify.design/2/2.2.1/iconify.min.js";
  script.id = "iconify";
  document.head.appendChild(script);

  initialized = true;
};

export function Icon({
  icon,
  size,
  color,
  ariaLabel,
  full = false,
}: {
  ariaLabel?: string;
  icon: IconType;
  size: GlyphSize;
  color: GlyphColor;
  full?: boolean;
}) {
  return (
    <BaseView
      aria-label={ariaLabel}
      jsStyle={[
        jsStyles.root,
        size === "small" && jsStyles.small,
        size === "medium" && jsStyles.medium,
        size === "large" && jsStyles.large,
        color === "primary" && jsStyles.primary,
        color === "secondary" && jsStyles.secondary,
        color === "light" && jsStyles.light,
        color === "subtle" && jsStyles.subtle,
        color === "highlight" && jsStyles.highlight,
        color === "negative" && jsStyles.negative,
        full && jsStyles.full,
        full && color === "primary" && jsStyles.primaryFull,
        full && color === "secondary" && jsStyles.secondaryFull,
        full && color === "light" && jsStyles.lightFull,
        full && color === "subtle" && jsStyles.subtleFull,
        full && color === "negative" && jsStyles.negativeFull,
        full && color === "highlight" && jsStyles.highlightFull,
      ]}
    >
      <span className="iconify" data-icon={icon}></span>
    </BaseView>
  );
}
