import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import {
  InteractableColor,
  getGlyphColor,
  getInteractableListItemJSStyles,
} from "./Interactable";
import { BaseLink } from "./BaseLink";
import { useListContext } from "./List";

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
  target?: string;
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
      color = "secondary",
      target,
      ...otherProps
    }: ListLinkItemProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    const { bare } = useListContext();

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
        {...otherProps}
        jsStyle={jsStyle}
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
