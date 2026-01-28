import React, { ReactNode } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Column } from "./Column";
import { Row } from "./Row";
import { Gap, JSS, Padding, Size, cssVar, getPadding } from "./jss";

const fontSize = {
  xsmall: cssVar("--font-xsmall"),
  small: cssVar("--font-small"),
  medium: cssVar("--font-medium"),
  large: cssVar("--font-large"),
  xlarge: cssVar("--font-xlarge"),
  xxlarge: cssVar("--font-xxlarge"),
  xxxlarge: cssVar("--font-xxxlarge"),
};

export interface TextInputProps extends Omit<BaseInputProps, "size"> {
  onValueChange?: (value: string) => void;
  jssRoot?: JSS;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
  gap?: Gap;
  onChange?: undefined;
  padding?: Padding;
  bare?: boolean;
  size?: Size;
}

export const TextInput = React.forwardRef(
  (
    {
      value,
      onValueChange,
      jssRoot,
      jss,
      addOn,
      gap = "small",
      addOnPosition = "start",
      padding = "medium",
      bare,
      size = "medium",
      ...inputProps
    }: TextInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Row
        gap={gap}
        jss={[
          {
            borderRadius: cssVar("--border-radius-m"),
            overflow: "hidden",
          },
          bare
            ? {
                backgroundColor: "inherit",
                ":has(:focus-visible)": {
                  backgroundColor: cssVar("--light-highlight"),
                },
              }
            : {
                border: `1px solid ${cssVar("--divider")}`,
                backgroundColor: cssVar("--overlay-background"),
                ":has(:focus-visible)": {
                  outline: `2px solid ${cssVar("--highlight")}`,
                  outlineOffset: -2,
                },
              },
          jssRoot,
        ]}
      >
        {addOnPosition === "start" && addOn && (
          <Column
            justify="center"
            align="center"
            jss={[getPadding(padding), { paddingRight: 0 }]}
          >
            {addOn}
          </Column>
        )}
        <BaseInput
          {...inputProps}
          ref={ref}
          value={value}
          onChange={
            onValueChange ? (e) => onValueChange(e.target.value) : undefined
          }
          jss={[
            {
              minWidth: 0,
              flexGrow: 1,
              backgroundColor: "inherit",
              color: cssVar("--primary-text"),
              outline: "none",
              border: "none",
              fontSize: fontSize[size],
              lineHeight: 1.2,
              "::placeholder": {
                color: cssVar("--subtle-text"),
              },
              ":disabled": {
                color: cssVar("--subtle-text"),
              },
            },
            getPadding(padding),
            addOn && addOnPosition === "start" ? { paddingLeft: 0 } : null,
            addOn && addOnPosition === "end" ? { paddingRight: 0 } : null,
            jss,
          ]}
        />
        {addOnPosition === "end" && addOn && (
          <Column
            justify="center"
            align="center"
            jss={[getPadding(padding), { paddingLeft: 0 }]}
          >
            {addOn}
          </Column>
        )}
      </Row>
    );
  }
);
