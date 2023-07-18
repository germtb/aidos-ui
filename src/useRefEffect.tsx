import { useRef, useCallback, useEffect } from "react";

export function useRefEffect(
  callback: (root: HTMLElement) => (() => void) | void
): (root: HTMLElement) => void {
  const unsubscribeRef = useRef<(() => void) | void>(null);

  const refCallback = useCallback((root: HTMLElement | null) => {
    if (root === null) {
      unsubscribeRef.current && unsubscribeRef.current();
    } else {
      const unsubscribe = callback(root);
      unsubscribeRef.current = unsubscribe;
    }
  }, []);

  return refCallback;
}
