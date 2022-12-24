import React, { ReactNode } from "react";
import { JSStyles } from "./Palette";
export declare function Sublist({ children, label, initialState, jsStyle, primaryAddOn, secondaryAddOn, }: {
    children: React.ReactNode;
    label: string;
    initialState?: {
        collapsed: boolean;
    };
    jsStyle?: JSStyles;
    primaryAddOn?: ReactNode;
    secondaryAddOn?: ReactNode;
}): JSX.Element;
