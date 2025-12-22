import React from "react";
import { getInteractableJSStyles } from "./Interactable";
import { toClassnames } from "./jss";
export const BaseButton = React.forwardRef(({ onClick, children, jss, color, bare = false, border = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (<button {...otherProps} aria-disabled={disabled ? true : undefined} ref={ref} onClick={(event) => {
            if (disabled) {
                return;
            }
            onClick?.(event);
        }} className={toClassnames([
            ...getInteractableJSStyles({
                color,
                bare,
                border,
                disabled,
                animateInteraction,
                padding,
            }),
            jss,
        ])}>
        {children}
      </button>);
});
//# sourceMappingURL=BaseButton.jsx.map