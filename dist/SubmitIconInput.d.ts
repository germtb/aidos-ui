import React from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
interface SubmitIconInputProps extends BaseInputProps {
    icon: IconType;
    type?: "submit";
}
export declare function SubmitIconInput({ icon, ...otherProps }: SubmitIconInputProps): React.JSX.Element;
export {};
