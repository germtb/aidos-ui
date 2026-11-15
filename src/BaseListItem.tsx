import { type ControlSize } from "./controlSize";
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
  size?: ControlSize;
  indent?: number;
  jssPrimary?: JSS;
  jssAddOn?: JSS;
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
  iconJss?: JSS;
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
    size = "medium",
    indent,
    jssPrimary,
    jssAddOn,
    headlineSize = size === "small" || size === "xsmall" ? "small" : "medium",
    headlineColor = "primary",
    headlineAddOn,
    body,
    bodySize = "small",
    bodyColor = "secondary",
    bodyEllipsis = true,
    icon,
    iconPosition = "start",
    iconSize = "medium",
    iconJss,
    addOn,
    disabled = false,
    padding = size === "medium" || size === "large" ? "medium" : "small",
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
          <Icon
            icon={icon}
            size={iconSize}
            color={contentColor}
            jss={iconJss}
          />
        ) : undefined
      }
      addOnPosition={iconPosition}
      headline={headline}
      headlineSize={headlineSize}
      headlineColor={contentColor}
      headlineAddOn={headlineAddOn}
      body={body}
      bodySize={bodySize}
      bodyColor={disabled || selected ? contentColor : bodyColor}
      bodyEllipsis={bodyEllipsis}
      grow={true}
      shrink={false}
      jss={jssPrimary}
    />
  );

  return (
    <Row
      {...otherProps}
      ref={ref}
      relative
      data-aidos-action-scope
      tag="li"
      role="row"
      jss={[
        getTextColor(contentColor),
        { minHeight: { xsmall: 28, small: 32, medium: 36, large: 44 }[size] },
        indent != null && { paddingInlineStart: indent },
        jss,
      ]}
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
      {addOn && (
        <BaseListAddOn
          role="gridcell"
          jss={[
            { minWidth: 24, height: "auto", alignSelf: "stretch" },
            jssAddOn,
          ]}
        >
          {addOn}
        </BaseListAddOn>
      )}
    </Row>
  );
});
