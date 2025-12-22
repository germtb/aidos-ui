import React from "react";
import { Column, ColumnProps } from "./Column";

export interface BaseListProps extends ColumnProps {
  tag?: undefined;
}

export const BaseList = React.forwardRef(
  ({ jss, ...otherProps }: BaseListProps, ref?: React.Ref<HTMLDivElement>) => {
    return (
      <Column
        {...otherProps}
        tag="ul"
        jss={[
          {
            listStyle: "none",
            margin: 0,
            padding: 0,
          },
          jss,
        ]}
        ref={ref}
      />
    );
  }
);
