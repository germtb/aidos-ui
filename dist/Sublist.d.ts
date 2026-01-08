import React, { ReactNode } from "react";
import { JSS } from "./jss";
export declare function Sublist({ children, label, labelBold, initialState, jss, secondaryAddOn, }: {
    children: React.ReactNode;
    label: string;
    labelBold?: boolean;
    initialState?: {
        collapsed: boolean;
    };
    jss?: JSS;
    secondaryAddOn?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
