import React, { useLayoutEffect } from "react";
export const DarkModeContext = React.createContext({
    enabled: false,
    toggle: () => { },
});
export function DarkModeProvider({ children, enabled, toggle, }) {
    useLayoutEffect(() => {
        const statusBarMeta = document.head.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        const themeColorMeta = document.head.querySelector('meta[name="theme-color"]');
        if (enabled) {
            document.body.classList.add("dark-mode");
            // @ts-ignore
            statusBarMeta.content = "black-translucent";
            // @ts-ignore
            themeColorMeta.content = "rgb(42, 43, 46)";
        }
        else {
            document.body.classList.remove("dark-mode");
            // @ts-ignore
            statusBarMeta.content = "default";
            // @ts-ignore
            themeColorMeta.content = "rgb(239, 239, 244)";
        }
    }, [enabled]);
    return (React.createElement(DarkModeContext.Provider, { value: { enabled, toggle } }, children));
}
