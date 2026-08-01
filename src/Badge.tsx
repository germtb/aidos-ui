import React from "react";

import { BaseView } from "./BaseView";
import { Color, JSS, Size, getBackground } from "./jss";

const sizes: { [size in Size]: number } = {
  xsmall: 4,
  small: 6,
  medium: 12,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  xxxlarge: 40,
};

export function Badge({
  size = "medium",
  color = "highlight",
  jss,
}: {
  size?: Size;
  color?: Color;
  jss?: JSS;
}) {
  return (
    <BaseView
      jss={[
        {
          width: sizes[size],
          height: sizes[size],
          borderRadius: sizes[size] / 2,
        },
        getBackground(color),
        jss,
      ]}
    />
  );
}
