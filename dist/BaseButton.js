import React from "react";
import { createClassNames } from "./Styles";
import { getInteractableJSStyles } from "./Interactable";
export const BaseButton = React.forwardRef(({ onPress, children, jsStyle, color, bare = false, disabled, animateInteraction = true, padding, ...otherProps }, ref) => {
    return (React.createElement("button", { ...otherProps, "aria-disabled": disabled ? true : undefined, ref: ref, onClick: (event) => {
            if (disabled) {
                return;
            }
            onPress(event);
        }, className: createClassNames([
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
//# sourceMappingURL=BaseButton.js.map