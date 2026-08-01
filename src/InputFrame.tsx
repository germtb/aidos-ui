import React from "react";

import { Row, RowProps } from "./Row";
import { cssVar } from "./jss";

export interface InputFrameProps extends RowProps {
  children: React.ReactNode;
}

export const InputFrame = React.forwardRef(function InputFrame(
  { children, jss, ...rowProps }: InputFrameProps,
  ref?: React.Ref<HTMLElement>,
) {
  return (
    <Row
      {...rowProps}
      ref={ref}
      jss={[
        {
          borderRadius: cssVar("--border-radius-m"),
          overflow: "hidden",
          border: `1px solid ${cssVar("--divider")}`,
          backgroundColor: cssVar("--overlay-background"),
          transition: `border-color ${cssVar("--transition-fast")}, background-color ${cssVar("--transition-fast")}`,
          ":hover": {
            borderColor: cssVar("--strong-divider"),
          },
          ":has(:focus-visible)": {
            borderColor: cssVar("--outline"),
            outline: `2px solid ${cssVar("--outline")}`,
            outlineOffset: 1,
          },
          ":has(:disabled)": {
            backgroundColor: cssVar("--secondary-background"),
            borderColor: cssVar("--divider"),
          },
          ":has([aria-invalid=true])": {
            borderColor: cssVar("--negative-text"),
          },
          ":has([aria-invalid=true]:focus-visible)": {
            outline: `2px solid ${cssVar("--negative-text")}`,
            outlineColor: cssVar("--negative-text"),
          },
        },
        jss,
      ]}
    >
      {children}
    </Row>
  );
});
