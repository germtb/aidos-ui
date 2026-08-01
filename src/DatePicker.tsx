import React, { useState } from "react";
import { Text } from "./Text";
import { TextColor, toClassnames } from "./jss";
import {
  formatDateInputValue,
  parseDateInputValue,
} from "./dateInputValue";

const styles = {
  dateInput: {
    border: "1px solid var(--divider)",
    backgroundColor: "var(--primary-background)",
    padding: "var(--spacing-m)",
    color: "var(--primary-text)",
    fontSize: 20,
    lineHeight: 24 / 20,
  },
};

export interface DatePickerProps {
  id: string;
  label: string;
  date: Date;
  color?: TextColor;
  min?: string;
  max?: string;
  onDateChange: (date: Date) => void;
}

export function DatePicker({
  id,
  label,
  color = "primary",
  date,
  onDateChange,
}: DatePickerProps) {
  const [{ min, max }] = useState(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return {
      min: formatDateInputValue(new Date(year - 1, month, day)),
      max: formatDateInputValue(new Date(year + 1, month, day)),
    };
  });

  return (
    <>
      <label htmlFor={id}>
        <Text size="small" color={color}>
          {label}
        </Text>
      </label>
      <input
        min={min}
        max={max}
        className={toClassnames(styles.dateInput)}
        type="date"
        id={id}
        value={formatDateInputValue(date)}
        onChange={(event) => {
          if (event.target.value) {
            onDateChange(parseDateInputValue(event.target.value));
          }
        }}
      ></input>
    </>
  );
}
