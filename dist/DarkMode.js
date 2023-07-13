import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "./IconButton";
import { BaseView } from "./BaseView";
export const DarkModeContext = React.createContext({
    enabled: false,
    toggle: () => { },
});
if (typeof window !== "undefined") {
    const darkMode = document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c.startsWith("dark-mode="))
        .map((s) => s.split("=")[1])
        .map((s) => s)
        .pop();
    if (darkMode === "true") {
        document.body.classList.add("dark-mode");
    }
}
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
    return (React.createElement(DarkModeContext.Provider, { value: { enabled, toggle } }, children));
}
export function DarkModeToggle() {
    const darkMode = useContext(DarkModeContext);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    if (!show) {
        return React.createElement(BaseView, { jsStyle: { width: 32, height: 32 } });
    }
    return (React.createElement(IconButton, { icon: darkMode.enabled ? "fa-sun-o" : "fa-moon-o", size: "medium", onClick: darkMode.toggle, color: "secondary", bare: true }));
}
//# sourceMappingURL=DarkMode.js.map