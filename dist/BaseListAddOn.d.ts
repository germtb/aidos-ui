import React from "react";
import { BaseViewProps } from "./BaseView";
export interface BaseListAddOnProps extends BaseViewProps {
}
export declare const BaseListAddOn: React.ForwardRefExoticComponent<Omit<BaseListAddOnProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
