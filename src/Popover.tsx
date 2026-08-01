import React, { useCallback, useEffect, useRef, useState } from "react";
import { queryFocusables } from "./aria";

import { BaseView } from "./BaseView";
import { Card } from "./Card";
import { useRefEffect } from "./useRefEffect";
import { JSS, cssVar, toClassnames } from "./jss";

const styles: { [key: string]: JSS } = {
  popover: {
    padding: 0,
    zIndex: 1000,
    top: `calc(100% + ${cssVar("--spacing-xs")})`,
    right: "auto",
    left: 0,
    margin: 0,
    border: 0,
    overflow: "visible",
    background: "transparent",
    animation: "popoverFadeIn 0.15s ease-out",
  },
  card: {
    minWidth: 220,
    maxWidth: "calc(100vw - 32px)",
    overflow: "hidden",
  },
};

export function Popover({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  const activeElementRef = useRef<HTMLElement | null>(null);

  const focusTrapRoot = useRefEffect(
    useCallback(
      (root: HTMLElement) => {
        activeElementRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        const selectedElement = root.querySelector<HTMLElement>(
          '[aria-selected="true"]',
        );
        const autofocusElement = root.querySelector<HTMLElement>(
          '[data-autofocus="true"]',
        );
        const [firstElement] = queryFocusables(root);
        const element = selectedElement ?? autofocusElement ?? firstElement;
        if (element) {
          element.focus();
        } else {
          root.focus();
        }

        const keydown = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            close();
          } else if (e.key === "Tab") {
            const focusables = queryFocusables(root).filter(
              (element) => element.tabIndex !== -1,
            );

            if (focusables.length === 0) {
              e.stopPropagation();
              e.preventDefault();
            }

            const focusedIndex = focusables.findIndex(
              (x) => x === document.activeElement,
            );

            if (focusables.length === 0) {
              e.stopPropagation();
              e.preventDefault();
            } else if (e.shiftKey && focusedIndex === 0) {
              focusables[focusables.length - 1].focus();
              e.stopPropagation();
              e.preventDefault();
            } else if (!e.shiftKey && focusedIndex === focusables.length - 1) {
              // Cycle back to the first element
              focusables[0].focus();
              e.stopPropagation();
              e.preventDefault();
            } else {
              // Just do the usual thing
            }
          }
        };

        const click = () => {
          close();
        };

        // This is needed so that the trigger click is not captured immediatly, which would close the popover as it opens
        const timeout = window.setTimeout(() => {
          window.addEventListener("keydown", keydown);
          window.addEventListener("click", click);
        }, 0);

        return () => {
          window.clearTimeout(timeout);
          activeElementRef.current?.focus();
          window.removeEventListener("keydown", keydown);
          window.removeEventListener("click", click);
        };
      },
      [close],
    ),
  );

  return (
    <Card variant="floating" padding="small" gap="none" jss={styles.card}>
      <BaseView ref={focusTrapRoot} jss={{ width: "100%" }}>
        {children}
      </BaseView>
    </Card>
  );
}

interface PopoverTriggerProps<Input> {
  PopoverComponent: (props: { close: () => void } & Input) => React.JSX.Element;
  ariaLabel?: string;
  jss?: JSS;
  jssDialog?: JSS;
  className?: undefined;
  grow?: boolean;
  shrink?: boolean;
  tag?: keyof HTMLElementTagNameMap;
  children: (props: {
    toggle: (input: Input) => void;
    expanded: boolean;
  }) => React.JSX.Element;
}

export function PopoverTrigger<Input>({
  PopoverComponent,
  ariaLabel,
  jss,
  jssDialog,
  grow,
  shrink,
  tag,
  children,
}: PopoverTriggerProps<Input>) {
  const [popover, setPopover] = useState<React.JSX.Element>(null);
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (popover == null) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.show();
    }
  }, [popover]);

  const toggle = (input: Input) => {
    if (popover == null) {
      setPopover(
        <PopoverComponent
          {...input}
          close={() => {
            setPopover(null);
          }}
        />,
      );
    } else {
      setPopover(null);
    }
  };

  return (
    <BaseView
      grow={grow}
      shrink={shrink}
      tag={tag}
      relative={true}
      jss={[jss, { position: "relative", display: "inline-block" }]}
    >
      {children({ toggle, expanded: popover != null })}
      <dialog
        aria-label={ariaLabel}
        ref={(ref: null | HTMLDialogElement) => {
          dialogRef.current = ref;
        }}
        className={toClassnames([styles.popover, jssDialog])}
        onClose={() => {
          setPopover(null);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {popover}
      </dialog>
    </BaseView>
  );
}
