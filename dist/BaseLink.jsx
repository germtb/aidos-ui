import React from "react";
import { getInteractableJSStyles } from "./Interactable";
import { jss } from "./JSS";
export const BaseLink = React.forwardRef(({ onPress, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (<a {...otherProps} aria-disabled={disabled ? true : undefined} ref={ref} onClick={onPress
            ? (event) => {
                if (disabled) {
                    return;
                }
                onPress(event);
            }
            : undefined} className={jss([
            ...getInteractableJSStyles({
                color,
                bare,
                disabled,
                animateInteraction,
                padding,
            }),
            {
                textDecoration: "none",
            },
            jsStyle,
        ])}>
        {children}
      </a>);
});
//# sourceMappingURL=BaseLink.jsx.map