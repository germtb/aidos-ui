/// <reference types="react" />
import { JSStyles } from "./Palette";
interface TooltipProps {
    TooltipContent: () => JSX.Element;
    jsStyle?: JSStyles;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: JSX.Element;
}
export declare function Tooltip({ TooltipContent, jsStyle, grow, shrink, tag, children, }: TooltipProps): JSX.Element;
export {};
