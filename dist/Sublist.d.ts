import React, { ReactNode } from "react";
import { JSStyles } from "./Styles";
export declare function Sublist({ children, label, initialState, jsStyle, secondaryAddOn, }: {
    children: React.ReactNode;
    label: string;
    initialState?: {
        collapsed: boolean;
    };
    jsStyle?: JSStyles;
    secondaryAddOn?: ReactNode;
}): JSX.Element;
