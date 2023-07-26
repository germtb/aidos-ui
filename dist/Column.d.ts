import React from "react";
import { FlexLayoutProps } from "./FlexLayout";
export interface ColumnProps extends FlexLayoutProps {
    direction?: "column";
}
export declare const Column: React.ForwardRefExoticComponent<Omit<ColumnProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
