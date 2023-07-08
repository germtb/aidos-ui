import React from "react";
import { Box, BoxProps } from "./Box";

interface CircleProps extends BoxProps {}

export function Circle({
  jsStyle,
  padding = "medium",
  ...otherProps
}: CircleProps) {
  return (
    <Box
      padding={padding}
      jsStyle={[
        {
          borderRadius: "50%",
          overflow: "hidden",
        },
        jsStyle,
      ]}
      {...otherProps}
    />
  );
}
