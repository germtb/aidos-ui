import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import {
  InteractableColor,
  getGlyphColor,
  getInteractableListItemJSS,
} from "./Interactable";
import { BaseButton } from "./BaseButton";

export interface ListButtonItemProps extends Omit<
  BaseListItemProps,
  "children" | "onClick"
> {
  color?: InteractableColor;
  onClick: () => void;
  headline: string;
  body?: string;
  disabled?: boolean;
  selected?: boolean;
  children?: void;
}

export const ListButtonItem = React.forwardRef(function ListButtonItem(
  {
    onClick,
    color = "secondary",
    disabled = false,
    padding = "medium",
    jss,
    gap,
    selected,
    ...otherProps
  }: ListButtonItemProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <BaseListItem
      disabled={disabled}
      padding="none"
      gap={gap}
      headlineColor={getGlyphColor(color, disabled, true)}
      bodyColor={getGlyphColor(color, disabled, true)}
      selected={selected}
      aria-selected={selected}
      {...otherProps}
      jss={jss}
    >
      {({ content }) => (
        <BaseButton
          padding={padding}
          disabled={disabled}
          animateInteraction={false}
          bare={true}
          color="secondary"
          ref={ref}
          jss={getInteractableListItemJSS({ selected })}
          onClick={onClick}
        >
          {content}
        </BaseButton>
      )}
    </BaseListItem>
  );
});
