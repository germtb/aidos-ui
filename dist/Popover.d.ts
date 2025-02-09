import React from "react";
import { JSStyle } from "./jss";
export declare function Popover({ children, close }: {
    children: any;
    close: any;
}): React.JSX.Element;
interface PopoverTriggerProps<Input> {
    PopoverComponent: (props: {
        close: () => void;
    } & Input) => JSX.Element;
    jsStyle?: JSStyle;
    dialogJSStyle?: JSStyle;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: (props: {
        toggle: (input: Input) => void;
    }) => JSX.Element;
}
export declare function PopoverTrigger<Input>({ PopoverComponent, jsStyle, dialogJSStyle, grow, shrink, tag, children, }: PopoverTriggerProps<Input>): React.JSX.Element;
export {};
