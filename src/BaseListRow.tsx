import React from "react";

import { ListDivider } from "./ListDivider";
import { Row, RowProps } from "./Row";
import { JSStyle, Color, Padding, getBackground } from "./jss";

export interface BaseListRowProps extends RowProps {
  jsStyle?: JSStyle;
  withDivider?: boolean;
  role?: undefined;
  backgroundColor?: Color;
  padding?: Padding;
}

export const BaseListRow = React.forwardRef(
  (
    {
      children,
      jsStyle,
      withDivider = true,
      backgroundColor = "primary-background",
      ...otherProps
    }: BaseListRowProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    return (
      <>
        <Row
          {...otherProps}
          ref={ref}
          relative={true}
          tag="li"
          role="row"
          jsStyle={[getBackground(backgroundColor), jsStyle]}
        >
          {children}
        </Row>
        {withDivider && <ListDivider />}
      </>
    );
  }
);
