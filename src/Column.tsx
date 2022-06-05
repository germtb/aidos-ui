import React from "react";
import FlexLayout, { FlexLayoutProps } from "./FlexLayout";

interface ColumnProps extends FlexLayoutProps {
  direction?: "column";
}

function Column(
  { componentName = [], ...otherProps }: ColumnProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <FlexLayout
      ref={ref}
      componentName={componentName.concat("Column")}
      direction="column"
      {...otherProps}
    />
  );
}

export default React.forwardRef(Column);
