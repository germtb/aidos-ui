import React from "react";
import { Gap, JSStyle, Padding, Size } from "./jss";
export declare function Dropdown<T extends string | number>({ id, label, options, selection, setSelection, jsStyle, jsStyleButton, optionLabel, padding, size, gap, }: {
    id?: string;
    label: string;
    options: Set<T>;
    setSelection: (selection: T) => void;
    selection: T;
    jsStyle?: JSStyle;
    jsStyleButton?: JSStyle;
    optionLabel: (option: T) => string;
    padding?: Padding;
    gap?: Gap;
    size?: Size;
}): React.JSX.Element;
