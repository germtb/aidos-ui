import React, {
  ReactNode,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { BaseView } from "./BaseView";
import { isServer } from "./isServer";
import { Toggle } from "./Toggle";

type State = {
  enabled: boolean;
  toggle: () => void;
};

export const DarkModeContext = React.createContext<State>({
  enabled: false,
  toggle: () => {},
});

const subscribeToNothing = () => () => {};

if (!isServer()) {
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

export function DarkModeProvider({
  children,
  enabled,
  toggle,
}: {
  children: ReactNode;
  enabled: boolean;
  toggle: () => void;
}) {
  useEffect(() => {
    const statusBarMeta = document.head.querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-status-bar-style"]',
    );
    const themeColorMeta = document.head.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

    if (enabled) {
      document.body.classList.add("dark-mode");
      if (statusBarMeta != null) {
        statusBarMeta.content = "black-translucent";
      }
      if (themeColorMeta != null) {
        themeColorMeta.content = "rgb(42, 43, 46)";
      }
    } else {
      document.body.classList.remove("dark-mode");
      if (statusBarMeta != null) {
        statusBarMeta.content = "default";
      }
      if (themeColorMeta != null) {
        themeColorMeta.content = "rgb(248, 248, 250)";
      }
    }
  }, [enabled]);

  return (
    <DarkModeContext.Provider value={{ enabled, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function DarkModeToggle() {
  const darkMode = useContext(DarkModeContext);
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  if (!isClient) {
    return <BaseView jss={{ width: 34, height: 34 }} />;
  }

  return (
    <Toggle
      label="Toggle dark mode"
      value={darkMode.enabled}
      onValueChange={darkMode.toggle}
      onIcon="sun"
      offIcon="moon"
      bare
    />
  );
}
