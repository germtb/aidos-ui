import React from "react";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";

export interface BoxProps extends FlexLayoutProps {}

export function Box({
  componentName,
  padding = "medium",
  align = "center",
  justify = "center",
  ...otherProps
}: BoxProps) {
  return (
    <FlexLayout
      componentName={(componentName ?? []).concat("Box")}
      padding={padding}
      align={align}
      justify={justify}
      {...otherProps}
    />
  );
}
