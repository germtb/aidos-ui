/// <reference types="react" />
import { Color, JSStyle, Size } from "./Styles";
export declare function ProgressBar({ color, progress, size, jsStyle, }: {
    progress: number;
    color: Color;
    size: Size;
    jsStyle?: JSStyle;
}): JSX.Element;
