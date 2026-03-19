import React from "react";
import { Icon as IconifyIcon } from "@iconify/react";
import { BaseView } from "./BaseView";
import { IconType } from "./IconType";
import { Size, TextColor, getTextColor } from "./jss";

const styles = {
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

export function IconProvider({ children }: { children: React.JSX.Element }) {
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
      aria-label={ariaLabel}
      jss={[
        styles.root,
        size === "xsmall" && styles.xsmall,
        size === "small" && styles.small,
        size === "medium" && styles.medium,
        size === "large" && styles.large,
        size === "xlarge" && styles.xlarge,
        size === "xxlarge" && styles.xxlarge,
        size === "xxxlarge" && styles.xxxlarge,
        getTextColor(color),
      ]}
    >
      <IconifyIcon icon={icon} width="100%" height="100%" />
    </BaseView>
  );
}
