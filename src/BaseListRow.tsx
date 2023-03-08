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
    overflowX: "auto",
  },
});

export const BaseListRow = React.forwardRef(
  (
    {
      componentName,
      children,
      jsStyle,
      withDivider = true,
      backgroundColor = "primary-background",
      padding,
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
          padding={padding}
          componentName={componentName.concat("BaseListRow")}
          jsStyle={[jsStyles.root, getBackground(backgroundColor), jsStyle]}
        >
          {children}
        </Row>
        {withDivider && <ListDivider />}
      </>
    );
  }
);
