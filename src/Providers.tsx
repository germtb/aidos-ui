import React, { useEffect } from "react";
import { DarkModeProvider } from "./DarkModeStore";
import { DialogProvider } from "./Dialog";
import { initializeIcons } from "./Icon";
import { darkTheme, lightTheme, StylesProvider, Theme } from "./Styles";
import { useCookie } from "./useCookie";

export function Providers({
  children,
  themes = { light: lightTheme, dark: darkTheme },
}: {
  children: JSX.Element;
  themes?: { light: Theme; dark: Theme };
}) {
  const [darkModeEnabled, setDarkModeEnabled] = useCookie("dark-mode", {
    initialValue: false,
    loadingValue: false,
  });
  const toggleDarkMode = React.useCallback(
    () => setDarkModeEnabled((x) => !x),
    []
  );

  useEffect(() => {
    initializeIcons();
  }, []);

  return (
    <StylesProvider themes={themes}>
      <DarkModeProvider enabled={darkModeEnabled} toggle={toggleDarkMode}>
        <DialogProvider>{children}</DialogProvider>
      </DarkModeProvider>
    </StylesProvider>
  );
}
