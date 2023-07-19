import { useRefEffect } from "./useRefEffect";

export type KeyboardShortcut<T> = {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  action: (root: T) => void;
  onlyWhenFocused?: boolean;
};

export function useKeyboard<T extends HTMLElement>(
  shortcuts: Array<KeyboardShortcut<T>>
) {
  return useRefEffect<T>((root: T) => {
    const onKeyDown = (e: KeyboardEvent) => {
      for (const {
        metaKey,
        key,
        action,
        ctrlKey,
        onlyWhenFocused,
      } of shortcuts) {
        if (metaKey && e.metaKey !== true) {
          continue;
        } else if (ctrlKey && e.ctrlKey !== true) {
          continue;
        } else if (onlyWhenFocused && document.activeElement !== root) {
          continue;
        }

        if (e.key.toLowerCase() === key.toLowerCase()) {
          action(root);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });
}
