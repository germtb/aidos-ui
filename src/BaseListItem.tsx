import React, { ReactNode } from "react";

import { ListDivider } from "./ListDivider";
import { Row, RowProps } from "./Row";
import { JSStyle, Size, Position, Spacing, TextColor, cssVar } from "./jss";
import { InteractableColor } from "./Interactable";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { useListContext } from "./List";

// @ts-ignore
export interface BaseListItemProps extends RowProps {
  children: (elements: { content: JSX.Element }) => ReactNode;
  jsStyle?: JSStyle;
  withDivider?: boolean;
  headline: string;
  headlineSize?: Size;
  headlineColor?: TextColor;
  headlineAddOn?: ReactNode;
  headlineBold?: boolean;
  body?: string;
  bodySize?: Size;
  bodyColor?: TextColor;
  addOn?: ReactNode;
  addOnPosition?: Position;
  outerAddOn?: ReactNode;
  disabled?: boolean;
  role?: undefined;
  gap?: Spacing;
  selected?: boolean;
}

export const BaseListItem = React.forwardRef(
  (
    {
      children,
      jsStyle,
      withDivider = true,
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
      disabled = false,
      padding = "medium",
      gap = "medium",
      selected,
      headlineBold,
      ...otherProps
    }: BaseListItemProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    const { bare } = useListContext();

    const content = (
      <TextPairing
        headlineBold={headlineBold}
        padding={padding}
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

    return (
      <>
        <Row
          {...otherProps}
          ref={ref}
          relative
          tag="li"
          role="row"
          jsStyle={[
            !bare && {
              [":first-child *"]: {
                borderTopLeftRadius: cssVar("--border-radius-l"),
                borderTopRightRadius: cssVar("--border-radius-l"),
              },
              [":last-child *"]: {
                borderBottomLeftRadius: cssVar("--border-radius-l"),
                borderBottomRightRadius: cssVar("--border-radius-l"),
              },
            },
            jsStyle,
          ]}
        >
          <Row
            grow
            role="gridcell"
            jsStyle={{
              overflow: "hidden",
            }}
          >
            {children({ content })}
          </Row>
          {outerAddOn && <BaseView role="gridcell">{outerAddOn}</BaseView>}
        </Row>
        {withDivider && <ListDivider />}
      </>
    );
  }
);
