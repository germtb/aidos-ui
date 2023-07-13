import React, { useEffect } from "react";
import { BaseView } from "./BaseView";
import { IconType } from "./IconType";
import { Size, TextColor, getTextColor } from "./jss2";

const jsStyles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    " svg": {
      height: "inherit",
      width: "inherit",
    },
  },
  xsmall: {
    height: 8,
    width: 8,
  },
  small: {
    height: 12,
    width: 12,
  },
  medium: {
    height: 18,
    width: 18,
  },
  large: {
    height: 24,
    width: 24,
  },
  xlarge: {
    height: 30,
    width: 30,
  },
};

let initialized = false;

const initializeIcons = () => {
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

export function IconProvider({ children }: { children: JSX.Element }) {
  useEffect(() => {
    initializeIcons();
  }, []);

  return children;
}

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
      key={icon}
      aria-label={ariaLabel}
      jsStyle={[
        jsStyles.root,
        size === "xsmall" && jsStyles.xsmall,
        size === "small" && jsStyles.small,
        size === "medium" && jsStyles.medium,
        size === "large" && jsStyles.large,
        size === "xlarge" && jsStyles.xlarge,
        getTextColor(color),
      ]}
    >
      <span className="iconify" data-icon={icon}></span>
    </BaseView>
  );
}
