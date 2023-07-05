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
export function getInteractableStyles({ color, bare, disabled, animateClick }) {
    return [
        color === "positive" && jsStyles.positive,
        color === "secondary" && jsStyles.secondary,
        color === "negative" && jsStyles.negative,
        bare && jsStyles.bare,
        disabled && jsStyles.disabled,
        !bare && jsStyles.opacityHover,
        animateClick && !disabled && jsStyles.animateClick,
    ];
}
export const BaseInteractable = React.forwardRef(({ onPress, href, children, jsStyle, color, bare = false, disabled, animateClick = true, padding, ...otherProps }, ref) => {
    const onClick = onPress
        ? (event) => {
            if (disabled) {
                return;
            }
            onPress(event);
        }
        : undefined;
    const className = createClassNames(jsStyles.root, color === "positive" && jsStyles.positive, color === "secondary" && jsStyles.secondary, color === "negative" && jsStyles.negative, bare && jsStyles.bare, disabled && jsStyles.disabled, !bare && jsStyles.opacityHover, animateClick && !disabled && jsStyles.animateClick, jsStyle, getPadding(padding));
    const props = {
        ...otherProps,
        children,
        ["aria-disabled"]: disabled ? true : undefined,
        onClick,
        className,
    };
    if (href) {
        return React.createElement("a", { ...props, ref: ref });
    }
    else {
        return React.createElement("button", { ...props, ref: ref });
    }
});
//# sourceMappingURL=BaseInteractable.js.map