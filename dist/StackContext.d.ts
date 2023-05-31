import { ReactNode } from "react";
declare type Props = {
    children: ReactNode;
    isTopOfStack: boolean;
};
export declare function StackContextProvider({ children, isTopOfStack }: Props): JSX.Element;
export declare function useIsTopOfStack(): boolean;
export {};
