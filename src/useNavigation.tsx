import { useRef, useCallback, useEffect } from "react";

import { queryFocusables, focusElement, normalizeElements } from "./aria";

export function useNavigation({ autofocus = false } = {}) {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const refCallback = useCallback((root: HTMLElement | null) => {
    if (root === null) {
      return;
    }

    let index = 0;

    const elements = queryFocusables(root);

    if (elements.length !== 0 && autofocus) {
      focusElement(elements, index);
    } else {
      normalizeElements(elements, index);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const elements = queryFocusables(root);

      if (elements.length === 0) {
        return;
      }

      let newIndex: number = -1;

      if (e.code === "ArrowUp") {
        if (index <= 0) {
          newIndex = elements.length - 1;
        } else {
          newIndex = index - 1;
        }
      } else if (e.code === "ArrowLeft") {
        if (index <= 0) {
          newIndex = elements.length - 1;
        } else {
          newIndex = index - 1;
        }
      } else if (e.code === "ArrowRight") {
        if (index >= elements.length - 1) {
          newIndex = 0;
        } else {
          newIndex = index + 1;
        }
      } else if (e.code === "ArrowDown") {
        if (index >= elements.length - 1) {
          newIndex = 0;
        } else {
          newIndex = index + 1;
        }
      }

      if (newIndex !== -1 && index !== newIndex) {
        index = newIndex;
        focusElement(elements, index);
        e.preventDefault();
      }
    };

    root.addEventListener("keydown", onKeyDown);

    unsubscribeRef.current = () => {
      root.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => unsubscribeRef.current && unsubscribeRef.current();
  }, []);

  return refCallback;
}
