import React from "react";

import { BaseView, BaseViewProps } from "./BaseView";
import {
  Justify,
  Gap,
  Align,
  Padding,
  FlexDirection,
  getPadding,
  getSpacing,
} from "./jss";

export interface FlexLayoutProps extends BaseViewProps {
  justify?: Justify;
  gap?: Gap;
  align?: Align;
  padding?: Padding;
  direction?: FlexDirection;
}

export const FlexLayout = React.forwardRef(
  (
    {
      jsStyle,
      gap = "none",
      justify = "none",
      align = "none",
      padding = "none",
      direction = "column",
      ...otherProps
    }: FlexLayoutProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    return (
      <BaseView
        ref={ref}
        jsStyle={[
          {
            display: "flex",
            flexDirection: direction,
            gap: getSpacing(gap),
            justifyContent: justify,
            alignItems: align,
            padding: getPadding(padding),
          },
          jsStyle,
        ]}
        {...otherProps}
      />
    );
  }
);
