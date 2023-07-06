/// <reference types="react" />
export declare const Dialog: ({ label, children, close, }: {
    label: string;
    children: JSX.Element;
    close: () => void;
}) => JSX.Element;
export declare function DialogProvider({ children }: {
    children: any;
}): JSX.Element;
export declare function useDialog<Input>(DialogComponent: (props: {
    close: () => void;
} & Input) => JSX.Element, options: {
    closeOnOutsideClick: boolean;
}): {
    open: (input: Input) => void;
    close: () => any;
};
