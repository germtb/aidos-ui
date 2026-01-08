import { Gap, JSS, Padding, Size } from "./jss";
export declare function Dropdown<T extends string | number>({ id, label, options, selection, setSelection, jss, jssButton, optionLabel, padding, size, gap, }: {
    id?: string;
    label: string;
    options: Set<T>;
    setSelection: (selection: T) => void;
    selection: T;
    jss?: JSS;
    jssButton?: JSS;
    optionLabel: (option: T) => string;
    padding?: Padding;
    gap?: Gap;
    size?: Size;
}): import("react/jsx-runtime").JSX.Element;
