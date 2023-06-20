import React from "react";
import { FlexLayout, FlexLayoutProps } from "./FlexLayout";

export interface RowProps extends FlexLayoutProps {
  direction?: "row";
}

export const Row = React.forwardRef(
  (props: RowProps, ref?: React.Ref<HTMLElement>) => {
    return <FlexLayout ref={ref} direction="row" {...props} />;
  }
);
