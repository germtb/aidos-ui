import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import {
  InteractableColor,
  getGlyphColor,
  getInteractableListItemJSS,
  interactableListItemContentJSS,
} from "./Interactable";
import { BaseLink } from "./BaseLink";

export interface ListLinkItemProps extends Omit<
  BaseListItemProps,
  "children" | "onClick"
> {
  color?: InteractableColor;
  children?: void;
  onClick?: () => void;
  href: string;
  headline: string;
  body?: string;
  disabled?: boolean;
  selected?: boolean;
  target?: string;
}

export const ListLinkItem = React.forwardRef(function ListLinkItem(
  {
    onClick,
    href,
    disabled = false,
    padding = "medium",
    jss,
    gap,
    selected,
    color = "secondary",
    target,
    ...otherProps
  }: ListLinkItemProps,
  ref?: React.Ref<HTMLAnchorElement>,
) {
  return (
    <BaseListItem
      disabled={disabled}
      aria-selected={selected}
      padding="none"
      gap={gap}
      headlineColor={getGlyphColor(color, disabled, true)}
      bodyColor={getGlyphColor(color, disabled, true)}
      selected={selected}
      {...otherProps}
      jss={[
        getInteractableListItemJSS({
          selected,
          disabled,
          primarySelector: "[data-list-primary=true]",
        }),
        jss,
      ]}
    >
      {({ content }) => (
        <BaseLink
          target={target}
          padding={padding}
          aria-current={selected ? "page" : undefined}
          disabled={disabled}
          animateInteraction={false}
          bare={true}
          color={color}
          href={href}
          ref={ref}
          data-list-primary={true}
          jss={interactableListItemContentJSS}
          onClick={onClick}
        >
          {content}
        </BaseLink>
      )}
    </BaseListItem>
  );
});
