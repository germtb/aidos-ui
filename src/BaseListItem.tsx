import React, { ReactNode } from "react";

import { BaseListAddOn } from "./BaseListAddOn";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { Row, RowProps } from "./Row";
import { JSS, Position, Size, Spacing, TextColor, getTextColor } from "./jss";
import { TextPairing } from "./TextPairing";

export interface BaseListItemProps extends Omit<
  RowProps,
  "children" | "jss" | "role"
> {
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
  bodyEllipsis?: boolean;
  icon?: IconType;
  iconPosition?: Position;
  iconSize?: Size;
  addOn?: ReactNode;
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
    bodyEllipsis = true,
    icon,
    iconPosition = "start",
    iconSize = "medium",
    addOn,
    disabled = false,
    padding = "medium",
    gap = "medium",
    selected,
    headlineBold,
    ...otherProps
  }: BaseListItemProps,
  ref?: React.Ref<HTMLElement>,
) {
  const contentColor = disabled
    ? "subtle"
    : selected
      ? "highlight"
      : headlineColor;
  const content = (
    <TextPairing
      headlineBold={headlineBold}
      padding={padding}
      gap={gap}
      addOn={
        icon ? (
          <Icon icon={icon} size={iconSize} color={contentColor} />
        ) : undefined
      }
      addOnPosition={iconPosition}
      headline={headline}
      headlineSize={headlineSize}
      headlineColor={contentColor}
      headlineAddOn={headlineAddOn}
      body={body}
      bodySize={bodySize}
      bodyColor={disabled ? "subtle" : bodyColor}
      bodyEllipsis={bodyEllipsis}
      grow={true}
      shrink={false}
    />
  );

  return (
    <Row
      {...otherProps}
      ref={ref}
      relative
      tag="li"
      role="row"
      jss={[getTextColor(contentColor), jss]}
    >
      <Row
        grow
        role="gridcell"
        jss={{
          overflow: "hidden",
        }}
      >
        {children({ content })}
      </Row>
      {addOn && <BaseListAddOn role="gridcell">{addOn}</BaseListAddOn>}
    </Row>
  );
});
