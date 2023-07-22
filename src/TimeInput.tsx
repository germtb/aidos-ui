import React, { ReactNode } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Row } from "./Row";
import { Gap, Padding, cssVar } from "./jss";

export interface TimeInputProps extends BaseInputProps {
  onTimeChange: (date: Date) => void;
  time: Date;
  gap?: Gap;
  padding?: Padding;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
  onChange?: undefined;
  bare?: boolean;
}

export const timeFormatter = Intl.DateTimeFormat("en-UK", {
  hour: "2-digit",
  minute: "2-digit",
});

function TimeInputInternal(
  {
    time: date,
    onTimeChange: onDateChange,
    jsStyle,
    addOn,
    padding = "small",
    gap = "none",
    addOnPosition = "start",
    bare,
    ...inputProps
  }: TimeInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <Row
      padding={padding}
      gap={gap}
      align="center"
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
      ]}
    >
      {addOnPosition === "start" && addOn}
      <BaseInput
        {...inputProps}
        type="time"
        ref={ref}
        value={timeFormatter.format(date)}
        onChange={(e) => {
          const value = e.target.value;
          const [hour, minute] = value.split(":");
          onDateChange(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              parseInt(hour),
              parseInt(minute)
            )
          );
        }}
        jsStyle={[
          {
            flexGrow: 1,
            backgroundColor: "inherit",
            color: "var(--primary-text)",
            outline: "none",
            border: "none",
            fontSize: 20,
            lineHeight: 24 / 20,
            "::placeholder": {
              color: "var(--subtle-text);",
            },
            ":disabled": {
              color: "var(--subtle-text);",
            },
            "::-webkit-calendar-picker-indicator": {
              backgroundColor: "none",
            },
          },
          jsStyle,
        ]}
      />
      {addOnPosition === "end" && addOn}
    </Row>
  );
}

export const TimeInput = React.forwardRef(TimeInputInternal);
