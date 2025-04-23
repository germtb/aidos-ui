import React from "react";
import { JSStyle } from "./jss";
export declare function Dropdown<T>({ id, label, options, selection, setSelection, jsStyle, }: {
    id?: string;
    label: string;
    options: Set<T>;
    setSelection: (selection: T) => void;
    selection: T;
    jsStyle?: JSStyle;
}): React.JSX.Element;
