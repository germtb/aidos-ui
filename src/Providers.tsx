import React, { useEffect } from "react";
import { DarkModeProvider } from "./DarkModeStore";
import { DialogProvider } from "./Dialog";
import { initializeIcons } from "./Icon";
import { useCookie } from "./useCookie";

export function Providers({ children }: { children: JSX.Element }) {
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
    <DarkModeProvider enabled={darkModeEnabled} toggle={toggleDarkMode}>
      <DialogProvider>{children}</DialogProvider>
    </DarkModeProvider>
  );
}
