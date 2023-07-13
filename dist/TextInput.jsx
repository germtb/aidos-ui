import React from "react";
import { BaseInput } from "./BaseInput";
import { Icon } from "./Icon";
import { Row } from "./Row";
import { Box } from "./Box";
export const TextInput = React.forwardRef(({ value, onValueChange, rootJSStyle, jsStyle, icon, addOn, indentation, ...inputProps }, ref) => {
    return (<Row jsStyle={[
            {
                backgroundColor: "inherit",
            },
            rootJSStyle,
        ]} padding={indentation}>
        {icon && (<Box padding="medium">
            <Icon size="medium" color="secondary" icon={icon}/>
          </Box>)}
        <BaseInput {...inputProps} ref={ref} value={value} onChange={onValueChange ? (e) => onValueChange(e.target.value) : undefined} jsStyle={[
            {
                minWidth: 0,
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
            jsStyle,
        ]}/>
        {addOn}
      </Row>);
});
//# sourceMappingURL=TextInput.jsx.map