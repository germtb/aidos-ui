import React from "react";
import { Theme } from "./jss";
export declare function Providers({ children, themes, }: {
    children: JSX.Element;
    themes: {
        light: Theme;
        dark: Theme;
    };
}): React.JSX.Element;
