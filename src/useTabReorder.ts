import { useCallback, useRef, useState } from "react";
import { useRefEffect } from "./useRefEffect";
import { reorderBounds, reorderItems, reorderMotion } from "./reorderMotion";
import type { Tab } from "./Tabs";

export function useTabReorder(
  tabs: Tab[],
  onReorder?: (tabId: string, targetId: string) => void,
) {
  const [preview, setPreview] = useState<string[] | null>(null);
  const [announcement, announce] = useState("");
  const latest = useRef({ tabs, onReorder });
  latest.current = { tabs, onReorder };
  const order = JSON.stringify(tabs.map((tab) => tab.id));
  const enabled = !!onReorder;
  const move = useCallback((id: string, index: number) => {
    const { tabs, onReorder } = latest.current;
    const tab = tabs.find((tab) => tab.id === id);
    const target = tabs[index];
    if (!tab || !target || tab === target) return;
    onReorder?.(id, target.id);
    announce(`${tab.label} moved to position ${index + 1} of ${tabs.length}.`);
  }, []);
  const mount = useRefEffect(
    useCallback(
      (root: HTMLElement) => {
        if (!enabled) return;
        const destroy = reorderMotion(root, {
          axis: "horizontal",
          handleSelector: '[role="tab"]',
          onMove(id, _pointer, center, render) {
            const items = reorderItems(root);
            const source = items.find(
              (item) => item.dataset.aidosReorderItem === id,
            )!;
            const others = items.filter((item) => item !== source);
            const rtl = getComputedStyle(root).direction === "rtl";
            const next = others.findIndex((item) => {
              const box = reorderBounds(item);
              return rtl
                ? center.x > box.left + box.width / 2
                : center.x < box.left + box.width / 2;
            });
            const index = next < 0 ? others.length : next;
            if (items.indexOf(source) === index) return;
            others.splice(index, 0, source);
            render(() =>
              setPreview(others.map((item) => item.dataset.aidosReorderItem!)),
            );
            source
              .querySelector<HTMLElement>('[role="tab"]')
              ?.focus({ preventScroll: true });
          },
          onEnd(id, canceled) {
            if (!canceled)
              move(
                id,
                reorderItems(root).findIndex(
                  (item) => item.dataset.aidosReorderItem === id,
                ),
              );
            else announce("Reordering canceled.");
            setPreview(null);
          },
        });
        return () => {
          destroy();
          setPreview(null);
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps -- Cancel active drags when the controlled order changes.
      [enabled, order, move],
    ),
  );
  const positions = new Map(preview?.map((id, index) => [id, index]));
  return {
    ref: mount,
    tabs: preview
      ? [...tabs].sort(
          (a, b) =>
            (positions.get(a.id) ?? tabs.length) -
            (positions.get(b.id) ?? tabs.length),
        )
      : tabs,
    move,
    announcement,
  };
}
