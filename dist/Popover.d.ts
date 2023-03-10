/// <reference types="react" />
import { JSStyles } from "./Palette";
export declare function Popover({ children, close }: {
    children: any;
    close: any;
}): JSX.Element;
interface PopoverTriggerProps<Input> {
    PopoverComponent: (props: {
        close: () => void;
    } & Input) => JSX.Element;
    jsStyle?: JSStyles;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    tag?: keyof HTMLElementTagNameMap;
    children: (props: {
        open: (input: Input) => void;
        close: () => void;
        isOpen: boolean;
    }) => JSX.Element;
}
export declare function PopoverTrigger<Input>({ PopoverComponent, jsStyle, className, grow, shrink, tag, children, }: PopoverTriggerProps<Input>): JSX.Element;
export {};
