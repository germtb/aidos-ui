import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { reorderBounds, reorderItems, reorderMotion } from "./reorderMotion";
import { useRefEffect } from "./useRefEffect";
import type { JSS } from "./jss";

export interface ReorderGroup<T> {
  id: string;
  label: string;
  items: readonly T[];
}

export interface ListDrop {
  groupId: string;
  beforeId: string | null;
}

export function useListReorder<T extends { id: string; label: string }>(
  groups: readonly ReorderGroup<T>[],
  onMove: (id: string, destination: ListDrop) => void,
) {
  const ids = groups.flatMap((group) => group.items.map((item) => item.id));
  if (
    groups.some((group) => !group.id) ||
    new Set(groups.map((group) => group.id)).size !== groups.length ||
    ids.some((id) => !id) ||
    new Set(ids).size !== ids.length
  )
    throw new Error(
      "Reorderable groups and items require unique, nonempty ids.",
    );
  const element = useRef<HTMLElement | null>(null);
  const latest = useRef({ groups, onMove });
  latest.current = { groups, onMove };
  const [preview, setPreview] = useState<{
    groupId: string;
    ids: string[];
  } | null>(null);
  const [target, setTarget] = useState<ListDrop | null>(null);
  const [announcement, announce] = useState("");
  const order = JSON.stringify(
    groups.map((group) => [group.id, group.items.map((item) => item.id)]),
  );
  const move = useCallback((id: string, destination: ListDrop) => {
    const { groups, onMove } = latest.current;
    const source = groups.find((group) =>
      group.items.some((item) => item.id === id),
    );
    const group = groups.find((group) => group.id === destination.groupId);
    const item = source?.items.find((item) => item.id === id);
    if (!item || !group || id === destination.beforeId) return;
    const others = group.items.filter((item) => item.id !== id);
    const index =
      destination.beforeId === null
        ? others.length
        : others.findIndex((item) => item.id === destination.beforeId);
    if (index < 0 || (source === group && source.items.indexOf(item) === index))
      return;
    onMove(id, destination);
    queueMicrotask(() => {
      if (element.current && document.hasFocus())
        reorderItems(element.current)
          .find((item) => item.dataset.aidosReorderItem === id)
          ?.querySelector<HTMLElement>("[data-list-primary]")
          ?.focus({ preventScroll: true });
    });
    announce(
      `${item.label} moved to ${group.label}, position ${index + 1} of ${others.length + 1}.`,
    );
  }, []);
  const mount = useRefEffect(
    useCallback(
      (root: HTMLElement) => {
        element.current = root;
        let destination: ListDrop | null = null;
        const destroy = reorderMotion(root, {
          axis: "vertical",
          handleSelector: "[data-list-primary]",
          onMove(id, pointer, center, render) {
            const viewport = root.getBoundingClientRect();
            const groupElement = Array.from(
              root.querySelectorAll<HTMLElement>("[data-aidos-reorder-group]"),
            ).find((element) => {
              const box = element.getBoundingClientRect();
              return (
                pointer.x >= Math.max(box.left, viewport.left) &&
                pointer.x <= Math.min(box.right, viewport.right) &&
                pointer.y >= Math.max(box.top, viewport.top) &&
                pointer.y <= Math.min(box.bottom, viewport.bottom)
              );
            });
            const source = latest.current.groups.find((group) =>
              group.items.some((item) => item.id === id),
            );
            const groupId = groupElement?.dataset.aidosReorderGroup;
            if (!source || !groupId) {
              destination = null;
              setTarget(null);
              return;
            }
            const items = reorderItems(root).filter(
              (item) =>
                groupElement.contains(item) &&
                item.getClientRects().length &&
                !item.closest("[inert]"),
            );
            const others = items.filter(
              (item) => item.dataset.aidosReorderItem !== id,
            );
            const next = others.findIndex((item) => {
              const box = reorderBounds(item);
              return (
                (source.id === groupId ? center.y : pointer.y) <
                box.top + box.height / 2
              );
            });
            const beforeId =
              next < 0 ? null : others[next].dataset.aidosReorderItem!;
            destination = { groupId, beforeId };
            if (source.id !== groupId) {
              setTarget((current) =>
                current?.groupId === groupId && current.beforeId === beforeId
                  ? current
                  : destination,
              );
              return;
            }
            setTarget(null);
            const index = next < 0 ? others.length : next;
            if (
              items.findIndex(
                (item) => item.dataset.aidosReorderItem === id,
              ) === index
            )
              return;
            const ids = others.map((item) => item.dataset.aidosReorderItem!);
            ids.splice(index, 0, id);
            render(() => setPreview({ groupId, ids }));
          },
          onEnd(id, canceled) {
            if (!canceled && destination) move(id, destination);
            else announce("Move canceled.");
            destination = null;
            setPreview(null);
            setTarget(null);
          },
        });
        const keyboard = (event: KeyboardEvent) => {
          if (
            event.defaultPrevented ||
            event.isComposing ||
            !event.altKey ||
            !event.shiftKey ||
            event.ctrlKey ||
            event.metaKey
          )
            return;
          const handle =
            event.target instanceof Element
              ? event.target.closest<HTMLElement>("[data-list-primary]")
              : null;
          const row = handle?.closest<HTMLElement>("[data-aidos-reorder-item]");
          if (
            !row ||
            handle?.getAttribute("aria-disabled") === "true" ||
            row.closest("[data-aidos-reorder-root]") !== root
          )
            return;
          const { groups } = latest.current;
          const id = row.dataset.aidosReorderItem!;
          const groupIndex = groups.findIndex((group) =>
            group.items.some((item) => item.id === id),
          );
          const group = groups[groupIndex];
          if (!group) return;
          const index = group.items.findIndex((item) => item.id === id);
          let drop: ListDrop | undefined;
          if (event.key === "ArrowUp" && index > 0)
            drop = { groupId: group.id, beforeId: group.items[index - 1].id };
          else if (event.key === "ArrowDown" && index < group.items.length - 1)
            drop = {
              groupId: group.id,
              beforeId: group.items[index + 2]?.id ?? null,
            };
          else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            const target =
              groups[groupIndex + (event.key === "ArrowRight" ? 1 : -1)];
            if (target) drop = { groupId: target.id, beforeId: null };
          } else if (event.key !== "ArrowUp" && event.key !== "ArrowDown")
            return;
          event.preventDefault();
          event.stopPropagation();
          if (!drop) return;
          flushSync(() => move(id, drop));
          reorderItems(root)
            .find((item) => item.dataset.aidosReorderItem === id)
            ?.querySelector<HTMLElement>("[data-list-primary]")
            ?.focus();
        };
        root.addEventListener("keydown", keyboard, true);
        return () => {
          root.removeEventListener("keydown", keyboard, true);
          destroy();
          element.current = null;
          setPreview(null);
          setTarget(null);
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps -- Cancel active drags when group membership or controlled order changes.
      [order, move],
    ),
  );
  const positions = new Map(preview?.ids.map((id, index) => [id, index]));
  return {
    ref: mount,
    groups: preview
      ? groups.map((group) =>
          group.id === preview.groupId
            ? {
                ...group,
                items: [...group.items].sort(
                  (a, b) =>
                    (positions.get(a.id) ?? group.items.length) -
                    (positions.get(b.id) ?? group.items.length),
                ),
              }
            : group,
        )
      : groups,
    move,
    announcement,
    groupProps: (id: string) => ({
      "data-aidos-reorder-group": id,
    }),
    slotProps: (groupId: string, beforeId: string | null) => ({
      "aria-hidden": true,
      "data-aidos-reorder-slot": beforeId ?? "",
      jss: {
        height:
          target?.groupId === groupId && target.beforeId === beforeId ? 12 : 0,
        flexShrink: 0,
        transition: target ? "height 180ms cubic-bezier(0.2, 0, 0, 1)" : "none",
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      } satisfies JSS,
    }),
    itemProps: (id: string) => ({
      "data-aidos-reorder-item": id,
      "aria-keyshortcuts":
        "Alt+Shift+ArrowUp Alt+Shift+ArrowDown Alt+Shift+ArrowLeft Alt+Shift+ArrowRight",
      jss: {
        " [data-list-primary]": { touchAction: "none", userSelect: "none" },
      } satisfies JSS,
    }),
  };
}
