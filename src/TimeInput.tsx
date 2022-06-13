import React, { ReactNode } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { createJSStyles } from "./Palette";
import { Row } from "./Row";

export interface TimeInputProps extends BaseInputProps {
  onTimeChange: (date: Date) => void;
  time: Date;
  icon?: IconType;
  addOn?: ReactNode;
  onChange?: undefined;
}

const jsStyles = createJSStyles({
  root: {
    backgroundColor: "inherit",
  },
  input: {
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
  },
});

const timeFormatter = Intl.DateTimeFormat("en-UK", {
  hour: "2-digit",
  minute: "2-digit",
});

function TimeInputInternal(
  {
    time: date,
    onTimeChange: onDateChange,
    jsStyle,
    icon,
    addOn,
    ...inputProps
  }: TimeInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <Row jsStyle={jsStyles.root}>
      {icon && (
        <Box padding="medium">
          <Icon size="medium" color="secondary" icon={icon} />
        </Box>
      )}
      <BaseInput
        {...inputProps}
        type="time"
        ref={ref}
        value={timeFormatter.format(date)}
        onChange={(e) => {
          console.log(e.target.value);
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
        jsStyle={[jsStyles.input, jsStyle]}
      />
      {addOn}
    </Row>
  );
}

export const TimeInput = React.forwardRef(TimeInputInternal);
