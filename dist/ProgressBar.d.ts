/// <reference types="react" />
import { Color, JSStyles, Size } from "./Palette";
export declare function ProgressBar({ color, progress, size, jsStyle, }: {
    progress: number;
    color: Color;
    size: Size;
    jsStyle?: JSStyles;
}): JSX.Element;
