import React from "react";
import { Color, createJSStyles } from "./Palette";
import Box, { BoxProps } from "./Box";

const jsStyles = createJSStyles({
  root: {
    borderRadius: "50%",
    overflow: "hidden",
  },
});

interface CircleProps extends BoxProps {}

export default function Circle({
  jsStyle,
  spacing = "medium",
  componentName,
  ...otherProps
}: CircleProps) {
  return (
    <Box
      componentName={(componentName ?? []).concat("Circle")}
      spacing={spacing}
      jsStyle={[jsStyles.root, jsStyle]}
      {...otherProps}
    />
  );
}
