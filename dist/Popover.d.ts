import React from "react";
import { JSS } from "./jss";
export declare function Popover({ children, close }: {
    children: any;
    close: any;
}): import("react/jsx-runtime").JSX.Element;
interface PopoverTriggerProps<Input> {
    PopoverComponent: (props: {
        close: () => void;
    } & Input) => React.JSX.Element;
    jss?: JSS;
    jssDialog?: JSS;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: (props: {
        toggle: (input: Input) => void;
    }) => React.JSX.Element;
}
export declare function PopoverTrigger<Input>({ PopoverComponent, jss, jssDialog, grow, shrink, tag, children, }: PopoverTriggerProps<Input>): import("react/jsx-runtime").JSX.Element;
export {};
