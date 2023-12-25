import { ReactNode } from "react";
type Props = {
    children: ReactNode;
    isTopOfStack: boolean;
};
export declare function StackContextProvider({ children, isTopOfStack }: Props): import("react/jsx-runtime").JSX.Element;
export declare function useIsTopOfStack(): boolean;
export {};
