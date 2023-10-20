/// <reference types="react" />
import { JSStyle } from "./jss";
export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    value: string;
    onValueChange: (value: string) => void;
    jsStyle?: JSStyle;
    ref?: React.Ref<HTMLSelectElement>;
    className?: undefined;
}
export declare const Select: import("react").ForwardRefExoticComponent<Omit<SelectProps, "ref"> & import("react").RefAttributes<HTMLSelectElement>>;
