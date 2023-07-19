import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { DarkModeProvider } from "./DarkMode";
import { DialogProvider } from "./Dialog";
import { IconProvider } from "./Icon";
import { useCookie } from "./useCookie";
import { JSStylesProvider } from "./jss";
export function Providers({ children, themes, }) {
    const [darkModeEnabled, setDarkModeEnabled] = useCookie("dark-mode", {
        initialValue: false,
        loadingValue: false,
    });
    const toggleDarkMode = React.useCallback(() => setDarkModeEnabled((x) => !x), []);
    return (_jsx(JSStylesProvider, { themes: themes, children: _jsx(IconProvider, { children: _jsx(DarkModeProvider, { enabled: darkModeEnabled, toggle: toggleDarkMode, children: _jsx(DialogProvider, { children: children }) }) }) }));
}
//# sourceMappingURL=Providers.js.map