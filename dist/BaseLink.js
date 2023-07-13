import React from "react";
import { getInteractableJSStyles } from "./Interactable";
import { jss } from "./jss";
export const BaseLink = React.forwardRef(({ onPress, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, href, ...otherProps }, ref) => {
    return (React.createElement("a", { ...otherProps, "aria-disabled": disabled ? true : undefined, href: disabled ? undefined : href, role: "link", ref: ref, onClick: onPress
            ? (event) => {
                if (disabled) {
                    return;
                }
                onPress(event);
            }
            : undefined, className: jss([
            ...getInteractableJSStyles({
                color,
                bare,
                disabled,
                animateInteraction,
                padding,
            }),
            jsStyle,
        ]) }, children));
});
//# sourceMappingURL=BaseLink.js.map