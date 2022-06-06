import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";

export interface BaseListAddOnProps extends BaseViewProps {}

export const BaseListAddOn = React.forwardRef(
  (
    { componentName, ...otherProps }: BaseListAddOnProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <BaseView
        {...otherProps}
        ref={ref}
        componentName={(componentName ?? []).concat("BaseListAddOn")}
      />
    );
  }
);
