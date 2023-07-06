import React from "react";
import {
  Align,
  FlexDirection,
  getAlign,
  getFlex,
  getPadding,
  getJustify,
  getGap,
  Padding,
  Justify,
  Gap,
} from "./Styles";
import { BaseView, BaseViewProps } from "./BaseView";

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
