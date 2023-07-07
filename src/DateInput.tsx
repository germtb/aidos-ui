import React, { ReactNode } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { JSStyle } from "./JSS";

export interface DateInputProps extends BaseInputProps {
  onDateChange: (date: Date) => void;
  date: Date;
  icon?: IconType;
  addOn?: ReactNode;
  onChange?: undefined;
  jsStyles?: JSStyle;
}

const jsStyles = {
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
};

export const DateInput = React.forwardRef(
  (
    { date, onDateChange, jsStyle, icon, addOn, ...inputProps }: DateInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Row jsStyle={jsStyles.root}>
        {icon && (
          <Box padding="medium">
            <Icon size="medium" color="secondary" icon={icon} />
          </Box>
        )}
        <BaseInput
          {...inputProps}
          type="date"
          ref={ref}
          value={date.toISOString().substring(0, 10)}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          jsStyle={[jsStyles.input, jsStyle]}
        />
        {addOn}
      </Row>
    );
  }
);
