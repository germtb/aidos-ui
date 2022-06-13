import React from "react";
import { createJSStyles } from "./Palette";
import { Box, BoxProps } from "./Box";

const jsStyles = createJSStyles({
  root: {
    borderRadius: "50%",
    overflow: "hidden",
  },
});

interface CircleProps extends BoxProps {}

export function Circle({
  jsStyle,
  padding = "medium",
  componentName,
  ...otherProps
}: CircleProps) {
  return (
    <Box
      componentName={(componentName ?? []).concat("Circle")}
      padding={padding}
      jsStyle={[jsStyles.root, jsStyle]}
      {...otherProps}
    />
  );
}
