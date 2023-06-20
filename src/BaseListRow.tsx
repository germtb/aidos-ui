import React from "react";
import {
  JSStyles,
  createJSStyles,
  getBackground,
  Color,
  Padding,
} from "./Palette";
import { ListDivider } from "./ListDivider";
import { Row, RowProps } from "./Row";

export interface BaseListRowProps extends RowProps {
  jsStyle?: JSStyles;
  withDivider?: boolean;
  role?: undefined;
  backgroundColor?: Color;
  padding?: Padding;
}

const jsStyles = createJSStyles({
  root: {
    position: "relative",
  },
});

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
          tag="li"
          role="row"
          jsStyle={[jsStyles.root, getBackground(backgroundColor), jsStyle]}
        >
          {children}
        </Row>
        {withDivider && <ListDivider />}
      </>
    );
  }
);
