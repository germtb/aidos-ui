import React from "react";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Row } from "./Row";
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
export const DateInput = React.forwardRef(({ date, onDateChange, jsStyle, icon, addOn, ...inputProps }, ref) => {
    return (<Row jsStyle={jsStyles.root}>
        {icon && (<Box padding="medium">
            <Icon size="medium" color="secondary" icon={icon}/>
          </Box>)}
        <BaseInput {...inputProps} type="date" ref={ref} value={date.toISOString().substring(0, 10)} onChange={(e) => onDateChange(new Date(e.target.value))} jsStyle={[jsStyles.input, jsStyle]}/>
        {addOn}
      </Row>);
});
//# sourceMappingURL=DateInput.jsx.map