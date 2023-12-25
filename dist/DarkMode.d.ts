import React, { ReactNode } from "react";
type State = {
    enabled: boolean;
    toggle: () => void;
};
export declare const DarkModeContext: React.Context<State>;
export declare function DarkModeProvider({ children, enabled, toggle, }: {
    children: ReactNode;
    enabled: boolean;
    toggle: () => void;
}): React.JSX.Element;
export declare function DarkModeToggle(): React.JSX.Element;
export {};
