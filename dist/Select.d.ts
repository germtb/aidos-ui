/// <reference types="react" />
import { JSS } from "./jss";
export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    value: string;
    onValueChange: (value: string) => void;
    jss?: JSS;
    ref?: React.Ref<HTMLSelectElement>;
    className?: undefined;
}
export declare const Select: import("react").ForwardRefExoticComponent<Omit<SelectProps, "ref"> & import("react").RefAttributes<HTMLSelectElement>>;
