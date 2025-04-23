import React, { useRef } from "react";
import { Text } from "./Text";
import { jss } from "./jss";
const jsStyles = {
    dateInput: {
        border: "1px solid var(--divider)",
        backgroundColor: "var(--primary-background)",
        padding: "var(--spacing-m)",
        color: "var(--primary-text)",
        fontSize: 20,
        lineHeight: 24 / 20,
    },
};
export function DatePicker({ id, label, color = "primary", date, onDateChange, }) {
    const initialDate = useRef(date);
    const year = initialDate.current.getFullYear();
    const month = initialDate.current.getMonth();
    const day = initialDate.current.getDate();
    const min = new Date(year - 1, month, day).toISOString().substring(0, 10);
    const max = new Date(year + 1, month, day).toISOString().substring(0, 10);
    return (<>
      <label htmlFor={id}>
        <Text size="small" color={color}>
          {label}
        </Text>
      </label>
      <input min={min} max={max} className={jss(jsStyles.dateInput)} type="date" id={id} value={date.toISOString().substring(0, 10)} onChange={(event) => {
            let parsedDate;
            try {
                parsedDate = new Date(event.target.value);
            }
            finally {
                if (parsedDate != null) {
                    onDateChange(parsedDate);
                }
            }
        }}></input>
    </>);
}
//# sourceMappingURL=DatePicker.jsx.map