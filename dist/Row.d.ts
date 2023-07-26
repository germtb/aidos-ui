import React from "react";
import { FlexLayoutProps } from "./FlexLayout";
export interface RowProps extends FlexLayoutProps {
    direction?: "row";
}
export declare const Row: React.ForwardRefExoticComponent<Omit<RowProps, "ref"> & React.RefAttributes<HTMLElement>>;
