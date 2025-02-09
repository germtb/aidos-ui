import React from "react";
import { Color, Size, JSStyle } from "./jss";
export declare function ProgressBar({ color, progress, size, jsStyle, }: {
    progress: number;
    color: Color;
    size: Size;
    jsStyle?: JSStyle;
}): React.JSX.Element;
