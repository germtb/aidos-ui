import React from "react";
import { getInteractableJSStyles } from "./Interactable";
import { jss } from "./JSS";
export const BaseButton = React.forwardRef(({ onPress, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (<button {...otherProps} aria-disabled={disabled ? true : undefined} ref={ref} onClick={(event) => {
            if (disabled) {
                return;
            }
            onPress(event);
        }} className={jss([
            ...getInteractableJSStyles({
                color,
                bare,
                disabled,
                animateInteraction,
                padding,
            }),
            jsStyle,
        ])}>
        {children}
      </button>);
});
//# sourceMappingURL=BaseButton.jsx.map