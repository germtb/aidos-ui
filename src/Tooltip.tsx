import React, { useId, useRef, useState } from "react";
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

export function Tooltip({
  content,
  jss,
  tag,
  children,
  placement = "top",
  align = "center",
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLElement>(null);
  const surface = useRef<HTMLElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const position = useFloatingPosition(anchor, placement, align, () =>
    setOpen(false),
  );
  const show = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (
        !anchor.current?.contains(document.activeElement) &&
        !surface.current?.matches(":hover")
      )
        setOpen(false);
    }, 120);
  };
  return (
    <BaseView
      ref={(element) => {
        anchor.current = element;
        if (!element) clearTimeout(timeout.current);
      }}
      tag={tag}
      jss={[{ display: "inline-block", minWidth: 0 }, jss]}
      onFocus={show}
      onKeyDown={(event) => {
        if (event.key === "Tab") setOpen(false);
      }}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !event.currentTarget.matches(":hover") &&
          !surface.current?.matches(":hover")
        )
          setOpen(false);
      }}
      onMouseEnter={show}
      onMouseLeave={leave}
    >
      {React.cloneElement(children, {
        "aria-describedby":
          [children.props["aria-describedby"], open && id]
            .filter(Boolean)
            .join(" ") || undefined,
      })}
      {open &&
        createPortal(
          <div
            id={id}
            role="tooltip"
            popover="hint"
            ref={(element) => {
              surface.current = element;
              position(element);
            }}
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
            })}
          >
            <Text size="small" color="secondary" ellipsis={false}>
              {content}
            </Text>
          </div>,
          anchor.current.closest("dialog[open], [popover]") ?? document.body,
        )}
    </BaseView>
  );
}
