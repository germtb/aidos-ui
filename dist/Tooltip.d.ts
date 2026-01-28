import React from "react";
import { JSS } from "./jss";
interface TooltipProps {
    content: string;
    jss?: JSS;
    className?: undefined;
    tag?: keyof HTMLElementTagNameMap;
    children: React.JSX.Element;
}
export declare function Tooltip({ content, jss, tag, children }: TooltipProps): import("react/jsx-runtime").JSX.Element;
export {};
