import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Row } from "./Row";
import { Gap, JSStyle, Padding, cssVar } from "./jss";

export interface RangeInputProps extends BaseInputProps {
  onValueChange: (value: number) => void;
  value: number;
  rootJSStyle?: JSStyle;
  onChange?: undefined;
  padding?: Padding;
  gap?: Gap;
  addOn?: JSX.Element;
  addOnPosition?: "start" | "end";
}

export const RangeInput = React.forwardRef(
  (
    {
      value,
      onValueChange,
      rootJSStyle,
      jsStyle,
      gap = "medium",
      padding = "none",
      min = 0,
      max = 100,
      step = 1,
      label,
      addOn,
      addOnPosition = "start",
      ...inputProps
    }: RangeInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Row
        gap={gap}
        padding={padding}
        align="center"
        jsStyle={[
          {
            ":has(:focus-visible)": {
              borderRadius: cssVar("--border-radius-m"),
              backgroundColor: cssVar("--light-highlight"),
            },
          },
          rootJSStyle,
        ]}
      >
        {addOnPosition === "start" && addOn}
        <BaseInput
          {...inputProps}
          label={label}
          min={min}
          max={max}
          type="range"
          ref={ref}
          value={value}
          onChange={(e) => {
            onValueChange(parseFloat(e.target.value));
          }}
          jsStyle={[
            {
              backgroundColor: cssVar("--primary-background"),
              flexGrow: 1,
              color: cssVar("--primary-text"),
              margin: 0,
              paddingTop: cssVar("--spacing-m"),
              paddingBottom: cssVar("--spacing-m"),
              ":disabled": {
                color: cssVar("--subtle-text"),
              },
            },
            jsStyle,
          ]}
        />
        {addOnPosition === "end" && addOn}
      </Row>
    );
  }
);
