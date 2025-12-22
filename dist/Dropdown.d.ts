import React from "react";
import { Gap, JSStyle, Padding, Size } from "./jss";
export declare function Dropdown<T extends string | number>({ id, label, options, selection, setSelection, jss, jssButton, optionLabel, padding, size, gap, }: {
    id?: string;
    label: string;
    options: Set<T>;
    setSelection: (selection: T) => void;
    selection: T;
    jss?: JSStyle;
    jssButton?: JSStyle;
    optionLabel: (option: T) => string;
    padding?: Padding;
    gap?: Gap;
    size?: Size;
}): React.JSX.Element;
