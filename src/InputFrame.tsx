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
          ":has(:is(input, textarea, select):focus-visible)": {
            borderColor: cssVar("--highlight"),
            outline:
              "2px solid color-mix(in srgb, var(--highlight) 45%, transparent)",
            outlineOffset: 1,
          },
          ":has(:is(input, textarea, select):disabled)": {
            backgroundColor: cssVar("--secondary-background"),
            borderColor: cssVar("--divider"),
          },
          ":has(:is(input, textarea, select)[aria-invalid=true])": {
            borderColor: cssVar("--negative-text"),
          },
          ":has(:is(input, textarea, select)[aria-invalid=true]:focus-visible)":
            {
              borderColor: cssVar("--negative-text"),
              outlineColor:
                "color-mix(in srgb, var(--negative-text) 45%, transparent)",
            },
        },
        jss,
      ]}
    >
      {children}
    </Row>
  );
});
