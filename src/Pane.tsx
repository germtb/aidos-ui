import React, { type ReactNode } from "react";
import { BaseView, type BaseViewProps } from "./BaseView";
import { getPadding, type Padding } from "./jss";

export interface PaneProps extends BaseViewProps {
  header?: ReactNode;
  footer?: ReactNode;
  padding?: Padding;
  scroll?: boolean;
}

export const Pane = React.forwardRef(function Pane(
  {
    header,
    footer,
    padding = "xlarge",
    scroll = true,
    hidden,
    children,
    jss,
    onScroll,
    ...props
  }: PaneProps,
  ref?: React.Ref<HTMLElement>,
) {
  return (
    <BaseView
      {...props}
      hidden={hidden}
      data-aidos-pane
      jss={[
        {
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
        <BaseView jss={{ flexShrink: 0, minWidth: 0 }}>{header}</BaseView>
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
        ]}
      >
        {children}
      </BaseView>
      {footer != null && (
        <BaseView
          jss={{
            flexShrink: 0,
            minWidth: 0,
            minHeight: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderTop: "1px solid var(--divider)",
          }}
        >
          {footer}
        </BaseView>
      )}
    </BaseView>
  );
});
