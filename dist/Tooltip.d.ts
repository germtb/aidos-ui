import React from "react";
import { JSStyle } from "./jss";
interface TooltipProps {
    content: string;
    jsStyle?: JSStyle;
    className?: undefined;
    tag?: keyof HTMLElementTagNameMap;
    children: JSX.Element;
}
export declare function Tooltip({ content, jsStyle, tag, children }: TooltipProps): React.JSX.Element;
export {};
