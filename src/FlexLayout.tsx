import React from "react";

import { BaseView, BaseViewProps } from "./BaseView";
import {
  Justify,
  Gap,
  Align,
  Padding,
  FlexDirection,
  getFlex,
  getPadding,
  getGap,
  getJustify,
  getAlign,
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
          getFlex(direction),
          getPadding(padding),
          getGap(gap),
          getJustify(justify),
          getAlign(align),
          jsStyle,
        ]}
        {...otherProps}
      />
    );
  }
);
