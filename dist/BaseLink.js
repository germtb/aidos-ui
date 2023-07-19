import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { getInteractableJSStyles } from "./Interactable";
import { jss } from "./jss";
export const BaseLink = React.forwardRef(({ onClick, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, href, ...otherProps }, ref) => {
    return (_jsx("a", { ...otherProps, "aria-disabled": disabled ? true : undefined, href: disabled ? undefined : href, role: "link", ref: ref, onClick: onClick
            ? (event) => {
                if (disabled) {
                    return;
                }
                onClick(event);
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
        ]), children: children }));
});
//# sourceMappingURL=BaseLink.js.map