import React from "react";
import { ColumnProps } from "./Column";
export interface BaseListProps extends ColumnProps {
    tag?: undefined;
}
export declare const BaseList: React.ForwardRefExoticComponent<Omit<BaseListProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
