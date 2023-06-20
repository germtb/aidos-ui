import React from "react";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";

export interface BoxProps extends FlexLayoutProps {}

export function Box({
  padding = "medium",
  align = "center",
  justify = "center",
  ...otherProps
}: BoxProps) {
  return (
    <FlexLayout
      padding={padding}
      align={align}
      justify={justify}
      {...otherProps}
    />
  );
}
