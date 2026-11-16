import React, {
  useCallback,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { queryFocusables } from "./aria";
import { BaseView } from "./BaseView";
import { Card } from "./Card";
import { useRefEffect } from "./useRefEffect";
import {
  useFloatingPosition,
  type Placement,
  type OverlayAlign,
} from "./useFloatingPosition";
import { JSS, toClassnames } from "./jss";

export function Popover({
  children,
  close,
  initialFocus,
}: {
  children: ReactNode;
  close: () => void;
  initialFocus?: React.RefObject<HTMLElement | null>;
}) {
  const previous = useRef<HTMLElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  const initial = useRef(initialFocus);
  initial.current = initialFocus;
  const mount = useRefEffect(
    useCallback((root: HTMLElement) => {
      previous.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      let mounted = true;
      // The parent floating surface opens after child refs attach.
      queueMicrotask(() => {
        if (!mounted || !root.getClientRects().length) return;
        const items = queryFocusables(root);
        const selected = root.querySelector(
          '[aria-selected="true"], [aria-checked="true"]',
        );
        (
          initial.current?.current ??
          items.find((item) =>
            item.matches('[autofocus], [data-autofocus="true"]'),
          ) ??
          items.find((item) => item === selected || selected?.contains(item)) ??
          items[0] ??
          root
        ).focus({ preventScroll: true });
      });
      const outside = (event: PointerEvent) => {
        if (
          !root.contains(event.target as Node) &&
          !previous.current?.contains(event.target as Node)
        )
          closeRef.current();
      };
      const native = root.closest("[popover]");
      if (!native) document.addEventListener("pointerdown", outside);
      return () => {
        mounted = false;
        if (!native) document.removeEventListener("pointerdown", outside);
        if (
          root.contains(document.activeElement) &&
          previous.current?.isConnected
        )
          previous.current.focus({ preventScroll: true });
      };
    }, []),
  );
  return (
    <Card
      ref={mount}
      data-aidos-popover
      tabIndex={-1}
      variant="floating"
      padding="small"
      gap="none"
      jss={{
        minWidth: "min(220px, calc(100vw - 24px))",
        maxWidth: "100%",
        borderRadius: "calc(var(--border-radius-s) + var(--spacing-s))",
        ":focus-visible": { outline: "none" },
      }}
      onKeyDown={(event) => {
        if (event.defaultPrevented || event.nativeEvent.isComposing) return;
        if (event.key === "Escape") {
          event.stopPropagation();
          // Native dismissal closes only the topmost surface, including nested hints.
          if (
            !event.currentTarget.closest<HTMLElement>("[popover]")?.showPopover
          ) {
            event.preventDefault();
            close();
          }
        } else if (event.key === "Tab") {
          const items = queryFocusables(event.currentTarget).filter(
            (item) => item.tabIndex >= 0,
          );
          const index = items.indexOf(document.activeElement as HTMLElement);
          if (
            items.length &&
            (event.shiftKey
              ? index > 0
              : index >= 0 && index < items.length - 1)
          )
            return;
          const outside = queryFocusables(document.body).filter(
            (item) => item.tabIndex >= 0 && !event.currentTarget.contains(item),
          );
          const next =
            outside[
              outside.indexOf(previous.current) + (event.shiftKey ? -1 : 1)
            ];
          if (next) {
            event.preventDefault();
            next.focus();
          }
          close();
        }
      }}
    >
      {children}
    </Card>
  );
}

export interface PopoverTriggerProps<Input = object> {
  PopoverComponent?: (
    props: { close: () => void } & Input,
  ) => React.JSX.Element;
  content?: ReactNode | ((props: { close: () => void }) => ReactNode);
  ariaLabel?: string;
  placement?: Placement;
  align?: OverlayAlign;
  role?: "dialog" | "presentation";
  jss?: JSS;
  jssDialog?: JSS;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  tag?: keyof HTMLElementTagNameMap;
  children: (props: {
    toggle: (input?: Input) => void;
    expanded: boolean;
    id: string;
  }) => React.JSX.Element;
}

export function PopoverTrigger<Input = object>({
  PopoverComponent,
  content,
  ariaLabel,
  placement = "bottom",
  align = "start",
  role = "dialog",
  jss,
  jssDialog,
  grow,
  shrink,
  tag,
  children,
}: PopoverTriggerProps<Input>) {
  const [open, setOpen] = useState<{ element?: ReactNode }>(null);
  const anchor = useRef<HTMLElement>(null);
  const surface = useRef<HTMLElement>(null);
  const pointerOpen = useRef(false);
  const id = useId();
  const close = useCallback(() => setOpen(null), []);
  const position = useFloatingPosition(anchor, placement, align, close);
  const mount = useCallback(
    (element: HTMLDivElement | null) => {
      surface.current = element;
      position(element);
    },
    [position],
  );
  const toggle = (input?: Input) => {
    if (open || pointerOpen.current) close();
    else
      setOpen({
        element: PopoverComponent ? (
          <PopoverComponent {...input} close={close} />
        ) : null,
      });
    pointerOpen.current = false;
  };
  return (
    <BaseView
      ref={anchor}
      grow={grow}
      shrink={shrink}
      tag={tag}
      jss={[{ display: "inline-block", minWidth: 0 }, jss]}
      onPointerDown={(event) => {
        if (!surface.current?.contains(event.target as Node))
          pointerOpen.current = Boolean(open);
      }}
    >
      {children({ toggle, expanded: open != null, id })}
      {open &&
        createPortal(
          <div
            id={id}
            role={role}
            aria-label={ariaLabel}
            popover="auto"
            ref={mount}
            className={toClassnames([
              {
                position: "fixed",
                inset: "auto",
                padding: 0,
                margin: 0,
                border: "1px solid var(--divider)",
                boxShadow: "var(--shadow-md)",
                zIndex: 1000,
                width: "max-content",
                maxWidth: "var(--aidos-overlay-width, calc(100vw - 24px))",
                maxHeight: "var(--aidos-overlay-height, calc(100dvh - 24px))",
                overflow: "auto",
                background: "var(--overlay-background)",
                color: "var(--primary-text)",
                borderRadius:
                  "calc(var(--border-radius-s) + var(--spacing-s) + 1px)",
                " [data-aidos-popover]": { boxShadow: "none" },
              },
              jssDialog,
            ])}
          >
            {content != null ? (
              <Popover close={close}>
                {typeof content === "function" ? content({ close }) : content}
              </Popover>
            ) : (
              open.element
            )}
          </div>,
          anchor.current.closest("dialog[open], [popover]") ?? document.body,
        )}
    </BaseView>
  );
}
