import React, { Children, ReactNode } from "react";

import { BaseView } from "./BaseView";
import { Row, RowProps } from "./Row";
import { JSS } from "./jss";

export interface AvatarStackProps extends Omit<RowProps, "children" | "gap"> {
  children: ReactNode;
  overlap?: number;
  jss?: JSS;
}

export const AvatarStack = React.forwardRef(function AvatarStack(
  { children, overlap = 8, jss, ...otherProps }: AvatarStackProps,
  ref?: React.Ref<HTMLElement>,
) {
  const items = Children.toArray(children);

  return (
    <Row
      {...otherProps}
      ref={ref}
      align="center"
      gap="none"
      jss={[
        {
          isolation: "isolate",
          width: "fit-content",
        },
        jss,
      ]}
    >
      {items.map((child, index) => (
        <BaseView
          key={index}
          tag="span"
          jss={{
            position: "relative",
            zIndex: items.length - index,
            display: "inline-flex",
            marginLeft: index === 0 ? 0 : -overlap,
          }}
        >
          {child}
        </BaseView>
      ))}
    </Row>
  );
});

AvatarStack.displayName = "AvatarStack";
