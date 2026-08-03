import React, { ReactNode } from "react";

import { Row, RowProps } from "./Row";
import { TextPairing } from "./TextPairing";
import { Gap, Size, TextColor } from "./jss";

export interface ToolbarProps extends Omit<RowProps, "children"> {
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
    headline,
    body,
    leading,
    actions,
    actionsGap = "medium",
    headlineColor,
    headlineSize = "xlarge",
    headlineBold = true,
    bodyColor,
    bodySize,
    bodyEllipsis = false,
    gap = "large",
    align = "center",
    justify = "space-between",
    ...otherProps
  }: ToolbarProps,
  ref?: React.Ref<HTMLElement>,
) {
  return (
    <Row ref={ref} gap={gap} align={align} justify={justify} {...otherProps}>
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
