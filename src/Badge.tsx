import React from "react";

import { BaseView } from "./BaseView";
import { Color, JSStyle, Size, getBackground } from "./jss";

const sizes = {
  xsmall: 4,
  small: 6,
  medium: 12,
  large: 18,
  xlarge: 24,
};

export function Badge({
  size = "medium",
  color = "highlight",
  jss,
}: {
  size?: Size;
  color?: Color;
  jss?: JSStyle;
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
