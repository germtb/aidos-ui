import React, { ReactNode } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Row } from "./Row";
import { Gap, JSStyle, Padding, cssVar, getPadding } from "./jss";
import { Column } from "./Column";

export interface TextInputProps extends BaseInputProps {
  onValueChange?: (value: string) => void;
  rootJSStyle?: JSStyle;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
  gap?: Gap;
  onChange?: undefined;
  padding?: Padding;
  bare?: boolean;
}

export const TextInput = React.forwardRef(
  (
    {
      value,
      onValueChange,
      rootJSStyle,
      jsStyle,
      addOn,
      gap = "small",
      addOnPosition = "start",
      padding = "medium",
      bare,
      ...inputProps
    }: TextInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Row
        gap={gap}
        jsStyle={[
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
          rootJSStyle,
        ]}
      >
        {addOnPosition === "start" && addOn && (
          <Column
            justify="center"
            align="center"
            jsStyle={[getPadding(padding), { paddingRight: 0 }]}
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
          jsStyle={[
            {
              minWidth: 0,
              flexGrow: 1,
              backgroundColor: "inherit",
              color: cssVar("--primary-text"),
              outline: "none",
              border: "none",
              fontSize: 20,
              lineHeight: 24 / 20,
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
            jsStyle,
          ]}
        />
        {addOnPosition === "end" && addOn && (
          <Column
            justify="center"
            align="center"
            jsStyle={[getPadding(padding), { paddingLeft: 0 }]}
          >
            {addOn}
          </Column>
        )}
      </Row>
    );
  }
);
