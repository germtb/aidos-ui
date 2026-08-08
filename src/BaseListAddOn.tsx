import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";
import { cssVar } from "./jss";

export interface BaseListAddOnProps extends BaseViewProps {}

export const BaseListAddOn = React.forwardRef(function BaseListAddOn(
  { jss, ...otherProps }: BaseListAddOnProps,
  ref?: React.Ref<HTMLDivElement>,
) {
  return (
    <BaseView
      {...otherProps}
      jss={[
        {
          display: "flex",
          minWidth: 34,
          height: 34,
          flexShrink: 0,
          marginInlineEnd: cssVar("--spacing-m"),
          alignItems: "center",
          justifyContent: "center",
        },
        jss,
      ]}
      ref={ref}
    />
  );
});
