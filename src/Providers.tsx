import React, { ReactElement, useEffect } from "react";
import { DarkModeProvider } from "./DarkMode";
import { DialogProvider } from "./Dialog";
import { IconProvider } from "./Icon";
import { useCookie } from "./useCookie";
import { JSSProvider, Theme } from "./jss";

export function Providers({
  children,
  themes,
}: {
  children: JSX.Element;
  themes: { light: Theme; dark: Theme };
}) {
  const [darkModeEnabled, setDarkModeEnabled] = useCookie("dark-mode", {
    initialValue: false,
    loadingValue: false,
  });
  const toggleDarkMode = React.useCallback(
    () => setDarkModeEnabled((x) => !x),
    []
  );

  return (
    <JSSProvider themes={themes}>
      <IconProvider>
        <DarkModeProvider enabled={darkModeEnabled} toggle={toggleDarkMode}>
          <DialogProvider>{children}</DialogProvider>
        </DarkModeProvider>
      </IconProvider>
    </JSSProvider>
  );
}
