/// <reference types="react" />
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
interface SubmitIconInputProps extends BaseInputProps {
    icon: IconType;
    type?: "submit";
}
export declare function SubmitIconInput({ icon, ...otherProps }: SubmitIconInputProps): JSX.Element;
export {};
