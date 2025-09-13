import React from "react";
export declare const Dialog: ({ label, children, close, }: {
    label: string;
    children: JSX.Element;
    close: () => void;
}) => React.JSX.Element;
export declare function DialogProvider({ children }: {
    children: any;
}): React.JSX.Element;
export declare function useDialog<Input>(DialogComponent: (props: {
    close: () => void;
} & Input) => JSX.Element, options: {
    closeOnOutsideClick: boolean;
}): {
    open: (input: Input) => void;
    close: () => any;
};
