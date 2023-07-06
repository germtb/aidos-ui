import React from "react";
import {
  JSStyle,
  createJSStyle,
  getBackground,
  Color,
  Padding,
} from "./Styles";
import { ListDivider } from "./ListDivider";
import { Row, RowProps } from "./Row";

export interface BaseListRowProps extends RowProps {
  jsStyle?: JSStyle;
  withDivider?: boolean;
  role?: undefined;
  backgroundColor?: Color;
  padding?: Padding;
}

const jsStyles = createJSStyle({
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
