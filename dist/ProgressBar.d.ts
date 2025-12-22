import React from "react";
import { Color, Size, JSStyle } from "./jss";
export declare function ProgressBar({ color, progress, size, jss, }: {
    progress: number;
    color: Color;
    size: Size;
    jss?: JSStyle;
}): React.JSX.Element;
