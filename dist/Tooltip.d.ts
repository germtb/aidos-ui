/// <reference types="react" />
import { JSStyles } from "./Palette";
interface TooltipProps {
    content: string;
    jsStyle?: JSStyles;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: JSX.Element;
}
export declare function Tooltip({ content, jsStyle, grow, shrink, tag, children, }: TooltipProps): JSX.Element;
export {};
