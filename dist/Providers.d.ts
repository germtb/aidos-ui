/// <reference types="react" />
import { Theme } from "./jss";
export declare function Providers({ children, themes, }: {
    children: JSX.Element;
    themes: {
        light: Theme;
        dark: Theme;
    };
}): JSX.Element;
