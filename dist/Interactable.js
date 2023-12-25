import { cssVar, getPadding } from "./jss";
const jsStyles = {
    root: {
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        transition: "opacity 0.1s ease-in",
        outlineColor: cssVar("--outline"),
        "[aria-disabled=true]": {
            color: cssVar("--secondary-text"),
            backgroundColor: cssVar("--background-button-secondary"),
        },
        ":focus-visible": {
            outlineWidth: "2px",
            outlineStyle: "solid",
            outlineOffset: -2,
        },
    },
    dark: {
        backgroundColor: "black",
        "[aria-disabled=true]": {
            backgroundColor: cssVar("--background-button-disabled"),
        },
    },
    light: {
        backgroundColor: "white",
        "[aria-disabled=true]": {
            backgroundColor: cssVar("--background-button-disabled"),
        },
    },
    positive: {
        backgroundColor: cssVar("--background-button-positive"),
        "[aria-disabled=true]": {
            backgroundColor: cssVar("--background-button-disabled"),
        },
    },
    primary: {
        backgroundColor: cssVar("--background-button-secondary"),
        "[aria-disabled=true]": {
            backgroundColor: cssVar("--background-button-disabled"),
        },
    },
    negative: {
        backgroundColor: cssVar("--background-button-negative"),
        "[aria-disabled=true]": {
            backgroundColor: cssVar("--background-button-disabled"),
        },
    },
    disabled: {
        cursor: "default",
    },
    bare: {
        backgroundColor: "inherit",
        outlineColor: cssVar("--outline"),
        "[aria-disabled=true]": {
            backgroundColor: "inherit",
        },
        "[aria-disabled=true]:hover": {
            backgroundColor: "inherit",
        },
    },
    borderDark: {
        border: "1px solid black",
    },
    borderLight: {
        border: "1px solid white",
    },
    borderPositive: {
        border: `1px solid ${cssVar("--highlight-text")}`,
    },
    borderNegative: {
        border: `1px solid ${cssVar("--negative-text")}`,
    },
    borderPrimary: {
        border: `1px solid ${cssVar("--primary-text")}`,
    },
    borderDisabled: {
        border: `1px solid ${cssVar("--subtle-text")}`,
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
};
export function getInteractableJSStyles({ color, bare, disabled, animateInteraction, padding, border, }) {
    return [
        jsStyles.root,
        color === "dark" && jsStyles.dark,
        color === "light" && jsStyles.light,
        color === "positive" && jsStyles.positive,
        color === "primary" && jsStyles.primary,
        color === "negative" && jsStyles.negative,
        border && !disabled && color === "positive" && jsStyles.borderPositive,
        border && !disabled && color === "negative" && jsStyles.borderNegative,
        border && !disabled && color === "primary" && jsStyles.borderPrimary,
        border && !disabled && color === "dark" && jsStyles.borderDark,
        border && !disabled && color === "light" && jsStyles.borderLight,
        border && disabled && jsStyles.borderDisabled,
        bare && jsStyles.bare,
        disabled && jsStyles.disabled,
        !bare && jsStyles.opacityHover,
        animateInteraction &&
            !disabled && {
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
        case "primary":
            return bare ? "primary" : "secondary";
        case "dark":
            return bare ? "primary" : "light";
        case "light":
            return bare ? "light" : "primary";
    }
};
export const getInteractableListItemJSStyles = ({ bare, selected, }) => {
    return [
        {
            overflow: "hidden",
            flexGrow: 1,
            borderRadius: bare ? cssVar("--border-radius-m") : null,
            textDecoration: "none",
            ":hover": {
                backgroundColor: cssVar("--hovered-background"),
            },
            ":active:hover": {
                backgroundColor: cssVar("--pressed-background"),
            },
            "[aria-disabled=true]": {
                backgroundColor: cssVar("--primary-background"),
            },
            "[aria-disabled=true]:active:hover": {
                backgroundColor: cssVar("--primary-background"),
            },
        },
        selected && {
            backgroundColor: bare
                ? cssVar("--light-highlight")
                : cssVar("--selected-background"),
            boxShadow: bare ? "" : "inset 1px 1px 2px -1px #0000004a",
            ":hover": {
                backgroundColor: cssVar("--hovered-background"),
            },
            ":active:hover": {
                backgroundColor: cssVar("--pressed-background"),
            },
        },
    ];
};
//# sourceMappingURL=Interactable.js.map