import React from "react";
import { IconType } from "./IconType";
import { Size, TextColor } from "./jss";
export declare function IconProvider({ children }: {
    children: React.JSX.Element;
}): React.JSX.Element;
export declare function Icon({ icon, size, color, ariaLabel, }: {
    ariaLabel?: string;
    icon: IconType;
    size: Size;
    color: TextColor;
}): import("react/jsx-runtime").JSX.Element;
