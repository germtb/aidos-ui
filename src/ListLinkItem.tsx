import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import {
  InteractableColor,
  getGlyphColor,
  getInteractableListItemJSStyles,
} from "./Interactable";
import { BaseLink } from "./BaseLink";

// @ts-ignore
interface ListLinkItemProps extends BaseListItemProps {
  color?: InteractableColor;
  children?: void;
  onClick?: () => void;
  href: string;
  headline: string;
  body?: string;
  disabled?: boolean;
  selected?: boolean;
  bare?: boolean;
}

export const ListLinkItem = React.forwardRef(
  (
    {
      onClick,
      href,
      disabled = false,
      padding = "medium",
      jsStyle,
      gap,
      selected,
      bare,
      color = "secondary",
      ...otherProps
    }: ListLinkItemProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <BaseListItem
        withDivider={!bare}
        disabled={disabled}
        aria-selected={selected}
        padding="none"
        gap={gap}
        headlineColor={getGlyphColor(color, disabled, true)}
        bodyColor={getGlyphColor(color, disabled, true)}
        selected={selected}
        bare={bare}
        {...otherProps}
        jsStyle={jsStyle}
      >
        {({ content }) => (
          <BaseLink
            padding={padding}
            aria-current={selected ? "page" : undefined}
            disabled={disabled}
            animateInteraction={false}
            bare={true}
            color={color}
            href={href}
            ref={ref}
            jsStyle={getInteractableListItemJSStyles({ bare, selected })}
            onClick={onClick}
          >
            {content}
          </BaseLink>
        )}
      </BaseListItem>
    );
  }
);
