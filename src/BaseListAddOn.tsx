import React from "react";
import BaseView, { BaseViewProps } from "./BaseView";

export interface BaseListAddOnProps extends BaseViewProps {}

function BaseListAddOn(
  { componentName, ...otherProps }: BaseListAddOnProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <BaseView
      {...otherProps}
      ref={ref}
      componentName={(componentName ?? []).concat("BaseListAddOn")}
    />
  );
}

export default React.forwardRef(BaseListAddOn);
