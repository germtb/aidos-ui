import React from "react";
import { JSStyles, createJSStyles, background, Color } from "./Palette";
import { ListDivider } from "./ListDivider";
import { Row, RowProps } from "./Row";

export interface BaseListRowProps extends RowProps {
  jsStyle?: JSStyles;
  withDivider?: boolean;
  role?: undefined;
  backgroundColor?: Color;
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
          componentName={componentName.concat("BaseListRow")}
          jsStyle={[jsStyles.root, background(backgroundColor), jsStyle]}
        >
          {children}
        </Row>
        {withDivider && <ListDivider />}
      </>
    );
  }
);
