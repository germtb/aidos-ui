import React from "react";
import FlexLayout, { FlexLayoutProps } from "./FlexLayout";

export interface RowProps extends FlexLayoutProps {
  direction?: "row";
}

function Row(
  { componentName = [], ...otherProps }: RowProps,
  ref?: React.Ref<HTMLElement>
) {
  return (
    <FlexLayout
      ref={ref}
      componentName={componentName.concat("Row")}
      direction="row"
      {...otherProps}
    />
  );
}

export default React.forwardRef(Row);
