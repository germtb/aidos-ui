import React from "react";
import { BaseInput } from "./BaseInput";
import { Icon } from "./Icon";
import { Row } from "./Row";
import { Box } from "./Box";
import { cssVar, getPadding } from "./jss";
export const TextInput = React.forwardRef(({ value, onValueChange, rootJSStyle, jsStyle, icon, addOn, padding = "medium", bare, ...inputProps }, ref) => {
    return (<Row jsStyle={[
            {
                borderRadius: cssVar("--border-radius-l"),
                overflow: "hidden",
            },
            bare
                ? {
                    backgroundColor: "inherit",
                    ":has(:focus-visible)": {
                        background: cssVar("--light-highlight"),
                    },
                }
                : {
                    border: `1px solid ${cssVar("--divider")}`,
                    background: cssVar("--overlay-background"),
                },
            rootJSStyle,
        ]}>
        {icon && (<Box padding="medium">
            <Icon size="medium" color="secondary" icon={icon}/>
          </Box>)}
        <BaseInput {...inputProps} ref={ref} value={value} onChange={onValueChange ? (e) => onValueChange(e.target.value) : undefined} jsStyle={[
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
            jsStyle,
        ]}/>
        {addOn}
      </Row>);
});
//# sourceMappingURL=TextInput.jsx.map