/// <reference types="react" />
import { JSStyles } from "./Styles";
export declare function Dropdown<T>({ id, label, options, selection, setSelection, jsStyle, }: {
    id?: string;
    label: string;
    options: Set<T>;
    setSelection: (selection: T) => void;
    selection: T;
    jsStyle?: JSStyles;
}): JSX.Element;
