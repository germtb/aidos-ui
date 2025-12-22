import React from "react";
import { JSStyle } from "./jss";
interface TooltipProps {
    content: string;
    jss?: JSStyle;
    className?: undefined;
    tag?: keyof HTMLElementTagNameMap;
    children: JSX.Element;
}
export declare function Tooltip({ content, jss, tag, children }: TooltipProps): React.JSX.Element;
export {};
