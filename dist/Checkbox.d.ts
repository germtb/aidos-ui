import React from "react";
import { BaseInputProps } from "./BaseInput";
import { Size } from "./jss";
interface CheckboxProps extends BaseInputProps {
    checked: boolean;
    onClick: () => void;
    size: Size;
    value?: undefined;
    onChange?: undefined;
}
export declare function Checkbox({ checked, onClick, size, ...inputProps }: CheckboxProps): React.JSX.Element;
export {};
