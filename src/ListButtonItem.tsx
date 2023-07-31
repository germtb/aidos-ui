import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import {
  InteractableColor,
  getGlyphColor,
  getInteractableListItemJSStyles,
} from "./Interactable";
import { BaseButton } from "./BaseButton";
import { useListContext } from "./List";

// @ts-ignore
interface ListButtonItemProps extends BaseListItemProps {
  color: InteractableColor;
  onClick: () => void;
  headline: string;
  body?: string;
  disabled?: boolean;
  selected?: boolean;
  children?: void;
}

export const ListButtonItem = React.forwardRef(
  (
    {
      onClick,
      color = "secondary",
      disabled = false,
      padding = "medium",
      jsStyle,
      gap,
      selected,
      ...otherProps
    }: ListButtonItemProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const { bare } = useListContext();

    return (
      <BaseListItem
        withDivider={!bare}
        disabled={disabled}
        padding="none"
        gap={gap}
        headlineColor={getGlyphColor(color, disabled, true)}
        bodyColor={getGlyphColor(color, disabled, true)}
        selected={selected}
        aria-selected={selected}
        {...otherProps}
        jsStyle={jsStyle}
      >
        {({ content }) => (
          <BaseButton
            padding={padding}
            disabled={disabled}
            animateInteraction={false}
            bare={true}
            color={bare ? "secondary" : color}
            ref={ref}
            jsStyle={getInteractableListItemJSStyles({ bare, selected })}
            onClick={onClick}
          >
            {content}
          </BaseButton>
        )}
      </BaseListItem>
    );
  }
);
