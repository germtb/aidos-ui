import React from "react";
import { createClassNames, createJSStyle } from "./Styles";
import { getInteractableJSStyles } from "./Interactable";
const jsStyles = createJSStyle({
    root: {
        textDecoration: "none",
    },
});
export const BaseLink = React.forwardRef(({ onPress, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (React.createElement("a", { ...otherProps, "aria-disabled": disabled ? true : undefined, ref: ref, onClick: onPress
            ? (event) => {
                if (disabled) {
                    return;
                }
                onPress(event);
            }
            : undefined, className: createClassNames([
            ...getInteractableJSStyles({
                color,
                bare,
                disabled,
                animateInteraction,
                padding,
            }),
            jsStyles.root,
            jsStyle,
        ]) }, children));
});
//# sourceMappingURL=BaseLink.js.map