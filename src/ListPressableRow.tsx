import React, { ReactNode } from "react";

import { BaseButton } from "./BaseButton";
import { TextPairing } from "./TextPairing";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";
import { ListCell } from "./ListCell";
import { InterctableColor } from "./Interactable";
import {
  Size,
  TextColor,
  Position,
  Color,
  Spacing,
  JSStyle,
  cssVar,
} from "./jss2";
import { BaseLink } from "./BaseLink";

interface ListPressableRow extends BaseListRowProps {
  onClick?: () => void;
  href?: string;
  headline: string;
  headlineSize?: Size;
  headlineColor?: TextColor;
  headlineAddOn?: ReactNode;
  body?: string;
  bodySize?: Size;
  bodyColor?: TextColor;
  addOn?: ReactNode;
  addOnPosition?: Position;
  outerAddOn?: ReactNode;
  color?: InterctableColor;
  disabled?: boolean;
  role?: undefined;
  backgroundColor?: Color;
  gap?: Spacing;
  selected?: boolean;
  bare?: boolean;
}

export const ListPressableRow = React.forwardRef(
  (
    {
      onClick,
      href,
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
      color = "secondary",
      disabled = false,
      padding = "medium",
      jsStyle,
      gap,
      selected,
      bare,
      ...otherProps
    }: ListPressableRow,
    ref?: React.Ref<HTMLElement>
  ) => {
    const textPairing = (
      <TextPairing
        gap={gap}
        addOn={addOn}
        addOnPosition={addOnPosition}
        headline={headline}
        headlineSize={headlineSize}
        headlineColor={
          disabled ? "subtle" : bare && selected ? "highlight" : headlineColor
        }
        headlineAddOn={headlineAddOn}
        body={body}
        bodySize={bodySize}
        bodyColor={disabled ? "subtle" : bodyColor}
        grow={true}
        shrink={false}
      />
    );

    const pressabelJSStyle: JSStyle = {
      overflow: "hidden",
      flexGrow: 1,
      borderRadius: bare ? cssVar("--border-radius-m") : null,
      marginLeft: bare ? cssVar("--spacing-m") : null,
      marginRight: bare ? cssVar("--spacing-m") : null,
      textDecoration: "none",
      "[aria-selected=true]": {
        backgroundColor: bare
          ? cssVar("--light-highlight")
          : cssVar("--selected-background"),
        boxShadow: bare ? "" : "inset 1px 1px 2px -1px #0000004a",
      },
      ":hover": {
        backgroundColor: "var(--hovered-background)",
      },
      "[aria-selected=true]:hover": {
        backgroundColor: "var(--hovered-background)",
      },
      ":active:hover": {
        backgroundColor: "var(--pressed-background)",
      },
      "[aria-selected=true]:active:hover": {
        backgroundColor: "var(--pressed-background)",
      },
      "[aria-disabled=true]": {
        backgroundColor: "var(--primary-background)",
      },
      "[aria-disabled=true]:active:hover": {
        backgroundColor: "var(--primary-background)",
      },
    };

    return (
      <BaseListRow
        relative={true}
        withDivider={!bare}
        {...otherProps}
        jsStyle={jsStyle}
      >
        <ListCell
          jsStyle={{
            display: "flex",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {href != null ? (
            <BaseLink
              aria-selected={selected}
              disabled={disabled}
              animateInteraction={false}
              bare={true}
              color={color}
              href={href}
              ref={ref}
              jsStyle={pressabelJSStyle}
              aria-label={headline}
              onPress={onClick}
              padding={padding}
            >
              {textPairing}
            </BaseLink>
          ) : (
            <BaseButton
              aria-selected={selected}
              disabled={disabled}
              animateInteraction={false}
              bare={true}
              color={color}
              ref={ref}
              jsStyle={pressabelJSStyle}
              aria-label={headline}
              onPress={onClick}
              padding={padding}
            >
              {textPairing}
            </BaseButton>
          )}
        </ListCell>
        {outerAddOn && <ListCell>{outerAddOn}</ListCell>}
      </BaseListRow>
    );
  }
);
