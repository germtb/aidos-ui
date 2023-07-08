/// <reference types="react" />
import { JSStyle } from "./jss";
export declare function Popover({ children, close }: {
    children: any;
    close: any;
}): JSX.Element;
interface PopoverTriggerProps<Input> {
    PopoverComponent: (props: {
        close: () => void;
    } & Input) => JSX.Element;
    jsStyle?: JSStyle;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: (props: {
        toggle: (input: Input) => void;
    }) => JSX.Element;
}
export declare function PopoverTrigger<Input>({ PopoverComponent, jsStyle, grow, shrink, tag, children, }: PopoverTriggerProps<Input>): JSX.Element;
export {};
