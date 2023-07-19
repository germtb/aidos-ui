import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { getInteractableJSStyles } from "./Interactable";
import { jss } from "./jss";
export const BaseButton = React.forwardRef(({ onClick, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (_jsx("button", { ...otherProps, "aria-disabled": disabled ? true : undefined, ref: ref, onClick: (event) => {
            if (disabled) {
                return;
            }
            onClick(event);
        }, className: jss([
            ...getInteractableJSStyles({
                color,
                bare,
                disabled,
                animateInteraction,
                padding,
            }),
            jsStyle,
        ]), children: children }));
});
//# sourceMappingURL=BaseButton.js.map