import React from "react";
import { createJSStyles } from "./Palette";
import Box, { BoxProps } from "./Box";

const jsStyles = createJSStyles({
  root: {
    borderRadius: "50%",
  },
});

interface CircleProps extends BoxProps {}

export default function Circle({
  jsStyle,
  spacing = "medium",
  ...otherProps
}: CircleProps) {
  return (
    <Box
      componentName={otherProps.componentName ?? "Circle"}
      spacing={spacing}
      jsStyle={[jsStyles.root, jsStyle]}
      {...otherProps}
    />
  );
}
