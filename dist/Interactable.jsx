import { cssVar, getPadding } from "./jss";
const jsStyles = {
    root: {
        cursor: "pointer",
        display: "inline-flex",
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
    positive: {
        backgroundColor: "var(--background-button-positive)",
        "[aria-disabled=true]": {
            backgroundColor: "var(--background-button-disabled)",
        },
    },
    primary: {
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
};
export function getInteractableJSStyles({ color, bare, disabled, animateInteraction, padding, }) {
    return [
        jsStyles.root,
        color === "positive" && jsStyles.positive,
        color === "primary" && jsStyles.primary,
        color === "negative" && jsStyles.negative,
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
                backgroundColor: "var(--hovered-background)",
            },
            ":active:hover": {
                backgroundColor: "var(--pressed-background)",
            },
            "[aria-disabled=true]": {
                backgroundColor: "var(--primary-background)",
            },
            "[aria-disabled=true]:active:hover": {
                backgroundColor: "var(--primary-background)",
            },
        },
        selected && {
            backgroundColor: bare
                ? cssVar("--light-highlight")
                : cssVar("--selected-background"),
            boxShadow: bare ? "" : "inset 1px 1px 2px -1px #0000004a",
            ":hover": {
                backgroundColor: "var(--hovered-background)",
            },
            ":active:hover": {
                backgroundColor: "var(--pressed-background)",
            },
        },
    ];
};
//# sourceMappingURL=Interactable.jsx.map