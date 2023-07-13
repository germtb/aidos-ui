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
    return (React.createElement(JSStylesProvider, { themes: themes },
        React.createElement(IconProvider, null,
            React.createElement(DarkModeProvider, { enabled: darkModeEnabled, toggle: toggleDarkMode },
                React.createElement(DialogProvider, null, children)))));
}
//# sourceMappingURL=Providers.js.map