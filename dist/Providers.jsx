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
    return (<JSStylesProvider themes={themes}>
      <IconProvider>
        <DarkModeProvider enabled={darkModeEnabled} toggle={toggleDarkMode}>
          <DialogProvider>{children}</DialogProvider>
        </DarkModeProvider>
      </IconProvider>
    </JSStylesProvider>);
}
//# sourceMappingURL=Providers.jsx.map