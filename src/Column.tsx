import React from "react";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";

interface ColumnProps extends FlexLayoutProps {
  direction?: "column";
}

export const Column = React.forwardRef(
  (props: ColumnProps, ref?: React.Ref<HTMLDivElement>) => {
    return <FlexLayout ref={ref} direction="column" {...props} />;
  }
);
