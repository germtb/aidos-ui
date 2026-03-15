import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { getInteractableJSS } from "./Interactable";
import { toClassnames } from "./jss";
export const BaseButton = React.forwardRef(({ onClick, children, jss, color, bare = false, border = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (_jsx("button", { type: "button", ...otherProps, "aria-disabled": disabled ? true : undefined, ref: ref, onClick: (event) => {
            if (disabled) {
                return;
            }
            onClick?.(event);
        }, className: toClassnames([
            ...getInteractableJSS({
                color,
                bare,
                border,
                disabled,
                animateInteraction,
                padding,
            }),
            jss,
        ]), children: children }));
});
//# sourceMappingURL=BaseButton.js.map