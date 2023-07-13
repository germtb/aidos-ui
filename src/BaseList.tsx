import React from "react";
import { Column, ColumnProps } from "./Column";

export interface BaseListProps extends ColumnProps {
  tag?: undefined;
}

export const BaseList = React.forwardRef(
  (
    { jsStyle, ...otherProps }: BaseListProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Column
        {...otherProps}
        tag="ul"
        jsStyle={[
          {
            listStyle: "none",
            margin: 0,
            padding: 0,
          },
          jsStyle,
        ]}
        ref={ref}
      />
    );
  }
);
