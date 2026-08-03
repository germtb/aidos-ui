import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";

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
          width: 34,
          height: 34,
          flex: "0 0 34px",
          alignItems: "center",
          justifyContent: "center",
        },
        jss,
      ]}
      ref={ref}
    />
  );
});
