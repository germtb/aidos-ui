import { createJSStyles, getPadding } from "./Palette";
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
export function getInteractableJSStyles({ color, bare, disabled, animateInteraction, padding, }) {
    return [
        jsStyles.root,
        color === "positive" && jsStyles.positive,
        color === "secondary" && jsStyles.secondary,
        color === "negative" && jsStyles.negative,
        bare && jsStyles.bare,
        disabled && jsStyles.disabled,
        !bare && jsStyles.opacityHover,
        animateInteraction && !disabled && jsStyles.animateClick,
        getPadding(padding),
    ];
}
export const getGlyphColor = (color, disabled, bare) => {
    if (disabled) {
        return "subtle";
    }
    switch (color) {
        case "positive":
            return bare ? "highlight" : "light";
        case "negative":
            return bare ? "negative" : "light";
        case "secondary":
            return "primary";
    }
};
//# sourceMappingURL=Interactable.js.map