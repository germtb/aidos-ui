import React from "react";
import { BaseButton } from "./BaseButton";
import { Icon } from "./Icon";
const jsStyles = {
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    animation: {
        ":active": {
            transform: "scale(0.92)",
        },
    },
    xsmall: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    small: {
        height: 24,
        width: 24,
        borderRadius: 12,
    },
    medium: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    large: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    xlarge: {
        height: 48,
        width: 48,
        borderRadius: 24,
    },
};
const getIconColor = (color, disabled, bare) => {
    if (disabled) {
        return "subtle";
    }
    switch (color) {
        case "positive":
            return bare ? "highlight" : "light";
        case "negative":
            return bare ? "negative" : "light";
        case "secondary":
            return bare ? "primary" : "secondary";
    }
};
export const IconButton = React.forwardRef(({ icon, size, color, bare, disabled, ...buttonProps }, ref) => {
    return (<BaseButton {...buttonProps} bare={bare} jsStyle={[
            jsStyles.button,
            size === "xsmall" && jsStyles.xsmall,
            size === "small" && jsStyles.small,
            size === "medium" && jsStyles.medium,
            size === "large" && jsStyles.large,
            size === "xlarge" && jsStyles.xlarge,
            !disabled && jsStyles.animation,
        ]} color={color} ref={ref} disabled={disabled}>
        <Icon size={size} icon={icon} color={getIconColor(color, disabled, bare)}/>
      </BaseButton>);
});
//# sourceMappingURL=IconButton.jsx.map