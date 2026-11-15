import { useCallback } from "react";
import { queryFocusables, focusElement, normalizeElements } from "./aria";
import { useRefEffect } from "./useRefEffect";

export function useNavigation({
  autofocus = false,
  rowLength = 1,
  enabled = true,
  initialIndex = 0,
  orientation = "both",
}: {
  autofocus?: boolean;
  rowLength?: number;
  enabled?: boolean;
  initialIndex?: number;
  orientation?: "horizontal" | "vertical" | "both";
} = {}) {
  return useRefEffect(
    useCallback(
      (root: HTMLElement) => {
        if (!enabled) return;
        let current: HTMLElement;
        const normalize = () => {
          const elements = queryFocusables(root);
          const activeIndex = elements.indexOf(
            document.activeElement as HTMLElement,
          );
          const previousIndex = elements.indexOf(current);
          const index =
            activeIndex >= 0
              ? activeIndex
              : previousIndex >= 0
                ? previousIndex
                : initialIndex;
          normalizeElements(elements, index);
          current = elements.find((element) => element.tabIndex === 0);
        };
        normalize();
        if (autofocus) current?.focus();
        const focusin = () => normalize();
        const keydown = (event: KeyboardEvent) => {
          if (
            event.defaultPrevented ||
            event.isComposing ||
            event.altKey ||
            event.metaKey ||
            event.ctrlKey
          )
            return;
          const target = event.target as HTMLElement;
          if (
            target.matches('input, textarea, select, [contenteditable="true"]')
          )
            return;
          const elements = queryFocusables(root);
          if (!elements.length) return;
          const index = Math.max(
            0,
            elements.indexOf(document.activeElement as HTMLElement),
          );
          let next: number;
          if (event.key === "Home") next = 0;
          else if (event.key === "End") next = elements.length - 1;
          else if (orientation !== "horizontal" && event.key === "ArrowDown")
            next = index + rowLength;
          else if (orientation !== "horizontal" && event.key === "ArrowUp")
            next = index - rowLength;
          else if (orientation !== "vertical" && event.key === "ArrowRight")
            next = index + 1;
          else if (orientation !== "vertical" && event.key === "ArrowLeft")
            next = index - 1;
          else return;
          event.preventDefault();
          event.stopPropagation();
          focusElement(
            elements,
            ((next % elements.length) + elements.length) % elements.length,
          );
        };
        root.addEventListener("focusin", focusin);
        root.addEventListener("keydown", keydown);
        const observer = new MutationObserver(normalize);
        observer.observe(root, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["disabled", "aria-disabled", "hidden", "inert"],
        });
        return () => {
          observer.disconnect();
          root.removeEventListener("focusin", focusin);
          root.removeEventListener("keydown", keydown);
        };
      },
      [autofocus, rowLength, enabled, initialIndex, orientation],
    ),
  );
}
