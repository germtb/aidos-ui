import React from "react";
import { createJSStyles, getTextColor, Size, TextColor } from "./Palette";
import { BaseView } from "./BaseView";
import { IconType } from "./IconType";

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
}: {
  ariaLabel?: string;
  icon: IconType;
  size: Size;
  color: TextColor;
}) {
  return (
    <BaseView
      aria-label={ariaLabel}
      jsStyle={[
        jsStyles.root,
        size === "small" && jsStyles.small,
        size === "medium" && jsStyles.medium,
        size === "large" && jsStyles.large,
        getTextColor(color),
      ]}
    >
      <span className="iconify" data-icon={icon}></span>
    </BaseView>
  );
}
