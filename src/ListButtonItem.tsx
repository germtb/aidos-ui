import React from "react";

import { BaseListItem, BaseListItemProps } from "./BaseListItem";
import {
  InteractableColor,
  getGlyphColor,
  getInteractableListItemJSS,
  interactableListItemContentJSS,
} from "./Interactable";
import { BaseButton } from "./BaseButton";

export interface ListButtonItemProps extends Omit<
  BaseListItemProps,
  "children" | "onClick" | "headlineColor" | "bodyColor"
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
  const glyphColor = getGlyphColor(color, disabled, true);

  return (
    <BaseListItem
      disabled={disabled}
      padding="none"
      gap={gap}
      selected={selected}
      aria-selected={selected}
      {...otherProps}
      headlineColor={glyphColor}
      bodyColor={glyphColor}
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
        <BaseButton
          padding={padding}
          disabled={disabled}
          animateInteraction={false}
          bare={true}
          color={color}
          ref={ref}
          data-list-primary={true}
          jss={interactableListItemContentJSS}
          onClick={onClick}
        >
          {content}
        </BaseButton>
      )}
    </BaseListItem>
  );
});
