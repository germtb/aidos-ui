import React from "react";
import { BaseInputProps } from "./BaseInput";
export interface TextInputWithStateProps extends BaseInputProps {
    onValueChange?: (value: string) => void;
    valueRef: React.MutableRefObject<string>;
    onChange?: undefined;
}
export declare function TextInputWithState({ valueRef, onValueChange: externalOnChange, ...otherProps }: TextInputWithStateProps): import("react/jsx-runtime").JSX.Element;
