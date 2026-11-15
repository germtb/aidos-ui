import React from "react";
import { BaseView, type BaseViewProps } from "./BaseView";

// Presentation only: callers own parsing, sanitization, links, and image policy.
export function Prose({ jss, ...props }: BaseViewProps) {
  return (
    <BaseView
      {...props}
      jss={[
        {
          minWidth: 0,
          color: "var(--primary-text)",
          fontSize: "var(--font-medium)",
          lineHeight: 1.6,
          overflowWrap: "anywhere",
          " > :first-child": { marginTop: 0 },
          " > :last-child": { marginBottom: 0 },
          " p": { margin: "0 0 12px" },
          " h1": {
            fontSize: "var(--font-xlarge)",
            lineHeight: 1.3,
            margin: "20px 0 8px",
            fontWeight: 600,
          },
          " h2": {
            fontSize: "var(--font-large)",
            lineHeight: 1.4,
            margin: "16px 0 8px",
            fontWeight: 600,
          },
          " :is(h3, h4, h5, h6)": {
            fontSize: "var(--font-medium)",
            margin: "12px 0 8px",
            fontWeight: 600,
          },
          " :is(ul, ol)": { margin: "0 0 12px", paddingInlineStart: 24 },
          " li": { marginBlock: 4 },
          " blockquote": {
            margin: "12px 0",
            paddingInlineStart: 14,
            borderInlineStart: "2px solid var(--divider)",
            color: "var(--secondary-text)",
          },
          " code": {
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.92em",
            padding: "1px 4px",
            borderRadius: 4,
            background: "var(--secondary-background)",
          },
          " pre": {
            margin: "12px 0",
            padding: 12,
            borderRadius: 8,
            overflowX: "auto",
            whiteSpace: "pre",
            background: "var(--secondary-background)",
          },
          " pre code": {
            padding: 0,
            background: "transparent",
            fontSize: "inherit",
          },
          " hr": { borderTop: "1px solid var(--divider)", margin: "16px 0" },
          " a": { color: "var(--highlight-text)", textUnderlineOffset: "2px" },
          " table": {
            display: "block",
            maxWidth: "100%",
            overflowX: "auto",
            borderCollapse: "collapse",
          },
          " :is(th, td)": {
            padding: "6px 10px",
            borderBottom: "1px solid var(--divider)",
            textAlign: "start",
          },
        },
        jss,
      ]}
    />
  );
}
