import React, { ReactNode } from "react";
import { createJSStyles } from "./Palette";
import { BaseButton, ButtonColor } from "./BaseButton";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";
import { ListCell } from "./ListCell";
import { GlyphColor, GlyphSize } from "./Glyph";

const jsStyles = createJSStyles({
  root: {
    position: "relative",
  },
  gridcell: {
    display: "flex",
    flexGrow: 1,
  },
  button: {
    paddingTop: "var(--spacing-s)",
    paddingBottom: "var(--spacing-s)",
    paddingRight: "var(--spacing-m)",
    flexGrow: 1,
    ":hover:active": {
      backgroundColor: "var(--pressed-background)",
    },
    ":active": {
      backgroundColor: "var(--pressed-background)",
    },
    ":active:disabled": {
      backgroundColor: "inherit",
    },
    ":hover:active:disabled": {
      backgroundColor: "inherit",
    },
  },
  primaryAddOn: {
    flexGrow: 0,
    flexShrink: 0,
  },
  textPairing: {
    flexGrow: 1,
    flexShrink: 0,
  },
  secondaryAddOn: {
    display: "flex",
    flexGrow: 0,
    flexShrink: 0,
  },
  interactiveAddOn: {
    flexGrow: 0,
    flexShrink: 0,
  },
  indented: {
    paddingLeft: "var(--spacing-m)",
  },
});

interface ListPressableRow extends BaseListRowProps {
  onPress: () => void;
  headline: string;
  headlineSize?: GlyphSize;
  headlineColor?: GlyphColor;
  headlineAddOn?: ReactNode;
  body?: string;
  bodySize?: GlyphSize;
  bodyColor?: GlyphColor;
  primaryAddOn?: ReactNode;
  secondaryAddOn?: ReactNode;
  color?: ButtonColor;
  disabled?: boolean;
  role?: undefined;
  jsStyle?: undefined;
}

export const ListPressableRow = React.forwardRef(
  (
    {
      onPress,
      headline,
      headlineSize = "medium",
      headlineColor = "primary",
      headlineAddOn,
      body,
      bodySize = "small",
      bodyColor = "secondary",
      primaryAddOn,
      secondaryAddOn,
      color = "secondary",
      disabled = false,
      ...otherProps
    }: ListPressableRow,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <BaseListRow
        {...otherProps}
        componentName={(otherProps.componentName ?? []).concat(
          "ListPressableRow"
        )}
        jsStyle={jsStyles.root}
      >
        <ListCell jsStyle={jsStyles.gridcell}>
          <BaseButton
            disabled={disabled}
            bare={true}
            color={color}
            ref={ref}
            jsStyle={[jsStyles.button, primaryAddOn ? null : jsStyles.indented]}
            aria-label={headline}
            onPress={onPress}
          >
            {primaryAddOn && (
              <BaseView jsStyle={jsStyles.primaryAddOn}>
                {primaryAddOn}
              </BaseView>
            )}

            <BaseView jsStyle={jsStyles.textPairing}>
              <TextPairing
                headline={headline}
                headlineSize={headlineSize}
                headlineColor={disabled ? "subtle" : headlineColor}
                headlineAddOn={headlineAddOn}
                body={body}
                bodySize={bodySize}
                bodyColor={disabled ? "subtle" : bodyColor}
              />
            </BaseView>

            {secondaryAddOn && (
              <BaseView jsStyle={jsStyles.secondaryAddOn}>
                {secondaryAddOn}
              </BaseView>
            )}
          </BaseButton>
        </ListCell>
      </BaseListRow>
    );
  }
);
