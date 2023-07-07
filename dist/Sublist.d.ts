import React, { ReactNode } from "react";
import { JSStyle } from "./JSS";
export declare function Sublist({ children, label, initialState, jsStyle, secondaryAddOn, }: {
    children: React.ReactNode;
    label: string;
    initialState?: {
        collapsed: boolean;
    };
    jsStyle?: JSStyle;
    secondaryAddOn?: ReactNode;
}): JSX.Element;
