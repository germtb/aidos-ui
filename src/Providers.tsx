import React from "react";
import { DarkModeProvider } from "./DarkMode";
import { DialogProvider } from "./Dialog";
import { useCookie } from "./useCookie";
import { JSSProvider, Theme } from "./jss";

export function Providers({
  children,
  themes,
}: {
  children: React.JSX.Element;
  themes: { light: Theme; dark: Theme };
}) {
  const [darkModeEnabled, setDarkModeEnabled] = useCookie("dark-mode", {
    initialValue: false,
    loadingValue: false,
  });
  const toggleDarkMode = React.useCallback(
    () => setDarkModeEnabled((x) => !x),
    [setDarkModeEnabled],
  );

  return (
    <JSSProvider themes={themes}>
      <DarkModeProvider enabled={darkModeEnabled} toggle={toggleDarkMode}>
        <DialogProvider>{children}</DialogProvider>
      </DarkModeProvider>
    </JSSProvider>
  );
}
