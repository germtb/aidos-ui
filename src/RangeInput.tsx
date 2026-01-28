import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Row } from "./Row";
import { Gap, JSS, Padding, cssVar } from "./jss";

export interface RangeInputProps extends BaseInputProps {
  onValueChange: (value: number) => void;
  value: number;
  jssRoot?: JSS;
  onChange?: undefined;
  padding?: Padding;
  gap?: Gap;
  addOn?: React.JSX.Element;
  addOnPosition?: "start" | "end";
}

export const RangeInput = React.forwardRef(
  (
    {
      value,
      onValueChange,
      jssRoot,
      jss,
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
        jss={[
          {
            ":has(:focus-visible)": {
              borderRadius: cssVar("--border-radius-m"),
              backgroundColor: cssVar("--light-highlight"),
            },
          },
          jssRoot,
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
          jss={[
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
            jss,
          ]}
        />
        {addOnPosition === "end" && addOn}
      </Row>
    );
  }
);
