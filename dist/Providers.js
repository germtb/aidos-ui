import React, { useEffect } from "react";
import { DarkModeProvider } from "./DarkModeStore";
import { DialogProvider } from "./Dialog";
import { initializeIcons } from "./Icon";
import { darkTheme, lightTheme, StylesProvider } from "./Styles";
import { useCookie } from "./useCookie";
export function Providers({ children, themes = { light: lightTheme, dark: darkTheme }, }) {
    const [darkModeEnabled, setDarkModeEnabled] = useCookie("dark-mode", {
        initialValue: false,
        loadingValue: false,
    });
    const toggleDarkMode = React.useCallback(() => setDarkModeEnabled((x) => !x), []);
    useEffect(() => {
        initializeIcons();
    }, []);
    return (React.createElement(StylesProvider, { themes: themes },
        React.createElement(DarkModeProvider, { enabled: darkModeEnabled, toggle: toggleDarkMode },
            React.createElement(DialogProvider, null, children))));
}
//# sourceMappingURL=Providers.js.map