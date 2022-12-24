import React from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import { ReactNode } from "react";
export interface TextInputWithStateProps extends BaseInputProps {
    onValueChange?: (value: string) => void;
    valueRef: React.MutableRefObject<string>;
    icon?: IconType;
    addOn?: ReactNode | ((setValue: React.Dispatch<React.SetStateAction<string>>) => ReactNode);
    onChange?: undefined;
}
export declare function TextInputWithState({ valueRef, onValueChange: externalOnChange, icon, addOn, ...otherProps }: TextInputWithStateProps): JSX.Element;
