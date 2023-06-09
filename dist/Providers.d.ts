/// <reference types="react" />
import { Theme } from "./Palette";
export declare function Providers({ children, themes, }: {
    children: JSX.Element;
    themes?: {
        light: Theme;
        dark: Theme;
    };
}): JSX.Element;
