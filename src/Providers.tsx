import React, { useEffect } from "react";
import { DarkModeProvider } from "./DarkModeStore";
import { DialogProvider } from "./Dialog";
import { initialize } from "./Icon";
import { darkTheme, lightTheme, PaletteProvider } from "./Palette";
import { useCookie } from "./useCookie";

export function Providers({ children }) {
  const [darkModeEnabled, setDarkModeEnabled] = useCookie("dark-mode", {
    initialValue: true,
  });
  const toggleDarkMode = React.useCallback(
    () => setDarkModeEnabled((x) => !x),
    []
  );

  useEffect(() => {
    initialize();
  }, []);

  return (
    <PaletteProvider themes={{ light: lightTheme, dark: darkTheme }}>
      <DarkModeProvider enabled={darkModeEnabled} toggle={toggleDarkMode}>
        <DialogProvider>{children}</DialogProvider>
      </DarkModeProvider>
    </PaletteProvider>
  );
}
