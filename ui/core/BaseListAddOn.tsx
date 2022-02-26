import React from "react";
import BaseView, { BaseViewProps } from "./BaseView";

export interface BaseListAddOnProps extends BaseViewProps {}

function BaseListAddOn(
  props: BaseListAddOnProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <BaseView
      componentName={props.componentName ?? "BaseListAddOn"}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(BaseListAddOn);
