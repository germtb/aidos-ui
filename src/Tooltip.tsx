import React, { useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BaseView } from "./BaseView";
import { Text } from "./Text";
import { JSS, cssVar, toClassnames } from "./jss";
import {
  useFloatingPosition,
  type Placement,
  type OverlayAlign,
} from "./useFloatingPosition";

export interface TooltipProps {
  content: string;
  jss?: JSS;
  className?: undefined;
  tag?: keyof HTMLElementTagNameMap;
  placement?: Placement;
  align?: OverlayAlign;
  children: React.JSX.Element;
}

type Hint = { text: string; description?: string };

export function Tooltip(props: TooltipProps) {
  return <TooltipTrigger {...props} />;
}

// Shared internally with menu items, which resolve overflow on interaction.
export function TooltipTrigger({
  content,
  jss,
  tag,
  children,
  placement = "top",
  align = "center",
}: Omit<TooltipProps, "content"> & {
  content: string | ((anchor: HTMLElement) => Hint);
}) {
  const id = useId();
  const [hint, setHint] = useState<Hint>(null);
  const visible =
    hint &&
    (typeof content === "string"
      ? { text: content, description: content }
      : hint);
  const descriptionId = visible?.description
    ? visible.description === visible.text
      ? id
      : `${id}-description`
    : undefined;
  const anchor = useRef<HTMLElement>(null);
  const surface = useRef<HTMLElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const position = useFloatingPosition(anchor, placement, align, () =>
    setHint(null),
  );
  const mount = useCallback(
    (element: HTMLDivElement | null) => {
      surface.current = element;
      position(element);
    },
    [position],
  );
  const mountAnchor = useCallback((element: HTMLElement | null) => {
    anchor.current = element;
    if (!element) clearTimeout(timeout.current);
  }, []);
  const show = () => {
    clearTimeout(timeout.current);
    setHint(
      typeof content === "string"
        ? { text: content, description: content }
        : content(anchor.current),
    );
  };
  const leave = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (
        !anchor.current?.contains(document.activeElement) &&
        !surface.current?.matches(":hover")
      )
        setHint(null);
    }, 120);
  };
  return (
    <BaseView
      ref={mountAnchor}
      tag={tag}
      jss={[{ display: "inline-flex", alignItems: "center", minWidth: 0 }, jss]}
      onFocus={show}
      onKeyDown={(event) => {
        if (event.key === "Tab") setHint(null);
      }}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !event.currentTarget.matches(":hover") &&
          !surface.current?.matches(":hover")
        )
          setHint(null);
      }}
      onMouseEnter={show}
      onMouseLeave={leave}
    >
      {React.cloneElement(children, {
        "aria-describedby":
          [children.props["aria-describedby"], visible?.text && descriptionId]
            .filter(Boolean)
            .join(" ") || undefined,
      })}
      {visible?.text &&
        createPortal(
          <div
            id={id}
            role="tooltip"
            popover="hint"
            ref={mount}
            onMouseEnter={show}
            onMouseLeave={leave}
            className={toClassnames({
              position: "fixed",
              inset: "auto",
              margin: 0,
              zIndex: 1000,
              width: "max-content",
              maxWidth:
                "min(320px, var(--aidos-overlay-width, calc(100vw - 24px)))",
              maxHeight: "var(--aidos-overlay-height, calc(100dvh - 24px))",
              padding: `${cssVar("--spacing-s")} ${cssVar("--spacing-m")}`,
              border: `1px solid ${cssVar("--divider")}`,
              borderRadius: cssVar("--border-radius-m"),
              background: cssVar("--overlay-background"),
              color: cssVar("--primary-text"),
              boxShadow: cssVar("--shadow-md"),
              overflow: "auto",
              overflowWrap: "anywhere",
              whiteSpace: "pre-wrap",
            })}
          >
            <Text size="small" color="secondary" ellipsis={false}>
              {visible.text}
            </Text>
            {descriptionId && descriptionId !== id && (
              <span id={descriptionId} hidden>
                {visible.description}
              </span>
            )}
          </div>,
          anchor.current.closest("dialog[open], [popover]") ?? document.body,
        )}
    </BaseView>
  );
}
