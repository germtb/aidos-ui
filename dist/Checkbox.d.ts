/// <reference types="react" />
import { BaseInputProps } from "./BaseInput";
import { Size } from "./JSS";
interface CheckboxProps extends BaseInputProps {
    checked: boolean;
    onValueChange: (value: boolean) => void;
    size: Size;
    value?: undefined;
    onChange?: undefined;
}
export declare function Checkbox({ jsStyle, checked, onValueChange, size, ...inputProps }: CheckboxProps): JSX.Element;
export {};
