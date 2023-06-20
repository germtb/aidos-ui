import React from "react";
import { createClassNames, createJSStyles, getPadding, } from "./Palette";
const jsStyles = createJSStyles({
    root: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "opacity 0.1s ease-in",
        outlineColor: "var(--outline)",
        "[aria-disabled=true]": {
            color: "var(--secondary-text)",
            backgroundColor: "var(--background-button-secondary)",
        },
        ":focus-visible": {
            outlineWidth: "2px",
            outlineStyle: "solid",
            outlineOffset: -2,
        },
    },
    animateClick: {
        position: "relative",
        ":active": {
            opacity: 0.95,
            top: 1,
        },
        "[aria-disabled=true]:active": {
            top: 0,
            opacity: 1,
        },
    },
    positive: {
        backgroundColor: "var(--background-button-positive)",
        "[aria-disabled=true]": {
            backgroundColor: "var(--background-button-disabled)",
        },
    },
    secondary: {
        backgroundColor: "var(--background-button-secondary)",
        "[aria-disabled=true]": {
            backgroundColor: "var(--background-button-disabled)",
        },
    },
    negative: {
        backgroundColor: "var(--background-button-negative)",
        "[aria-disabled=true]": {
            backgroundColor: "var(--background-button-disabled)",
        },
    },
    disabled: {
        cursor: "default",
    },
    bare: {
        backgroundColor: "inherit",
        outlineColor: "var(--outline)",
        "[aria-disabled=true]": {
            backgroundColor: "inherit",
        },
        "[aria-disabled=true]:hover": {
            backgroundColor: "inherit",
        },
    },
    opacityHover: {
        ":hover": {
            opacity: 0.8,
        },
        "[aria-disabled=true]:hover": {
            opacity: 1,
        },
    },
    colorHover: {},
});
export const BaseButton = React.forwardRef(({ onPress, children, jsStyle, color, bare = false, disabled, animateClick = true, padding, ...otherProps }, ref) => {
    return (React.createElement("button", { ...otherProps, "aria-disabled": disabled ? true : undefined, 
        // disabled={disabled ? true : undefined}
        ref: ref, onClick: (event) => {
            if (disabled) {
                return;
            }
            onPress(event);
        }, className: createClassNames(jsStyles.root, color === "positive" && jsStyles.positive, color === "secondary" && jsStyles.secondary, color === "negative" && jsStyles.negative, bare && jsStyles.bare, disabled && jsStyles.disabled, !bare && jsStyles.opacityHover, animateClick && !disabled && jsStyles.animateClick, jsStyle, getPadding(padding)) }, children));
});
//# sourceMappingURL=BaseButton.js.map