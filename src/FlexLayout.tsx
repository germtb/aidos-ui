import React from "react";

import { BaseView, BaseViewProps } from "./BaseView";
import {
  Justify,
  Gap,
  Align,
  Padding,
  FlexDirection,
  Surface,
  getPadding,
  getSpacing,
  getSurface,
} from "./jss";

export interface FlexLayoutProps extends BaseViewProps {
  justify?: Justify;
  gap?: Gap;
  align?: Align;
  padding?: Padding;
  direction?: FlexDirection;
  surface?: Surface;
  basis?: string | number;
}

export const FlexLayout = React.forwardRef(function FlexLayout(
  {
    jss,
    gap = "none",
    justify = "none",
    align = "none",
    padding = "none",
    direction = "column",
    surface,
    basis,
    ...otherProps
  }: FlexLayoutProps,
  ref?: React.Ref<HTMLElement>,
) {
  return (
    <BaseView
      ref={ref}
      jss={[
        {
          display: "flex",
          flexDirection: direction,
          gap: getSpacing(gap),
          justifyContent: justify,
          alignItems: align,
          minWidth: 0,
          ...(basis != null
            ? { flexBasis: typeof basis === "number" ? `${basis}px` : basis }
            : {}),
        },
        getPadding(padding),
        surface && getSurface(surface),
        jss,
      ]}
      {...otherProps}
    />
  );
});
