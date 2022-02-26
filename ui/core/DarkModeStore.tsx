import React, { useCallback, ReactNode, useLayoutEffect } from "react";
import { useCache, LocalQueryType, useLocalMutation } from "./GraphQLClient";

type State = {
  enabled: boolean;
  toggle: () => void;
};

export type LocalQuerySettings = {
  darkModeEnabled: boolean;
};

export const DarkModeContext = React.createContext<State>({
  enabled: false,
  toggle: () => {},
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const enabled = useCache(
    (cache) => cache[LocalQueryType.Settings].darkModeEnabled,
    []
  );

  const localMutation = useLocalMutation();

  const toggle = useCallback(() => {
    localMutation((cache) => ({
      ...cache,
      [LocalQueryType.Settings]: {
        darkModeEnabled: !cache[LocalQueryType.Settings].darkModeEnabled,
      },
    }));
  }, [localMutation]);

  useLayoutEffect(() => {
    const statusBarMeta = document.head.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );
    const themeColorMeta = document.head.querySelector(
      'meta[name="theme-color"]'
    );

    if (enabled) {
      document.body.classList.add("dark-mode");
      // @ts-ignore
      statusBarMeta.content = "black-translucent";
      // @ts-ignore
      themeColorMeta.content = "rgb(42, 43, 46)";
    } else {
      document.body.classList.remove("dark-mode");
      // @ts-ignore
      statusBarMeta.content = "default";
      // @ts-ignore
      themeColorMeta.content = "rgb(239, 239, 244)";
    }
  }, [enabled]);

  return (
    <DarkModeContext.Provider value={{ enabled, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}
