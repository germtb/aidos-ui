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
    size = "medium",
    padding = size === "medium" || size === "large" ? "medium" : "small",
    jssPrimary,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHasPopup,
    "aria-label": ariaLabel,
    "aria-keyshortcuts": ariaKeyshortcuts,
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
      size={size}
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
          aria-expanded={ariaExpanded}
          aria-controls={ariaControls}
          aria-haspopup={ariaHasPopup}
          aria-label={ariaLabel}
          aria-keyshortcuts={ariaKeyshortcuts}
          jss={[
            interactableListItemContentJSS,
            {
              minHeight: { xsmall: 28, small: 32, medium: 36, large: 44 }[size],
            },
            jssPrimary,
          ]}
          onClick={onClick}
        >
          {content}
        </BaseButton>
      )}
    </BaseListItem>
  );
});
