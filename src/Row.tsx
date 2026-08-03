import React from "react";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";

export interface RowProps extends FlexLayoutProps {
  direction?: "row";
  wrap?: boolean;
}

export const Row = React.forwardRef(function Row(
  { wrap = false, jss, ...otherProps }: RowProps,
  ref?: React.Ref<HTMLElement>,
) {
  return (
    <FlexLayout
      ref={ref}
      direction="row"
      jss={[wrap && { flexWrap: "wrap" }, jss]}
      {...otherProps}
    />
  );
});
