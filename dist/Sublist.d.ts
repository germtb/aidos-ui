import React, { ReactNode } from "react";
import { JSStyle } from "./jss";
export declare function Sublist({ children, label, labelBold, initialState, jss, secondaryAddOn, }: {
    children: React.ReactNode;
    label: string;
    labelBold?: boolean;
    initialState?: {
        collapsed: boolean;
    };
    jss?: JSStyle;
    secondaryAddOn?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
