import React, { ReactNode } from "react";
import { JSStyle } from "./jss";
export declare function Sublist({ children, label, initialState, jsStyle, secondaryAddOn, bare, }: {
    bare?: boolean;
    children: React.ReactNode;
    label: string;
    initialState?: {
        collapsed: boolean;
    };
    jsStyle?: JSStyle;
    secondaryAddOn?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
