import React from "react";
import { BaseViewProps } from "./BaseView";
import { Justify, Gap, Align, Padding, FlexDirection } from "./jss";
export interface FlexLayoutProps extends BaseViewProps {
    justify?: Justify;
    gap?: Gap;
    align?: Align;
    padding?: Padding;
    direction?: FlexDirection;
}
export declare const FlexLayout: React.ForwardRefExoticComponent<Omit<FlexLayoutProps, "ref"> & React.RefAttributes<HTMLElement>>;
