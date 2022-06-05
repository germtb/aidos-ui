import { useRef, useCallback, useEffect } from "react";

export function useRefEffect(
  callback: (root: HTMLElement) => (() => void) | void
): (root: HTMLElement) => void {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refCallback = useCallback((root: HTMLElement | null) => {
    if (root === null) {
      return;
    }

    unsubscribeRef.current && unsubscribeRef.current();
    const unsubscribe = callback(root);
    if (unsubscribe) {
      unsubscribeRef.current = unsubscribe;
    }
  }, []);

  useEffect(() => {
    return () => unsubscribeRef.current && unsubscribeRef.current();
  }, []);

  return refCallback;
}
