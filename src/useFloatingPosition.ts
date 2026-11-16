import { useCallback, useRef, type RefObject } from "react";
import { useRefEffect } from "./useRefEffect";

export type Placement = "top" | "bottom" | "left" | "right";
export type OverlayAlign = "start" | "center" | "end";

// Native popovers escape clipping without taking focus; fixed positioning also works without that API.
export function useFloatingPosition(
  anchor: RefObject<HTMLElement | null>,
  placement: Placement,
  align: OverlayAlign,
  onClose: () => void,
) {
  const reference = useRef(anchor);
  reference.current = anchor;
  const close = useRef(onClose);
  close.current = onClose;
  return useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        const toggle = () => {
          if (!element.matches(":popover-open")) close.current();
        };
        // Native listeners also receive popover dismissal in React 18.
        element.addEventListener("toggle", toggle);
        element.showPopover?.();
        const update = () => {
          if (!reference.current.current) return;
          const rect = reference.current.current.getBoundingClientRect();
          const viewport = window.visualViewport;
          const left = viewport?.offsetLeft ?? 0;
          const top = viewport?.offsetTop ?? 0;
          const width = viewport?.width ?? window.innerWidth;
          const height = viewport?.height ?? window.innerHeight;
          const gap = 8;
          const edge = 12;
          element.style.setProperty(
            "--aidos-overlay-width",
            `${Math.max(0, width - edge * 2)}px`,
          );
          element.style.setProperty(
            "--aidos-overlay-height",
            `${Math.max(0, height - edge * 2)}px`,
          );
          const box = element.getBoundingClientRect();
          const space = {
            top: rect.top - top,
            bottom: top + height - rect.bottom,
            left: rect.left - left,
            right: left + width - rect.right,
          };
          const opposite: Record<Placement, Placement> = {
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left",
          };
          const vertical = placement === "top" || placement === "bottom";
          const required = (vertical ? box.height : box.width) + gap + edge;
          const side =
            space[placement] < required &&
            space[opposite[placement]] > space[placement]
              ? opposite[placement]
              : placement;
          const cross = (start: number, size: number, own: number) =>
            align === "start"
              ? start
              : align === "end"
                ? start + size - own
                : start + (size - own) / 2;
          const available = Math.max(0, space[side] - gap - edge);
          element.style.setProperty(
            vertical ? "--aidos-overlay-height" : "--aidos-overlay-width",
            `${available}px`,
          );
          // Constraining width can wrap text and change its height.
          const { width: boxWidth, height: boxHeight } =
            element.getBoundingClientRect();
          const x = vertical
            ? cross(rect.left, rect.width, boxWidth)
            : side === "left"
              ? rect.left - boxWidth - gap
              : rect.right + gap;
          const y = vertical
            ? side === "top"
              ? rect.top - boxHeight - gap
              : rect.bottom + gap
            : cross(rect.top, rect.height, boxHeight);
          element.style.left = `${Math.max(left + edge, Math.min(x, left + width - boxWidth - edge))}px`;
          element.style.top = `${Math.max(top + edge, Math.min(y, top + height - boxHeight - edge))}px`;
          element.dataset.placement = side;
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        if (reference.current.current)
          observer.observe(reference.current.current);
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        window.visualViewport?.addEventListener("resize", update);
        window.visualViewport?.addEventListener("scroll", update);
        return () => {
          element.removeEventListener("toggle", toggle);
          observer.disconnect();
          window.removeEventListener("resize", update);
          window.removeEventListener("scroll", update, true);
          window.visualViewport?.removeEventListener("resize", update);
          window.visualViewport?.removeEventListener("scroll", update);
        };
      },
      [placement, align],
    ),
  );
}
