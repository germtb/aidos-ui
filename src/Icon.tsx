import React, { useCallback, useSyncExternalStore } from "react";
import { getIcon, getServerIcon, subscribe } from "./icons/store";
import { BaseView } from "./BaseView";
import { IconType } from "./IconType";
import { JSS, Size, TextColor, getTextColor } from "./jss";

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

export interface IconProps {
  ariaLabel?: string;
  icon: IconType;
  size: Size;
  color: TextColor;
  jss?: JSS;
}

export function Icon({ icon, size, color, ariaLabel, jss }: IconProps) {
  // Only explicit preloads belong in SSR; lazy caches can differ across requests.
  const data = useSyncExternalStore(
    useCallback((listener) => subscribe(icon, listener), [icon]),
    () => getIcon(icon),
    () => getServerIcon(icon),
  );
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
        jss,
      ]}
    >
      {data ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox={`0 0 ${data.width ?? 24} ${data.height ?? 24}`}
          aria-hidden="true"
          focusable="false"
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      ) : (
        <span />
      )}
    </BaseView>
  );
}
