import React, { ReactNode } from "react";

import { Row, RowProps } from "./Row";
import { TextPairing } from "./TextPairing";
import { Gap, Size, TextColor } from "./jss";

export interface ToolbarProps extends Omit<RowProps, "children"> {
  variant?: "default" | "pane";
  headline: ReactNode;
  body?: ReactNode;
  leading?: ReactNode;
  actions?: ReactNode;
  actionsGap?: Gap;
  headlineColor?: TextColor;
  headlineSize?: Size;
  headlineBold?: boolean;
  bodyColor?: TextColor;
  bodySize?: Size;
  bodyEllipsis?: boolean;
}

export const Toolbar = React.forwardRef(function Toolbar(
  {
    variant = "default",
    headline,
    body,
    leading,
    actions,
    actionsGap = "medium",
    headlineColor,
    headlineSize = variant === "pane" ? "medium" : "xlarge",
    headlineBold = variant !== "pane",
    bodyColor,
    bodySize,
    bodyEllipsis = false,
    gap = "large",
    align = "center",
    justify = "space-between",
    padding,
    jss,
    ...otherProps
  }: ToolbarProps,
  ref?: React.Ref<HTMLElement>,
) {
  return (
    <Row
      ref={ref}
      gap={gap}
      align={align}
      justify={justify}
      padding={padding}
      {...otherProps}
      jss={[
        variant === "pane" && {
          height: 48,
          flexShrink: 0,
          minWidth: 0,
          backgroundColor: "var(--overlay-background)",
        },
        variant === "pane" &&
          padding === undefined && {
            paddingInlineStart:
              "calc(20px + var(--aidos-header-leading-inset, 0px))",
            paddingInlineEnd: 12,
          },
        jss,
      ]}
    >
      <TextPairing
        headline={headline}
        body={body}
        addOn={leading}
        headlineColor={headlineColor}
        headlineSize={headlineSize}
        headlineBold={headlineBold}
        bodyColor={bodyColor}
        bodySize={bodySize}
        bodyEllipsis={bodyEllipsis}
        grow
        shrink
      />
      {actions != null && (
        <Row align="center" gap={actionsGap} jss={{ flexShrink: 0 }}>
          {actions}
        </Row>
      )}
    </Row>
  );
});

Toolbar.displayName = "Toolbar";
