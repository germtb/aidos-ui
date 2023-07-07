/// <reference types="react" />
import { Color, Size, JSStyle } from "./JSS";
export declare function ProgressBar({ color, progress, size, jsStyle, }: {
    progress: number;
    color: Color;
    size: Size;
    jsStyle?: JSStyle;
}): JSX.Element;
