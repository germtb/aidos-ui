import React from "react";
import { createClassNames, createJSStyles } from "./Palette";
const jsStyles = createJSStyles({
    root: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "opacity 0.1s ease-in",
        outlineColor: "var(--outline)",
        ":disabled": {
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
        ":active": {
            transform: "scale(0.975)",
        },
        ":active:disabled": {
            opacity: 1,
            transform: "none",
        },
    },
    positive: {
        backgroundColor: "var(--background-button-positive)",
    },
    secondary: {
        backgroundColor: "var(--background-button-secondary)",
    },
    negative: {
        backgroundColor: "var(--background-button-negative)",
    },
    disabled: {
        cursor: "default",
    },
    bare: {
        backgroundColor: "inherit",
        outlineColor: "var(--outline)",
        ":disabled": {
            backgroundColor: "inherit",
        },
    },
    opacityHover: {
        ":hover": {
            opacity: 0.8,
        },
        ":hover:disabled": {
            opacity: 1,
        },
    },
    colorHover: {
        ":hover": {
            backgroundColor: "var(--secondary-background)",
        },
        ":hover:disabled": {
            backgroundColor: "inherit",
        },
    },
});
export const BaseButton = React.forwardRef(({ componentName, onPress, children, jsStyle, color, bare = false, disabled, animateClick = true, ...otherProps }, ref) => {
    return (React.createElement("button", { ...otherProps, "data-test-id": componentName ?? "BaseButton", "aria-disabled": disabled ? true : undefined, 
        // disabled={disabled ? true : undefined}
        ref: ref, onClick: (event) => {
            if (disabled) {
                return;
            }
            onPress(event);
        }, className: createClassNames(jsStyles.root, color === "positive" && jsStyles.positive, color === "secondary" && jsStyles.secondary, color === "negative" && jsStyles.negative, bare && jsStyles.bare, disabled && jsStyles.disabled, bare ? jsStyles.colorHover : jsStyles.opacityHover, animateClick && jsStyles.animateClick, jsStyle) }, children));
});
