import { useRef, useCallback, useEffect } from "react";

export function useRefEffect<T>(
  callback: (root: T) => (() => void) | void
): (root: T) => void {
  const unsubscribeRef = useRef<(() => void) | void>(null);

  const refCallback = useCallback((root: T | null) => {
    if (root === null) {
      unsubscribeRef.current && unsubscribeRef.current();
    } else {
      const unsubscribe = callback(root);
      unsubscribeRef.current = unsubscribe;
    }
  }, []);

  return refCallback;
}
