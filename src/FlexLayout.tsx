import React from "react";
import {
  Align,
  FlexDirection,
  getAlign,
  getFlex,
  getIndentation,
  getJustify,
  getSpacing,
  Indentation,
  Justify,
  Spacing,
} from "./Palette";
import { BaseView, BaseViewProps } from "./BaseView";

export interface FlexLayoutProps extends BaseViewProps {
  justify?: Justify;
  spacing?: Spacing;
  align?: Align;
  indentation?: Indentation;
  direction?: FlexDirection;
}

export const FlexLayout = React.forwardRef(
  (
    {
      jsStyle,
      spacing = "none",
      justify = "none",
      align = "none",
      indentation = "none",
      direction = "column",
      componentName = [],
      ...otherProps
    }: FlexLayoutProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    return (
      <BaseView
        ref={ref}
        componentName={componentName.concat("FlexLayout")}
        jsStyle={[
          getFlex(direction),
          getIndentation(indentation),
          getSpacing(spacing),
          getJustify(justify),
          getAlign(align),
          jsStyle,
        ]}
        {...otherProps}
      />
    );
  }
);
