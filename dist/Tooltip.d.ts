/// <reference types="react" />
import { JSStyle } from "./JSS";
interface TooltipProps {
    content: string;
    jsStyle?: JSStyle;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: JSX.Element;
}
export declare function Tooltip({ content, jsStyle, grow, shrink, tag, children, }: TooltipProps): JSX.Element;
export {};
