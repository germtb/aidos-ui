/// <reference types="react" />
import { Size } from "./jss";
import { IconType } from "./IconType";
type StaticCheckboxProps = {
    checked: boolean;
    size: Size;
    icon?: IconType;
};
export declare const sizes: {
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
};
export declare function StaticCheckbox({ checked, size, icon, }: StaticCheckboxProps): JSX.Element;
export {};
