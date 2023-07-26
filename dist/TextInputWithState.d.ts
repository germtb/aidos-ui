import React from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
export interface TextInputWithStateProps extends BaseInputProps {
    onValueChange?: (value: string) => void;
    valueRef: React.MutableRefObject<string>;
    icon?: IconType;
    onChange?: undefined;
}
export declare function TextInputWithState({ valueRef, onValueChange: externalOnChange, icon, ...otherProps }: TextInputWithStateProps): import("react/jsx-runtime").JSX.Element;
