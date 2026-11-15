import React from "react";
import { BaseView, type BaseViewProps } from "./BaseView";
import { Row, type RowProps } from "./Row";

export function ActionScope(props: BaseViewProps) {
  return <BaseView {...props} data-aidos-action-scope />;
}

// Hidden actions remain keyboard reachable and are always visible on touch devices.
export function ContextualActions({ jss, ...props }: RowProps) {
  return (
    <Row
      {...props}
      data-aidos-actions
      align="center"
      gap="xsmall"
      jss={[
        {
          flexShrink: 0,
          opacity: 0,
          pointerEvents: "none",
          ":focus-within": { opacity: 1, pointerEvents: "auto" },
          ":has([aria-expanded=true])": { opacity: 1, pointerEvents: "auto" },
          "@media (hover: none)": { opacity: 1, pointerEvents: "auto" },
        },
        jss,
      ]}
    />
  );
}
