/// <reference types="react" />
export declare function Dialog({ label, children, close }: {
    label: any;
    children: any;
    close: any;
}): JSX.Element;
export declare function DialogProvider({ children }: {
    children: any;
}): JSX.Element;
export declare function useDialog<Input>(DialogComponent: (props: {
    close: () => void;
} & Input) => JSX.Element): {
    open: (input: Input) => void;
    close: () => void;
};
