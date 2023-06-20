import React from "react";
import { BaseView, BaseViewProps } from "./BaseView";

export interface BaseListAddOnProps extends BaseViewProps {}

export const BaseListAddOn = React.forwardRef(
  (props: BaseListAddOnProps, ref?: React.Ref<HTMLDivElement>) => {
    return <BaseView {...props} ref={ref} />;
  }
);
