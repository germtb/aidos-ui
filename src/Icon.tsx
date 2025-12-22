import React, { useEffect } from "react";
import { BaseView } from "./BaseView";
import { IconType } from "./IconType";
import { Size, TextColor, getTextColor } from "./jss";

const jsss = {
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
    height: 32,
    width: 32,
  },
  xxlarge: {
    height: 48,
    width: 48,
  },
  xxxlarge: {
    height: 64,
    width: 64,
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
  script.src = "https://code.iconify.design/3/3.1.1/iconify.min.js";
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
      jss={[
        jsss.root,
        size === "xsmall" && jsss.xsmall,
        size === "small" && jsss.small,
        size === "medium" && jsss.medium,
        size === "large" && jsss.large,
        size === "xlarge" && jsss.xlarge,
        size === "xxlarge" && jsss.xxlarge,
        size === "xxxlarge" && jsss.xxxlarge,
        getTextColor(color),
      ]}
    >
      <span className="iconify" data-icon={icon}></span>
    </BaseView>
  );
}
