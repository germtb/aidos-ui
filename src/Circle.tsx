import React from "react";
import { createJSStyles } from "./Styles";
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
  ...otherProps
}: CircleProps) {
  return (
    <Box padding={padding} jsStyle={[jsStyles.root, jsStyle]} {...otherProps} />
  );
}
