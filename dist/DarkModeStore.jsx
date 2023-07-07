import React, { useEffect } from "react";
export const DarkModeContext = React.createContext({
    enabled: false,
    toggle: () => { },
});
export function DarkModeProvider({ children, enabled, toggle, }) {
    useEffect(() => {
        const statusBarMeta = document.head.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        const themeColorMeta = document.head.querySelector('meta[name="theme-color"]');
        if (enabled) {
            document.body.classList.add("dark-mode");
            if (statusBarMeta != null) {
                // @ts-ignore
                statusBarMeta.content = "black-translucent";
            }
            if (themeColorMeta != null) {
                // @ts-ignore
                themeColorMeta.content = "rgb(42, 43, 46)";
            }
        }
        else {
            document.body.classList.remove("dark-mode");
            if (statusBarMeta != null) {
                // @ts-ignore
                statusBarMeta.content = "default";
            }
            if (themeColorMeta != null) {
                // @ts-ignore
                themeColorMeta.content = "rgb(239, 239, 244)";
            }
        }
    }, [enabled]);
    return (<DarkModeContext.Provider value={{ enabled, toggle }}>
      {children}
    </DarkModeContext.Provider>);
}
//# sourceMappingURL=DarkModeStore.jsx.map