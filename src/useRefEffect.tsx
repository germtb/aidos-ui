import { useCallback, useRef } from "react";

export function useRefEffect<T>(
  callback: (root: T) => (() => void) | void,
): (root: T) => void {
  const unsubscribeRef = useRef<(() => void) | void>(null);

  return useCallback(
    (root: T | null) => {
      if (root === null) {
        const unsubscribe = unsubscribeRef.current;
        if (unsubscribe) {
          unsubscribe();
        }
        unsubscribeRef.current = null;
      } else {
        unsubscribeRef.current = callback(root);
      }
    },
    [callback],
  );
}
