import React from "react";
import { Box, BoxProps } from "./Box";

interface CircleProps extends BoxProps {}

export function Circle({
  jss,
  padding = "medium",
  ...otherProps
}: CircleProps) {
  return (
    <Box
      padding={padding}
      jss={[
        {
          borderRadius: "50%",
          overflow: "hidden",
        },
        jss,
      ]}
      {...otherProps}
    />
  );
}
