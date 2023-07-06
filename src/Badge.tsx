import React from "react";

import { getBackground, Color, createJSStyles, Size } from "./Styles";
import { BaseView } from "./BaseView";

const jsStyles = createJSStyles({
  xsmall: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  small: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  medium: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  large: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  xlarge: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export function Badge({
  size = "medium",
  color = "highlight",
}: {
  size?: Size;
  color?: Color;
}) {
  return (
    <BaseView
      jsStyle={[
        size === "xsmall" && jsStyles.xsmall,
        size === "small" && jsStyles.small,
        size === "medium" && jsStyles.medium,
        size === "large" && jsStyles.large,
        size === "xlarge" && jsStyles.xlarge,
        getBackground(color),
      ]}
    />
  );
}
