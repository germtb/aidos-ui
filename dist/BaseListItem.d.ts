import React, { ReactNode } from "react";
import { RowProps } from "./Row";
import { JSStyle, Size, Position, Spacing, TextColor } from "./jss";
export interface BaseListItemProps extends RowProps {
    children: (elements: {
        content: JSX.Element;
    }) => ReactNode;
    jsStyle?: JSStyle;
    withDivider?: boolean;
    headline: string;
    headlineSize?: Size;
    headlineColor?: TextColor;
    headlineAddOn?: ReactNode;
    headlineBold?: boolean;
    body?: string;
    bodySize?: Size;
    bodyColor?: TextColor;
    addOn?: ReactNode;
    addOnPosition?: Position;
    outerAddOn?: ReactNode;
    disabled?: boolean;
    role?: undefined;
    gap?: Spacing;
    selected?: boolean;
    bare?: boolean;
}
export declare const BaseListItem: React.ForwardRefExoticComponent<Omit<BaseListItemProps, "ref"> & React.RefAttributes<HTMLElement>>;
