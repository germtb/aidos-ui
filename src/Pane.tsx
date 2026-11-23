import React, { useCallback, type ReactNode } from "react";
import { BaseView, type BaseViewProps } from "./BaseView";
import { getPadding, getSpacing, type Padding } from "./jss";
import { useRefEffect } from "./useRefEffect";

export interface PaneProps extends BaseViewProps {
  header?: ReactNode;
  footer?: ReactNode;
  padding?: Padding;
  scroll?: boolean;
  overlay?: "header" | "footer" | "both";
}

export const Pane = React.forwardRef(function Pane(
  {
    header,
    footer,
    padding = "xlarge",
    scroll = true,
    overlay,
    hidden,
    children,
    jss,
    onScroll,
    ...props
  }: PaneProps,
  ref?: React.Ref<HTMLElement>,
) {
  const headerOverlay =
    header != null && (overlay === "header" || overlay === "both");
  const footerOverlay =
    footer != null && (overlay === "footer" || overlay === "both");
  const headerRef = useOverlaySize(headerOverlay, "header");
  const footerRef = useOverlaySize(footerOverlay, "footer");
  const verticalPadding = getSpacing(
    Array.isArray(padding) ? padding[0] : padding,
  );
  const top = `calc(var(--aidos-pane-header-height, 48px) + ${verticalPadding})`;
  const bottom = `calc(var(--aidos-pane-footer-height, 64px) + ${verticalPadding})`;
  return (
    <BaseView
      {...props}
      hidden={hidden}
      data-aidos-pane
      jss={[
        {
          position: overlay ? "relative" : undefined,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
        },
        jss,
        hidden && { display: "none" },
      ]}
    >
      {header != null && (
        <BaseView
          ref={headerRef}
          data-aidos-pane-header
          jss={[
            { flexShrink: 0, minWidth: 0 },
            headerOverlay && {
              position: "absolute",
              insetInline: 0,
              top: 0,
              zIndex: 1,
            },
          ]}
        >
          {header}
        </BaseView>
      )}
      <BaseView
        ref={ref}
        onScroll={onScroll}
        tabIndex={-1}
        data-aidos-pane-body
        jss={[
          {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: scroll ? "auto" : "hidden",
            overscrollBehavior: "contain",
            scrollbarGutter: scroll ? "stable" : undefined,
            outline: "none",
          },
          getPadding(padding),
          headerOverlay && { paddingTop: top, scrollPaddingTop: top },
          footerOverlay && {
            paddingBottom: bottom,
            scrollPaddingBottom: bottom,
          },
        ]}
      >
        {children}
      </BaseView>
      {footer != null && (
        <BaseView
          ref={footerRef}
          data-aidos-pane-footer
          jss={[
            {
              flexShrink: 0,
              minWidth: 0,
              minHeight: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderTop: footerOverlay ? undefined : "1px solid var(--divider)",
            },
            footerOverlay && {
              position: "absolute",
              insetInline: 0,
              bottom: 0,
              zIndex: 1,
            },
          ]}
        >
          {footer}
        </BaseView>
      )}
    </BaseView>
  );
});

function useOverlaySize(enabled: boolean, edge: "header" | "footer") {
  return useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        if (!enabled) return;
        const parent = element.parentElement!;
        const property = `--aidos-pane-${edge}-height`;
        const measure = () =>
          parent.style.setProperty(property, `${element.offsetHeight}px`);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => {
          observer.disconnect();
          parent.style.removeProperty(property);
        };
      },
      [enabled, edge],
    ),
  );
}
