import React, { ReactNode } from "react";

import { Row, RowProps } from "./Row";
import { JSS, Size, Position, Spacing, TextColor } from "./jss";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";

export interface BaseListItemProps
  extends Omit<RowProps, "children" | "jss" | "role"> {
  children: (elements: { content: React.JSX.Element }) => ReactNode;
  jss?: JSS;
  headline: string;
  headlineSize?: Size;
  headlineColor?: TextColor;
  headlineAddOn?: ReactNode;
  headlineBold?: boolean;
  body?: string;
  bodySize?: Size;
  bodyColor?: TextColor;
  addOn?: ReactNode;
  addOnPosition?: Position;
  outerAddOn?: ReactNode;
  disabled?: boolean;
  role?: undefined;
  gap?: Spacing;
  selected?: boolean;
}

export const BaseListItem = React.forwardRef(function BaseListItem(
  {
    children,
    jss,
    headline,
    headlineSize = "medium",
    headlineColor = "primary",
    headlineAddOn,
    body,
    bodySize = "small",
    bodyColor = "secondary",
    addOn,
    addOnPosition,
    outerAddOn,
    disabled = false,
    padding = "medium",
    gap = "medium",
    selected,
    headlineBold,
    ...otherProps
  }: BaseListItemProps,
  ref?: React.Ref<HTMLElement>,
) {
  const content = (
    <TextPairing
      headlineBold={headlineBold}
      padding={padding}
      gap={gap}
      addOn={addOn}
      addOnPosition={addOnPosition}
      headline={headline}
      headlineSize={headlineSize}
      headlineColor={
        disabled ? "subtle" : selected ? "highlight" : headlineColor
      }
      headlineAddOn={headlineAddOn}
      body={body}
      bodySize={bodySize}
      bodyColor={disabled ? "subtle" : bodyColor}
      grow={true}
      shrink={false}
    />
  );

  return (
    <Row {...otherProps} ref={ref} relative tag="li" role="row" jss={jss}>
      <Row
        grow
        role="gridcell"
        jss={{
          overflow: "hidden",
        }}
      >
        {children({ content })}
      </Row>
      {outerAddOn && <BaseView role="gridcell">{outerAddOn}</BaseView>}
    </Row>
  );
});
