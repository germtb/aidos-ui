import React, { ReactNode } from "react";
import { JSStyle } from "./jss";
export declare function Sublist({ children, label, labelBold, initialState, jsStyle, secondaryAddOn, }: {
    children: React.ReactNode;
    label: string;
    labelBold?: boolean;
    initialState?: {
        collapsed: boolean;
    };
    jsStyle?: JSStyle;
    secondaryAddOn?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
